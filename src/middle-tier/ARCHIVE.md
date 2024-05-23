# Archive for previously existing functions for Microsoft SSO(Single Sign-On)

```typescript
// ssoauth-helper.ts


import fetch from "node-fetch";
import form from "form-urlencoded";
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

/* global process, console */

const DISCOVERY_KEYS_ENDPOINT = "https://login.microsoftonline.com/common/discovery/v2.0/keys";

export async function getAccessToken(authorization: string): Promise<any> {
  if (!authorization) {
    let error = new Error("No Authorization header was found.");
    return Promise.reject(error);
  } else {
    const scopeName: string = process.env.SCOPE || "User.Read";
    const [, /* schema */ assertion] = authorization.split(" ");

    const tokenScopes = (jwt.decode(assertion) as jwt.JwtPayload).scp.split(" ");
    const accessAsUserScope = tokenScopes.find((scope) => scope === "access_as_user");
    if (!accessAsUserScope) {
      throw new Error("Missing access_as_user");
    }

    const formParams = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: assertion,
      requested_token_use: "on_behalf_of",
      scope: [scopeName].join(" "),
    };

    const stsDomain: string = "https://login.microsoftonline.com";
    const tenant: string = "common";
    const tokenURLSegment: string = "oauth2/v2.0/token";
    const encodedForm = form(formParams);

    const tokenResponse = await fetch(`${stsDomain}/${tenant}/${tokenURLSegment}`, {
      method: "POST",
      body: encodedForm,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const json = await tokenResponse.json();
    return json;
  }
}

export function validateJwt(req, res, next): void {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const validationOptions = {
      audience: process.env.CLIENT_ID,
    };

    jwt.verify(token, getSigningKeys, validationOptions, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      next();
    });
  }
}

function getSigningKeys(header: any, callback: any) {
  var client: JwksClient = new JwksClient({
    jwksUri: DISCOVERY_KEYS_ENDPOINT,
  });

  client.getSigningKey(header.kid, function (err, key) {
    callback(null, key.getPublicKey());
  });
}

```

```typescript
// msgraph-helper.ts

// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license in the root of the repo.
/*
    This file provides the provides functionality to get Microsoft Graph data.
*/
import * as https from "https";
import { getAccessToken } from "./ssoauth-helper";
import createError from "http-errors";

/* global process */

const domain: string = "graph.microsoft.com";
const version: string = "v1.0";

export async function getUserData(req: any, res: any, next: any) {
  const authorization: string = req.get("Authorization");

  await getAccessToken(authorization)
    .then(async (graphTokenResponse) => {
      if (graphTokenResponse && (graphTokenResponse.claims || graphTokenResponse.error)) {
        res.send(graphTokenResponse);
      } else {
        const graphToken: string = graphTokenResponse.access_token;
        const graphUrlSegment: string = process.env.GRAPH_URL_SEGMENT || "/me";
        const graphQueryParamSegment: string = process.env.QUERY_PARAM_SEGMENT || "";

        const graphData = await getGraphData(graphToken, graphUrlSegment, graphQueryParamSegment);

        // If Microsoft Graph returns an error, such as invalid or expired token,
        // there will be a code property in the returned object set to a HTTP status (e.g. 401).
        // Relay it to the client. It will caught in the fail callback of `makeGraphApiCall`.
        if (graphData.code) {
          next(createError(graphData.code, "Microsoft Graph error " + JSON.stringify(graphData)));
        } else {
          res.send(graphData);
        }
      }
    })
    .catch((err) => {
      res.status(401).send(err.message);
      return;
    });
}

export async function getGraphData(accessToken: string, apiUrl: string, queryParams?: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const options: https.RequestOptions = {
      host: domain,
      path: "/" + version + apiUrl + queryParams,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Expires: "-1",
        Pragma: "no-cache",
      },
    };

    https
      .get(options, (response) => {
        let body = "";
        response.on("data", (d) => {
          body += d;
        });
        response.on("end", () => {
          // The response from the OData endpoint might be an error, say a
          // 401 if the endpoint requires an access token and it was invalid
          // or expired. But a message is not an error in the call of https.get,
          // so the "on('error', reject)" line below isn't triggered.
          // So, the code distinguishes success (200) messages from error
          // messages and sends a JSON object to the caller with either the
          // requested OData or error information.

          let error;
          if (response.statusCode === 200) {
            let parsedBody = JSON.parse(body);
            resolve(parsedBody);
          } else {
            error = new Error();
            error.code = response.statusCode;
            error.message = response.statusMessage;

            // The error body sometimes includes an empty space
            // before the first character, remove it or it causes an error.
            body = body.trim();
            error.bodyCode = JSON.parse(body).error.code;
            error.bodyMessage = JSON.parse(body).error.message;
            resolve(error);
          }
        });
      })
      .on("error", reject);
  });
}

```


```typescript
// app.ts

// Health ping
app.get("/ping", function (req: any, res: any) {
  res.send(process.platform);
});

// Get user data
app.get("/getuserdata", validateJwt, getUserData);


```

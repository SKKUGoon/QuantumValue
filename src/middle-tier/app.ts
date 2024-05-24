import express from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import https from "https";
import logger from "morgan";
import * as path from "path";
import { getHttpsServerOptions } from "office-addin-dev-certs";
import { llmQuery } from "./ollama/llm";

/* global console, process, require, __dirname */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port: number | string = process.env.API_PORT || "3000";

app.set("port", port);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Turn off caching when developing */
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(process.cwd(), "dist"), { etag: false }));

  app.use((_req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
  });
} else {
  // In production mode, let static files be cached.
  app.use(express.static(path.join(process.cwd(), "dist")));
}

const indexRouter = express.Router();
indexRouter.get("/", (_req, res) => {
  res.render("/taskpane.html");
});

app.use("/", indexRouter);

// Middle-tier API calls
app.get("/ping", function (req: any, res: any) {
  res.status(200).json({ message: "I'm alive" });
});

// Get the client side task pane files requested
app.get("/taskpane.html", async (_req: any, res: any) => {
  return res.sendfile("taskpane.html");
});

app.get("/fallbackauthdialog.html", async (_req: any, res: any) => {
  return res.sendfile("fallbackauthdialog.html");
});

// LLM API calls
app.post("/llm", llmQuery);

// Catch 404 and forward to error handler
app.use((_req: any, _res: any, next: any) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

getHttpsServerOptions().then((options) => {
  https
    .createServer(options, app)
    .listen(port, () => console.log(`Server running on ${port} in ${process.env.NODE_ENV} mode`));
});

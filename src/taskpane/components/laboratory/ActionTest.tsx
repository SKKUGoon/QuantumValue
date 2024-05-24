/* eslint-disable no-undef */
import * as React from "react";
import { Button, tokens, makeStyles } from "@fluentui/react-components";
import { useAppDispatch } from "../../redux/store/hook";
import { modelSliceAction } from "../../redux/store/model/model";
import { getNamedObjectContent } from "../../redux/store/block/blockMethodName";

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
  buttons: {
    marginBottom: "15px",
  },
});

const ActionTest: React.FC = () => {
  const dispatch = useAppDispatch();

  const actions = async () => {
    await Excel.run(async (context) => {
      try {
        console.log(`Action init`);
        // await dispatch(
        //   setNamedObject({ context: context, targetSheet: "Sheet1", targetRange: "A1:C3", blockName: "test" })
        // );
        await dispatch(getNamedObjectContent({ context: context, targetSheet: "Sheet1", blockName: "test" }));
        console.log(`Action successfully ended`);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const viewStore = async () => {
    dispatch(modelSliceAction.debug());
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Button className={styles.buttons} appearance="primary" disabled={false} size="medium" onClick={actions}>
        Action Test
      </Button>
      <Button className={styles.buttons} appearance="secondary" disabled={false} size="medium" onClick={viewStore}>
        Store
      </Button>
    </div>
  );
};

export default ActionTest;

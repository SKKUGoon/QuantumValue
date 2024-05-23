/* eslint-disable no-undef */
import * as React from "react";
import { Button, tokens, makeStyles } from "@fluentui/react-components";
import { useAppDispatch } from "../../redux/store/hook";
// import { focusSheet } from "../../redux/store/model/modelMethodSheet";
import { modelSliceAction } from "../../redux/store/model/model";
import { ModelOrder } from "../ai/modelconn";

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
    // await Excel.run(async (context) => {
    //   try {
    //     console.log(`Action init`);
    //     console.log(`Action successfully ended`);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    const mo = new ModelOrder();
    mo.context("IGIS asset management recently had a massive layoff of 300. At 2024 05 22");
    mo.ask("What is IGIS asset managment?");
    mo.generate();
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

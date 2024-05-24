/* eslint-disable no-undef */
import * as React from "react";
import { Button, tokens, makeStyles } from "@fluentui/react-components";
import { useAppDispatch } from "../../redux/store/hook";
import { modelSliceAction } from "../../redux/store/model/model";
import { setNamedObject } from "../../redux/store/block/blockMethodName";
import { QBlockProp } from "../../redux/store/block/dtypes";
import { QCellProp } from "../../util/address";

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

        const sc: QCellProp = { address: "A1" };
        const ec: QCellProp = { address: "E5" };
        const blockConfig: QBlockProp = {
          topleft: sc,
          botright: ec,
          name: "test",
          onSheet: "Sheet1",
        };

        await dispatch(setNamedObject({ context: context, blockConfig: blockConfig }));

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

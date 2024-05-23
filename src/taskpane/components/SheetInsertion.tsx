/* eslint-disable no-undef */
import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles } from "@fluentui/react-components";
import { addSheet } from "../redux/store/model/modelMethodSheet";
import { useAppDispatch } from "../redux/store/hook";

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
});

const SheetInsertion: React.FC = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>("Some");

  const handleTextInsertion = async () => {
    await Excel.run(async (context) => {
      try {
        console.log("here");
        await dispatch(addSheet({ context: context, name: text, config: {} }));
        console.log("here2");
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      <Field className={styles.textAreaField} size="large" label="Enter sheet's name.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field>
      <Button appearance="primary" disabled={false} size="large" onClick={handleTextInsertion}>
        Insert text
      </Button>
    </div>
  );
};

export default SheetInsertion;

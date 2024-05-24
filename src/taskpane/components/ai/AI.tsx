import * as React from "react";
import { Button, makeStyles, Field, Textarea } from "@fluentui/react-components";
import { ModelOrder } from "./modelconn";

const useStyles = makeStyles({
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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

const AI: React.FC = () => {
  const [context, setContext] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");

  const handleContextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(event.target.value);
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const shoot = async () => {
    const mo = new ModelOrder();
    mo.context(context);
    mo.ask(text);

    await mo.generate();
  };

  const styles = useStyles();

  return (
    <>
      <div className={styles.textPromptAndInsertion}>
        <Field className={styles.textAreaField} size="large" label="Enter context to be inserted into llm.">
          <Textarea size="large" value={context} onChange={handleContextChange} />
        </Field>
      </div>

      <div className={styles.textPromptAndInsertion}>
        <Field className={styles.textAreaField} size="large" label="Enter your question.">
          <Textarea size="large" value={text} onChange={handleTextChange} />
        </Field>
      </div>

      <div className={styles.textPromptAndInsertion}>
        <Button className={styles.buttons} appearance="primary" disabled={false} size="medium" onClick={shoot}>
          Generate
        </Button>
      </div>
    </>
  );
};

export default AI;

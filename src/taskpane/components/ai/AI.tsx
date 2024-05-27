/* eslint-disable no-undef */
import * as React from "react";
import { Button, makeStyles, Field, Textarea } from "@fluentui/react-components";
import { getManualBlock } from "../../redux/store/block/blockMethodName";
import { QBlockContent } from "../../redux/store/block/dtypes";
import { useAppDispatch } from "../../redux/store/hook";
import { ModelOrder } from "./modelconn";
import { TableDataType, TableParser, TimeSeriesAxis } from "./rangeParse";

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
  const [question, setQuestion] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string>("");

  const dispatch = useAppDispatch();

  // Employ 2 llm model logs
  const translator = new ModelOrder();
  const summaryBot = new ModelOrder();

  const handleContextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(event.target.value);
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const parseContext = async () => {
    await Excel.run(async (context) => {
      try {
        const valuesPayload = await dispatch(getManualBlock({ context: context }));
        const values = valuesPayload.payload as QBlockContent;

        setContext(TableParser.parse1D(values.values, TableDataType.TimeSeries, { ts: TimeSeriesAxis.X }));
      } catch (err) {
        console.error(err);
      }
    });
  };

  const answerQuestion = async () => {
    // Translate the question into English - for better performance
    translator.translateEng(question);
    const translated = await translator.generate();

    console.log("1st translation", question, translated.message.content);

    // Ask the question and get the `answer`
    summaryBot.context(context);
    summaryBot.ask(translated.message.content);

    const answer = await summaryBot.generate();
    setAnswer(answer.message.content);
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
          <Textarea size="large" value={question} onChange={handleTextChange} />
        </Field>
      </div>

      <div className={styles.textPromptAndInsertion}>
        <Field className={styles.textAreaField} size="large" label="Answer from model.">
          <Textarea size="large" value={answer} />
        </Field>
      </div>

      <div className={styles.textPromptAndInsertion}>
        <Button className={styles.buttons} appearance="primary" disabled={false} size="medium" onClick={parseContext}>
          Set Context
        </Button>
      </div>

      <div className={styles.textPromptAndInsertion}>
        <Button className={styles.buttons} appearance="primary" disabled={false} size="medium" onClick={answerQuestion}>
          Generate
        </Button>
      </div>
    </>
  );
};

export default AI;

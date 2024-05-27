import * as React from "react";
import Header from "./Header";
import { makeStyles } from "@fluentui/react-components";
import { Provider } from "react-redux";
import store from "../redux/store/root";
import ActionTest from "./laboratory/ActionTest";
import AI from "./ai/AI";
// import TradingViewSingleQuoteWidget from "./graph/TradingView";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props: AppProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Provider store={store}>
        <Header logo="assets/QuantumLogo.png" title={props.title} message="Quamtum Value" />
        {/* <TradingViewSingleQuoteWidget /> */}
        <AI />
        <ActionTest />
      </Provider>
    </div>
  );
};

export default App;

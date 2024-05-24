import * as React from "react";
import { Image, tokens, makeStyles } from "@fluentui/react-components";

export interface HeaderProps {
  title: string;
  logo: string;
  message: string;
}

const useStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "5px",
    paddingTop: "5px",
    backgroundColor: "#000f23",
  },
  logo: {
    marginRight: "20px",
  },
  message: {
    fontSize: "2.5em",
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, logo, message } = props;
  const styles = useStyles();

  return (
    <section className={styles.welcome__header}>
      <Image width="90" height="90" src={logo} alt={title} className={styles.logo} />
      <h3 className={styles.message}>{message}</h3>
    </section>
  );
};

export default Header;

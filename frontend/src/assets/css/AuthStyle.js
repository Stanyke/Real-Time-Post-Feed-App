import backgroundImage from "../images/bg-img.png";

export const AuthStyle = (theme) => {
  return {
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    homeScreen: {
      display: "grid",
      gridTemplateColumns: "40% 60%",
      
      "@media (max-width: 700px)": {
        gridTemplateColumns: "100%"
      }
    },
    leftSideContainer: {
      position: "relative",
      backgroundImage: `linear-gradient(to top, #0c499ca6, #0dcfef3d), url(${backgroundImage})`,
      height: "100vh",
      backgroundSize: "cover",
      
      "@media (max-width: 700px)": {
        display: "none"
      }
    },
    imageBoxText: {
      top: "35%",
      color: "white",
      textAlign: "center",
      verticalAlign: "middle",
      position: "relative",
      fontSize: "30px",
      padding: "0px 80px",
    },
    headerNav: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "50px",
    },
    headerNavWriteUp: {
      color: "#999",
      margin: "auto 50px auto 0px",
    },
    headerNavBtn: {
      color: "#3f92ff",
      padding: "10px 20px",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    rightSideContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formBox: {
      width: "50%",
      margin: "auto",
      textAlign: "center",
    },
    formNotice: {
      fontSize: "x-large",
      fontWeight: 800,
      textAlign: "left",
    },
    inputForm: {
      width: "100%",
    },
    authBtn: {
      background: "#3f92ff",
      padding: "10px 20px",
      color: "white",
      width: "150px",
      marginTop: "50px",
    },
    chatIcon: {
      fontSize: 100
    }
  };
};

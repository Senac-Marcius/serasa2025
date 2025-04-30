import { StyleSheet } from "react-native";
import theme from "../../../styles/theme";


const styles = StyleSheet.create({
    output: {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      borderRadius: 25,
      width: 250,
      height: 150,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 5,
    },
    titulos: {
      fontSize: 34,
      fontWeight: 600,
    },
    button_handle: {
      width: 150,
      height: 50,
      borderRadius: 25,
      backgroundColor: "green",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      fontSize: 18,
      color: theme.COLORS.GRAY100,
      
      
      
    },
  
    textinput: {
      borderRadius: "5px",
      padding: 5,
      width: 400,
    },
    container: {
      display: "flex",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    row: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
  
    button_editar: {
      backgroundColor: "yellow",
      borderRadius: 25,
      width: 80,
      height: 40,
      color: "black",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button_deletar: {
      backgroundColor: "red",
      borderRadius: 25,
      width: 80,
      height: 40,
      color: "black",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  
    formtxt: {
      width: 500,
      height: 600,
      backgroundColor: "white",
      padding: 25,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      borderRadius: "25px",
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    },
  });
  
  export default styles;
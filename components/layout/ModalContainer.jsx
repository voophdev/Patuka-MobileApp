import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const ModalContainer = ({children}) => {
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      {children}
    </ScrollView>
  );
}

export default ModalContainer

const styles = StyleSheet.create({
    mainContainer: {
    flexGrow: 1,
    width: "100%",
    height: 2580,
    backgroundColor: "black",
  },
})

import { StyleSheet, Text, View } from 'react-native'
import BoxComponent from './BoxComponent';

const AutomationSection = ({children}) => {
  return (
    <View style={styles.automationContainer}>
      {children}
    </View>
  );
}

export default AutomationSection

const styles = StyleSheet.create({
  automationContainer: {
    marginTop: 25,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    // backgroundColor: "#FF9933",
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    // padding: 20,
    borderRadius: 6,
  },
});
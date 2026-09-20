import { StyleSheet, Text, View } from 'react-native'

const MinMaxLevel = ({ title, value, color }) => (
  <View style={styles.minMaxLevel}>
    <View style={[{backgroundColor: color}, styles.titleBox]}>
      <Text style={styles.levelTitle}>{title}</Text>
    </View>
    <View style={[{borderColor: color}, styles.levelBox]}>
      <Text style={styles.levelText}>{value}</Text>
    </View>
  </View>
);

export default MinMaxLevel

const styles = StyleSheet.create({
  minMaxLevel: {
    backgroundColor: "#242424",
    height: 175,
    width: "47%",
  },
  titleBox: {
    height: 45,
    justifyContent: "center",
    paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  levelTitle: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 14,
    width: 120,
  },
  levelBox: {
    justifyContent: "center",
    alignItems: "center",
    height: "74%",
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  levelText: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 28,
  },
});
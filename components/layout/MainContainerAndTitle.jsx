import { StyleSheet, Text, View } from "react-native";

export default function MainContainerAndTitle({ title, children }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.sectionContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: "#7A5C58",
    width: "90%",
    fontWeight: "bold",
    fontSize: 28,
  },
  sectionContainer: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "88%",
    height: "72%",
    maxHeight: "72%",
    borderRadius: 6,
    alignItems: "center",
    paddingTop: 30,
  },
});

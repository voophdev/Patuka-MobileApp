import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const BoxComponent = ({ title, icon, onPress, children }) => {
  return (
    <View style={styles.boxes}>
      <View style={styles.boxHeaderContainer}>
        <View style={styles.boxTitleContainer}>
          <Text style={styles.boxTitle}>{title}</Text>
        </View>
        <View>
          <Pressable onPress={onPress}>
            {icon}
          </Pressable>
        </View>
      </View>
      <View style={styles.boxContentContainer}>
        {children}
      </View>
    </View>
  )
}

export default BoxComponent

const styles = StyleSheet.create({
  boxes: {
    width: "47%",
    height: 160,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 6,
    alignItems: "center",
  },
  boxHeaderContainer: {
    // backgroundColor: "black",
    backgroundColor: "#141414",
    width: "100%",
    height: 53,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  boxTitle: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "serif",
    fontSize: 14,
    width: 76.8,
  },
  boxContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
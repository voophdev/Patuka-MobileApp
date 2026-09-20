import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Headers = ({upperTitle, upperColor, lowerTitle, description}) => {
  return (
    <View style={styles.feedConsumptionText}>
      <Text style={[styles.text, { color: upperColor}]}>{upperTitle}</Text>
      {lowerTitle ? <Text style={styles.text}>{lowerTitle}</Text> : null}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export default Headers

const styles = StyleSheet.create({
  feedConsumptionText: {
    marginTop: 35,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 34,
    color: "#FFFFFF",
  },
  description: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    color: "#B2B2B2",
    marginTop: 8,
  },
});
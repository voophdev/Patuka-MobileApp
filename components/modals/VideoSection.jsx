import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import { Video } from "expo-av";

const VideoSection = ({ title, background, router, videoURL }) => {
  return (
    <View style={[styles.feedConsumptionContainer, { backgroundColor: background }]}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <AntDesign
          style={styles.closeButtonText}
          name='closecircle'
          size={24}
          color='black'
        />
      </TouchableOpacity>

      <View style={styles.feedConsumptionText}>
        <Text style={[styles.text, { color: "white" }]}>{title}</Text>
        <Text style={styles.text}>Insights</Text>
      </View>

      <Video
        source={videoURL}
        style={styles.video}
        isLooping
        shouldPlay
        resizeMode='cover'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedConsumptionContainer: {
    width: "100%",
    height: 500,
    padding: 25,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "transparent",
    padding: 10,
    elevation: 5,
  },
  feedConsumptionText: {
    marginTop: 60,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 34,
    color: "#181818",
  },
  video: {
    height: 250,
    width: "100%",
    borderRadius: 10,
    marginTop: 35,
    elevation: 20,
  },
});

export default VideoSection;

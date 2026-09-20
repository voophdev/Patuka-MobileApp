import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Layout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')} // Path to your image
      style={styles.background}
      blurRadius={8}
    >
      <View style={styles.content}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  content: {
    flex: 1,
  },
});

export default Layout;

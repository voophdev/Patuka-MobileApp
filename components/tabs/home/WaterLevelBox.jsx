import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import CircularProgress from './animation/CircularProgress'; // Import the CircularProgress component
import BoxComponent from "./BoxComponent";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const WaterLevelBox = ({waterLevel}) => {
  const router = useRouter();
  return (
    <BoxComponent
      title='Water Level'
      icon={<MaterialIcons name='water-drop' size={26} color='#73CBEA' />}
      onPress={() => router.push("/waterMonitoring")}
    >
      <View style={styles.container}>
        <CircularProgress
          progress={waterLevel}
          size={79} // Adjust size as needed
          strokeWidth={10}
        />
      </View>
    </BoxComponent>
  );
};

export default WaterLevelBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

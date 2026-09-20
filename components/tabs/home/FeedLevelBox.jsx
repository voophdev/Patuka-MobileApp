import { StyleSheet, View } from 'react-native';
import { useRouter } from "expo-router";

import CircularProgress from './animation/CircularProgress'; // Import the CircularProgress component
import BoxComponent from './BoxComponent';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FeedLevelBox = ({feedLevel}) => {
  const router = useRouter();
  return (
    <BoxComponent
      title='Feed Level'
      icon={<MaterialCommunityIcons name='barn' size={26} color='white' />}
      onPress={() => router.push("/feedMonitoring")}
    >
      <View style={styles.container}>
        <CircularProgress
          progress={feedLevel}
          size={80} // Adjust size as needed
          strokeWidth={10}
        />
      </View>
    </BoxComponent>
  );
};

export default FeedLevelBox;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
  },
});

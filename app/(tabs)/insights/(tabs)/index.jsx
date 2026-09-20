import { Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Layout from "../../../../components/layout/Layout"
import { useRouter } from 'expo-router';

const insightRoutes = [
  {
    title: "Feed Consumption",
    details:
      "Monitor daily, weekly, and monthly feed consumption to optimize your feeding schedule. Track trends and ensure your animals are receiving the right amount of nutrition.",
    route: "/(modals)/feedConsumption",
  },
  {
    title: "Feed Quality Overview",
    details:
      "Ensure optimal feed conditions by monitoring moisture levels and temperature. Stay informed about potential issues that could affect feed quality and safety.",
    route: "/(modals)/feedQuality",
  },
  {
    title: "Water Quality Overview",
    details:
      "Keep your chickens healthy by ensuring their water is clean and safe. Monitor pH levels and temperature to prevent issues that could affect hydration and overall well-being.",
    route: "/(modals)/waterQuality",
  },
];

export default function insights() {

  const router = useRouter();
  const handlePress = (route) => () => router.push(`insights${route}`);

  return (
    <Layout>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Insights</Text>
        </View>
        <View style={styles.sectionContainer}>
          {insightRoutes.map((insight)=> (
            <View key={insight.route} style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDetails}>{insight.details}</Text>
              </View>
              <Pressable
                onPress={handlePress(insight.route)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Learn More</Text>
                <Ionicons name='arrow-forward' size={16} color='white' />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </Layout>
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
    marginTop: 10,
    width: "88%",
    height: "72%",
    maxHeight: "72%",
    borderRadius: 6,
    alignItems: "center",
  },
  itemContainer: {
    marginTop: 35,
    width: "100%",
    backgroundColor: "#FF9933",
    borderRadius: 9,
    elevation: 5,
  },
  textContainer: {
    padding: 15,
  },
  insightTitle: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 15,
  },
  insightDetails: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 13,
    marginTop: 5,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto-Light",
  },
});
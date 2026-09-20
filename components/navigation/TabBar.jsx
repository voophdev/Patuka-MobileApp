import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

const TabBar = ({ state, descriptors, navigation, shouldHideTabBar }) => {
  // If shouldHideTabBar is true, return null to hide the TabBar
  if (shouldHideTabBar) {
    return null;
  }

  const icons = {
    index: (props) => <Ionicons name='home-outline' size={28} color={greyColor} {...props} />,
    feedMonitoring: (props) => <MaterialIcons name='grain' size={28} color={greyColor} {...props} />,
    waterMonitoring: (props) => <Ionicons name='water-outline' size={28} color={greyColor} {...props} />,
    automation: (props) => <Ionicons name='settings-outline' size={28} color={greyColor} {...props}/>,
    insights: (props) => <MaterialIcons name='insights' size={28} color={greyColor} {...props} />,
  };

  const primaryColor = "#FFFFFF";
  const greyColor = "#808080";

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["reset"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabBarItem}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? primaryColor : greyColor,
            })}
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(24, 24, 24, 0.8)",
    paddingVertical: 15,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 3,
  },
});

export default TabBar;

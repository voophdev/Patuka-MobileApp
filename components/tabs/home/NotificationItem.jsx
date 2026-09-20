import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationItem = ({ item, onDelete }) => {
  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Icon name="close" size={15} color="white" />
        </TouchableOpacity>
      )}
    >
      <View style={styles.notificationItem}>
        <Text style={styles.notificationText}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  notificationText: {
    color: "white",
    flex: 1,
  },
  notificationTime: {
    color: "white",
    marginLeft: 10,
    fontSize: 12,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 20, // Adjust based on your design
    width: 20,  // Adjust based on your design
    borderRadius: 15,
    marginRight: 10,
    marginTop: 10,
  },
});

export default memo(NotificationItem);

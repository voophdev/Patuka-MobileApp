import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import NotificationItem from './NotificationItem'; // Import the NotificationItem component

const Notifications = ({ notifications, setNotifications }) => {
  const handleDelete = useCallback((id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  }, [setNotifications]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const renderNotification = useCallback(({ item }) => (
    <NotificationItem item={item} onDelete={handleDelete} />
  ), [handleDelete]);

  return (
    <View style={styles.notificationsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.notificationsTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleClearAll} style={styles.clearAllButton}>
          <Text style={styles.clearAllButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}  // Adjust based on your needs
        maxToRenderPerBatch={10} // Adjust based on your needs
        windowSize={10}          // Adjust based on your needs
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainer: {
    width: "90%",
    padding: 10,
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 6,
    maxHeight: 190,
		minHeight: 190,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationsTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  clearAllButton: {
    padding: 5,
  },
  clearAllButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default Notifications;

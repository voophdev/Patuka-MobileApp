import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

// Initialize notification handling
export const notificationsHandler = (setNotifications: React.Dispatch<React.SetStateAction<any[]>>) => {
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission for notifications was denied');
    }
  };

  requestPermissions();

  // Set up notification handlers
  const subscription = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
    const { title, body } = notification.request.content;
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), message: `${title}: ${body}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
  });

  return () => subscription.remove();
};

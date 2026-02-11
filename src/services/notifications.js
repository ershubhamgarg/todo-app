import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const registerForNotifications = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'LetsDoIt',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    return status === 'granted';
  } catch (error) {
    return false;
  }
};

export const scheduleTodoReminder = async ({ title, minutesFromNow }) => {
  if (!minutesFromNow || minutesFromNow <= 0) return null;
  try {
    const trigger = { seconds: minutesFromNow * 60 };
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Reminder: ${title}`,
        body: `Let’s do it!!`,
      },
      trigger,
    });
    return id;
  } catch (error) {
    return null;
  }
};

export const cancelReminder = async (notificationId) => {
  if (!notificationId) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    // no-op
  }
};

export class PushNotificationSender {
    sendNotification(userName: string, message: string): void {
        alert(`Sending notification to ${userName}: ${message}`);
    }
}

export class PushNotificationSender {
    sendNotification(userId: string, message: string): void {
        alert(`Sending notification to ${userId}: ${message}`);
    }
}

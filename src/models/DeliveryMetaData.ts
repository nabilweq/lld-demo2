export class DeliveryMetaData {
    deliveryId: string;
    deliveryTime: Date;

    constructor(deliveryId: string, deliveryTime: Date) {
        this.deliveryId = deliveryId;
        this.deliveryTime = deliveryTime;
    }

    getDeliveryDetails(): string {
        return `Delivery ID: ${this.deliveryId}, Time: ${this.deliveryTime}`;
    }
}

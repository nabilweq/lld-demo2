export interface IDeliveryPartnerMatchingStrategy {
    matchPartner(orderId: string): string; // Example method
}

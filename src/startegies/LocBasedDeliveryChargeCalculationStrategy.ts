import { IDeliveryPartnerMatchingStrategy } from './IDeliveryPartnerMatchingStrategy';

export class LocBasedDeliveryChargeCalculationStrategy implements IDeliveryPartnerMatchingStrategy {
    matchPartner(orderId: string): string {
        // Implement the logic to match a delivery partner based on location
        return `Partner for order ${orderId} based on location matching strategy`;
    }

    calculateCharge(distance: number): number {
        return distance * 10; // Example calculation
    }
}

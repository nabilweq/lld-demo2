import { IDeliveryPartnerMatchingStrategy } from "../startegies/IDeliveryPartnerMatchingStrategy";

export class DeliveryPartnerManager {
    strategy: IDeliveryPartnerMatchingStrategy;

    constructor(strategy: IDeliveryPartnerMatchingStrategy) {
        this.strategy = strategy;
    }

    assignPartner(orderId: string): string {
        return this.strategy.matchPartner(orderId);
    }
}
 
import { Order } from "../models/Order";

export class OrderManager {
    orders: Order[] = [];

    createOrder(order: Order): void {
        this.orders.push(order);
    }

    getOrderById(orderId: string): Order | undefined {
        return this.orders.find(order => order.id === orderId);
    }

    getAllOrders(): Order[] {
        return this.orders;
    }
}

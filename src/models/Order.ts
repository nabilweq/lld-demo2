export class Order {
    id: string;
    userId: string;
    restaurantId: string;
    food:string

    constructor(id: string, userId: string, restaurantId: string, food:string) {
        this.id = id;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.food = food;
    }

    getOrderDetails(): string {
        return `Order ID: ${this.id}, User ID: ${this.userId}, Restaurant ID: ${this.restaurantId}`;
    }
}

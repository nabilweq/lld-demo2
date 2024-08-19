import { UserManager } from './UserManager';
import { Restaurant } from '../models/Restaurant';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { OrderManager } from './OrderManager';
import { Food } from '../models/Food';
import { DeliveryPartnerManager } from './DeliveryPartnerManager';

export class FoodManager {
    private restaurants: Restaurant[] = [];
    private orders: Order[] = [];
    private users: User[] = [];
    private foods: Food[] = [];
    private orderManager: OrderManager;
    private userManager: UserManager;
    private deliveryPartnerManager: DeliveryPartnerManager;

    constructor(orderManager: OrderManager, userManager: UserManager, deliveryPartnerManager: DeliveryPartnerManager) {
        this.orderManager = orderManager;
        this.userManager = userManager;
        this.deliveryPartnerManager = deliveryPartnerManager;
    }

    trackAllOrders(): string {
        const orders = this.orderManager.getAllOrders();
        return orders.map(order => {
            const user = this.userManager.getUserById(order.userId);
            const restaurant = this.getRestaurantById(order.restaurantId);
            const deliveryPartner = this.deliveryPartnerManager.assignPartner(order.id);
            return `Order ID: ${order.id} User: ${user ? user.name : 'Unknown User'} Restaurant: ${restaurant ? restaurant.name : 'Unknown Restaurant'} Delivery Partner: ${deliveryPartner ? deliveryPartner : 'No Partner Assigned'}`;
        }).join('\n');
    }

    addRestaurant(restaurant: Restaurant): void {
        this.restaurants.push(restaurant);
        console.log(`Restaurant ${restaurant.name} added successfully.`);
    }

    placeOrder(order: Order): void {
        this.orders.push(order);
        console.log(`Order ${order.id} placed successfully by User ${order.userId} at Restaurant ${order.restaurantId}.`);
    }

    registerUser(user: User): void {
        this.users.push(user);
        console.log(`User ${user.name} registered successfully.`);
    }

    cookFood(food: Food): void {
        this.foods.push(food);
        console.log(`Food: ${food} taken to stove.`);
    }

    getRestaurantById(restaurantId: string): Restaurant | undefined {
        return this.restaurants.find(restaurant => restaurant.id === restaurantId);
    }

    getOrdersByUserId(userId: string): Order[] {
        return this.orders.filter(order => order.userId === userId);
    }

    listAllRestaurants(): Restaurant[] {
        return this.restaurants;
    }
}

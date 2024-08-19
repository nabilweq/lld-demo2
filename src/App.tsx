import React, { useState } from 'react';
import './styles/App.css';
import { DeliveryPartnerManager } from './managers/DeliveryPartnerManager';
import { LocBasedDeliveryChargeCalculationStrategy } from './startegies/LocBasedDeliveryChargeCalculationStrategy';
import { OrderManager } from './managers/OrderManager';
import { PushNotificationSender } from './models/PushNotificationSender';
import { UserManager } from './managers/UserManager';
import { Restaurant } from './models/Restaurant';
import { Order } from './models/Order';
import { User } from './models/User';
import { Food } from './models/Food';
import { FoodManager } from './managers/FoodManager';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [food, setFood] = useState('');
  const [distance, setDistance] = useState(1);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [log, setLog] = useState<string[]>([]);

  const userManager = new UserManager();
  const orderManager = new OrderManager();
  const pushNotificationSender = new PushNotificationSender();
  const deliveryStrategy = new LocBasedDeliveryChargeCalculationStrategy();
  const deliveryManager = new DeliveryPartnerManager(deliveryStrategy);
  const foodManager = new FoodManager(orderManager, userManager, deliveryManager);

  // list of restaurants
  const restaurants = [
    new Restaurant('1', 'Al Sheba', 'Kakkanad, Kochi'),
    new Restaurant('2', 'Origami Restaurant', 'Padamugal, Kochi'),
    new Restaurant('3', 'Rahmath Hotel', 'Calicut'),
    new Restaurant('4', 'Thal Kitchen', 'Kalamassery, Kochi')
  ];

  restaurants.forEach(restaurant => foodManager.addRestaurant(restaurant));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !selectedRestaurantId || !food) {
      alert('Please fill out all fields.');
      return;
    }

    const user = new User('1', name, email);
    const orderedFood = new Food('1', food, 'Chineese');
    const restaurant = foodManager.getRestaurantById(selectedRestaurantId);
    if (!restaurant) return;

    userManager.addUser(user);
    foodManager.registerUser(user);
    foodManager.cookFood(orderedFood)

    const order = new Order('1', user.id, restaurant.id, food);
    orderManager.createOrder(order);
    foodManager.placeOrder(order);

    const deliveryCharge = deliveryStrategy.calculateCharge(distance);
    const deliveryPartner = deliveryManager.assignPartner(order.id);

    pushNotificationSender.sendNotification(user.name, `Your order from ${restaurant.name} is being processed. Delivery charge: ${deliveryCharge}`);

    const logMessages = [
      `User Details: ${JSON.stringify(user.getUserDetails())}`,
      `Food Details: ${JSON.stringify(orderedFood.getFoodDetails())}`,
      `Restaurant Details: ${JSON.stringify(restaurant.getRestaurantDetails())}`,
      `Order Details: ${JSON.stringify(order.getOrderDetails())}`,
      `Assigned Delivery Partner: ${deliveryPartner}`,
    ];

    setLog(logMessages);
  };

  return (
    <div className="container">
        <h1>Swiggy/Zomato LLD Demo</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group">
                <label>Select Restaurant:</label>
                <select value={selectedRestaurantId} onChange={(e) => setSelectedRestaurantId(e.target.value)}>
                    <option value="">--Select Restaurant--</option>
                    {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Food item:</label>
                <input type="text" value={food} onChange={(e) => setFood(e.target.value)}/>
            </div>
            
        </div>
        <div className="form-row">
            <div className="form-group">
                <label>Distance from restaurant:</label>
                <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))}/>
            </div>
        </div>
        <div className="button-group">
            <button className="btn" type="submit">Place Order</button>
        </div>
      </form>

      {log.length>0 && (
        <div className="order-log-container">
            <div className="order-log-card">
                <div className="order-log-card-header">
                    <h2 className="order-log-card-title">Order Details</h2>
                </div>
                <div className="order-log-card-content">
                    {log.map((entry, index) => {
                        return (
                            <div key={index} className="order-log-entry">
                                <p className="order-log-entry-content">{entry}</p>
                                {index < log.length - 1 && <hr className="order-log-separator" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

      )}
    </div>
  );
};

export default App;

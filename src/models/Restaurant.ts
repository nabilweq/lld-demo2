export class Restaurant {
    id: string;
    name: string;
    address: string;

    constructor(id: string, name: string, address: string) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    getRestaurantDetails(): string {
        return `Restaurant ID: ${this.id}, Name: ${this.name}, Address: ${this.address}`;
    }
}

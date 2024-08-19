export class Food {
    id: string;
    name: string;
    cuisine: string;

    constructor(id: string, name: string, cuisine: string) {
        this.id = id;
        this.name = name;
        this.cuisine = cuisine;
    }

    getFoodDetails(): string {
        return `Food ID: ${this.id}, Name: ${this.name}, Cuisine: ${this.cuisine}`;
    }
}

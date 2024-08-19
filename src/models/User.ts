export class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getUserDetails(): string {
        return `User ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    }
}

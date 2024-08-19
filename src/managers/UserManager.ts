import { User } from "../models/User";

export class UserManager {
    users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    getUserById(userId: string): User | undefined {
        return this.users.find(user => user.id === userId);
    }
}

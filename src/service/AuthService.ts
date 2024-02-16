import { UserData } from "../models/UserData";


export default interface AuthService {
    // login(): Promise<UserData>;
    login(): void
    logout(): void
}
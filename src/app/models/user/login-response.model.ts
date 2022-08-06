import { Licence } from "./licence.model";
import { User } from "./user.model";

export interface LoginResponse {
    "accessToken": string,
    "user": User,
    "sessionId": string,
    "lastLogin": string,
    "licence": Licence,
    "passwordExpiry": string,
    "passwordManuallyExpired": boolean
}
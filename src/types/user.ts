import { UserLocation } from "./user-location";
import { UserName } from "./user-name";

export interface User {
    id: string;
    email: string;
    name: UserName;
    picture: {medium: string};
    location: UserLocation;
}
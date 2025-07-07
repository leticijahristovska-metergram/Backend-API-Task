import {UserData} from "./GetUserData";
import {SupportData} from "./SupportData";

export interface GetUserResponseBody {
    data: UserData;
    support: SupportData;
}
import { BaseEntity } from "../Base/baseEntity";

export class RegisterDto extends BaseEntity {
    password: string | null;
    email: string | null;
    phoneNumber: string | null;
    imageUrl: string | null;
}
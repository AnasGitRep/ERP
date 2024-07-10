import { BaseEntity } from "../Base/baseEntity";

export class LoginResponseDto extends BaseEntity {
    email: string | null;
    jwtToke: string | null;
    imageUrl: string | null;
}
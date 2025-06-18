import { Expose } from "class-transformer";

export class UserDto {  
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Expose()
    fullname?: string;
    @Expose()
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

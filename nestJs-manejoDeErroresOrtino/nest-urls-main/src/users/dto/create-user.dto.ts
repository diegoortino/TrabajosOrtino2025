import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()        
    fullname?: string;
    @IsString()    
    phone?: string;
}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductoDto {
    @IsNumber()
    codigo_producto:number;
    
    @IsString()
    @IsNotEmpty()
    marca:string;
    
    @IsString()
    @IsNotEmpty()
    nombre:string;
    @IsString()
    @IsNotEmpty()
    descripcion:string;
    @IsNumber()
    precio:number;

    @IsNumber()
    stock:number;
}

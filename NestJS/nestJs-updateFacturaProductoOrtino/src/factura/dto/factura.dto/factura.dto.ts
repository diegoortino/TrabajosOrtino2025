import { ArrayNotEmpty, ArrayUnique, IsArray, IsDateString, IsNumber } from "class-validator";

export class FacturaDto {
    @IsNumber()
    nro_factura:number;
    @IsDateString()
    fecha:Date;
    @IsNumber()
    total_sin_iva:number;
    @IsNumber()
    iva:number;
    @IsNumber()
    total_con_iva:number;
    @IsNumber()
    nro_cliente:number;
    
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    productos:number[];
    
    @IsArray()
    @ArrayNotEmpty()
    cantidad:number[];
}

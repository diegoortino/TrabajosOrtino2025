import { IsInt, IsOptional, IsString, MaxLength, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ClienteDto {
  @IsOptional()
  @IsInt()
  @Type(()=>Number)
  id?: number;

  @IsString()
  @MaxLength(45)
  nombre: string;

  @IsString()
  @MaxLength(45)
  apellido: string;

  @IsString()
  @MaxLength(45) 
  direccion: string;

  @IsInt()
  @Min(0)
  @Max(999)
  @Type(()=>Number)
  activo: number;
}

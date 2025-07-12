import { Module } from '@nestjs/common';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './factura.entity/factura.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Producto } from 'src/producto/producto.entity/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, Cliente,Producto])],
  controllers: [FacturaController],
  providers: [FacturaService]
})
export class FacturaModule {}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { Factura } from './factura.entity/factura.entity';
import { FacturaDto } from './dto/factura.dto/factura.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Producto } from 'src/producto/producto.entity/producto.entity';

@Controller('factura')
export class FacturaController {
    constructor(private readonly facturaService:FacturaService) {}
    
    @Get()
    async findAll():Promise<Factura[]>{
        return this.facturaService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Factura | null> {
    return this.facturaService.findOne(id);
    }
    @Get('producto/:idProducto')
    async getFacturasByProducto(@Param('idProducto', ParseIntPipe) idProducto: number):Promise<Factura[]>{
        return this.facturaService.findFacturasByProducto(idProducto);
    }
    @Get('producto/facturados/mas-de-tres')
    async getProductosFacturadosMasDe3():Promise<Producto[]>{
        return this.facturaService.findProductosFacturadosMasDe3Veces()
    }
    @Get('producto/facturado/mas-vendido')
    async getProductoMasVendido():Promise <{producto:Producto, total:number}>{
        return this.facturaService.findProductoMasVendido();
    }


    @Post()
    async create(
    @Body(new ValidationPipe({transform:true})) facturaDto:FacturaDto):Promise<Factura>{
        return this.facturaService.create(facturaDto);
    }

    @Post(':nroFactura/productos/:idProducto/cantidad/:cantidad')
    async addProductoToFactura(@Param('nroFactura') nroFactura:number,@Param('idProducto') idProducto:number,@Param('cantidad') cantidad:number){
        return this.facturaService.addProductoToFactura(nroFactura,idProducto,cantidad);

    }


    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ transform: true })) dto: Partial<FacturaDto>,): Promise<Factura> {
            return this.facturaService.update(id, dto);
        }

        

    @Delete(':nroFactura/productos/:idProducto')
    async removeProducto(@Param('nroFactura') nroFactura:number,@Param('idProducto') idProducto:number){
        return this.facturaService.removeProductoFromFactura(nroFactura,idProducto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number){
        return this.facturaService.remove(id);
    }

   





}

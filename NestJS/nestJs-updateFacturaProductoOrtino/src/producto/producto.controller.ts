import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity/producto.entity';
import { ProductoDto } from './dto/producto.dto/producto.dto';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService:ProductoService){}

    @Get()
    async findAll():Promise<Producto[]>{
        return this.productoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Producto | null> {
        return this.productoService.findOne(id);
    }
    @Delete(':id')
    async remove(@Param('id') id:number){
        return this.productoService.remove(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: Partial<Producto>) {
    return this.productoService.update(id, dto);
    }

    @Post()
    async create(@Body() dto: ProductoDto) {
         return this.productoService.create(dto);
    }

}

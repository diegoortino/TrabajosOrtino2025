import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity/producto.entity';
import { Repository } from 'typeorm';
import { ProductoDto } from './dto/producto.dto/producto.dto';

@Injectable()
export class ProductoService {
constructor(
    @InjectRepository(Producto)
    private productoRepository:Repository<Producto>,
){}

async findAll():Promise<Producto[]>{
    return this.productoRepository.find();
}

async findOne(id:number):Promise<Producto | null>{
    return this.productoRepository.findOne({ where: {idProducto:id}
    }
)
}

async remove(id:number){
    try{
    await this.productoRepository.delete(id);
    }catch(e){
        return "no se puede eliminar el producto";
    }
}

async create(dto: ProductoDto): Promise<Producto> {
    const existente = await this.productoRepository.findOne({
        where: { nombre: dto.nombre },
    });
    if (existente) {
        throw new Error("producto ya existe");
    }
    const producto = this.productoRepository.create({
        ...dto,
        idProducto: dto.codigo_producto, // 🔁 Mapeo manual
    });
    return this.productoRepository.save(producto);
}

    async update(id: number, dto: Partial<Producto>): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ idProducto: id });

        if (!producto) {
            throw new NotFoundException (`No se encuentra el producto con id ${id}`);
        }

        producto.marca = dto.marca ?? producto.marca;
        producto.nombre = dto.nombre ?? producto.nombre;
        producto.descripcion = dto.descripcion ?? producto.descripcion;
        producto.precio = dto.precio ?? producto.precio;
        producto.stock = dto.stock ?? producto.stock;
        
        return this.productoRepository.save(producto);
    }

}

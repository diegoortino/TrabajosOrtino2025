import { Injectable, NotFoundException } from '@nestjs/common';
import { Factura } from './factura.entity/factura.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { FacturaDto } from './dto/factura.dto/factura.dto';
import { Producto } from 'src/producto/producto.entity/producto.entity';

@Injectable()
export class FacturaService {
    constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
     @InjectDataSource() private readonly dataSource: DataSource
    
){}

   async findAll(): Promise<Factura[]> {
        return this.facturaRepository.find({relations: ['cliente']});
}
    async findOne(id: number) {
    return this.facturaRepository.findOne({ where: { nro_factura: id }, relations: ['cliente'] });
}
 

async create(dto: FacturaDto): Promise<Factura> {
  if (dto.productos.length !== dto.cantidad.length) {
    throw new Error("La cantidad de productos y cantidades no coincide");
  }

  const cliente = await this.clienteRepository.findOne({
    where: { id: dto.nro_cliente },
  });

  if (!cliente) throw new Error("Cliente no existe");

  const existe = await this.facturaRepository.findOne({
    where: { nro_factura: dto.nro_factura },
  });

  if (existe) throw new Error("Ya existe factura con el mismo número");

  const productos = await this.productoRepository.findBy({
    idProducto: In(dto.productos),
  });

  if (productos.length !== dto.productos.length) {
    throw new Error("Algunos productos no existen");
  }

  // Crear factura sin relación con productos
  const factura = this.facturaRepository.create({
    nro_factura: dto.nro_factura,
    fecha: dto.fecha,
    total_sin_iva: dto.total_sin_iva,
    iva: dto.iva,
    total_con_iva: dto.total_con_iva,
    cliente: cliente,
  });

  const facturaGuardada = await this.facturaRepository.save(factura);

  // Insertar manualmente en tabla intermedia
  for (let i = 0; i < dto.productos.length; i++) {
    await this.facturaRepository.query(
      `INSERT INTO E01_DETALLE_FACTURA (nro_factura, codigo_producto, nro_item, cantidad) VALUES (?, ?, ?, ?)`,
      [facturaGuardada.nro_factura, dto.productos[i], i + 1, dto.cantidad[i]]
    );
  }
  return facturaGuardada;
}


async remove(id:number){
    const factura = await this.facturaRepository.findOne({where: { nro_factura:id }});
    if(!factura){
        throw new Error("no existe la factura");
    }
    await this.facturaRepository.remove(factura);
}


async addProductoToFactura(nroFactura:number,idProducto:number,cantidad:number):Promise<void>{
      if(cantidad <= 0){
        throw new Error("cantidad tiene que se mayor a cero");
      }
      const factura = await this.facturaRepository.findOneBy({nro_factura:nroFactura});
      
      if(!factura){
        throw new Error("factura No existe");
      }
      const producto = await this.productoRepository.findOneBy({idProducto});
      
      if(!producto){
        throw new Error("producto No existe");
      }

      const [existe] = await this.dataSource.query(`SELECT 1 FROM E01_DETALLE_FACTURA WHERE nro_factura = ? and codigo_producto = ?`,
        [nroFactura,idProducto],
      );
      if(existe){
        throw new Error("este producto ya esta relacionado a la factura");
      }

      const result = await this.dataSource.query(`SELECT MAX(nro_item) as MAX FROM E01_DETALLE_FACTURA WHERE nro_factura = ?`,
        [nroFactura],
      );
      const nroItem = (result[0]?.max || 0) + 1;

      await this.dataSource.query(`INSERT INTO E01_DETALLE_FACTURA (nro_item, nro_factura, codigo_producto, cantidad) VALUES (?,?,?,?)`,
        [nroItem,nroFactura,idProducto,cantidad]);    
    }

    async removeProductoFromFactura(nroFactura:number,idProducto:number){
      const [detalle] = await this.dataSource.query(`SELECT 1 FROM E01_DETALLE_FACTURA WHERE nro_factura = ? AND codigo_producto = ?`,
        [nroFactura,idProducto]
      );
      
      if (!detalle){
        throw new Error("no existe relacion entre producto y factura");
      }
      
      await this.dataSource.query(`DELETE FROM E01_DETALLE_FACTURA WHERE nro_factura= ? and codigo_producto = ?`,
        [nroFactura,idProducto],
      );
      
      return "producto eliminado correctamente";
    }

    async findFacturasByProducto(idProducto:number):Promise<Factura[]>{
      return this.facturaRepository.createQueryBuilder('factura')
      .innerJoin('factura.productos','producto')
      .where('producto.idProducto = :idProducto',{idProducto})
      .getMany();
    }

      async findProductosFacturadosMasDe3Veces():Promise<Producto[]>{
        return this.productoRepository.createQueryBuilder('p').innerJoin('e01_detalle_factura','df','df.codigo_producto = p.codigo_producto').groupBy('p.codigo_producto').having('COUNT(df.nro_factura)>:min',{min:3}).getRawMany();
    }

      async findProductoMasVendido():Promise<{producto:Producto,total:number}>{
   
          const result = await this.productoRepository.createQueryBuilder('producto')
          .innerJoin('e01_detalle_factura','detalle', 'producto.codigo_producto = detalle.codigo_producto')
          .select('producto')
          .addSelect('COUNT(detalle.nro_factura)','total')
          .groupBy('producto.codigo_producto')
          .orderBy('total','DESC')
          .limit(1)
          .getRawAndEntities();

        if(result.entities.length === 0){
          throw new Error("resultado 0");
        } ;
       
        return{
          producto: result.entities[0],
        total:parseInt(result.raw[0].total)
        }
      }

    async update(id: number, dto: Partial<FacturaDto>): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({ where: { nro_factura: id } });
      if (!factura) { throw new NotFoundException(`Factura con nro_factura ${id} no encontrada` );
      } 
      factura.fecha = dto.fecha ?? factura.fecha;
      factura.total_sin_iva = dto.total_sin_iva ?? factura.total_sin_iva;
      factura.iva = dto.iva ?? factura.iva;
      factura.total_con_iva = dto.total_con_iva ?? factura.total_con_iva;
      return this.facturaRepository.save(factura);
    }

}

import { Cliente } from "src/cliente/entities/cliente.entity";
import { Producto } from "src/producto/producto.entity/producto.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('e01_factura')
export class Factura {
@PrimaryColumn()
nro_factura:number;

@Column()
fecha:Date;
@Column()
total_sin_iva:number;
@Column()
iva:number;
@Column()
total_con_iva:number;
@Column()
nro_cliente:number;

@ManyToOne(() => Cliente,cliente => cliente.facturas)
@JoinColumn({name:'nro_cliente'})
cliente:Cliente;

@ManyToMany(()=> Producto,producto => producto.facturas)
@JoinTable({
    name:'E01_DETALLE_FACTURA',
    joinColumn:{ name: 'nro_factura', referencedColumnName:'nro_factura'},
    inverseJoinColumn:{name:'codigo_producto',referencedColumnName:'idProducto'}
})
productos:Producto[]

}

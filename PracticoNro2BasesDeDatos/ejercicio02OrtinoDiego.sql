-- Ejercicio realizado por Diego Ortino, Trabajo entregable numero 2

USE Ayacucho;

-- Ejercicio 1: Selecciona todos los registros de una tabla.
SELECT * FROM e01_cliente;

-- Ejercicio 2: Selecciona todos los productos de una determinada marca (definida por el usuario)
SELECT * FROM e01_producto WHERE marca = 'Nec Inc.';

-- Ejercicio 3: Selecciona todos los productos en orden alfabético ascendente por nombre.
SELECT * FROM e01_producto ORDER BY nombre ASC;

-- Ejercicio 4: Agrega un nuevo producto a la tabla.
INSERT INTO e01_producto (marca, nombre, descripcion, precio, stock) VALUES ('Sony', 'Play Station 5', 'concola de videojuegos', 100.50, 10);

-- Actualiza el precio del producto con ID 5 a 49.99.
UPDATE e01_producto SET precio = 49.99 WHERE codigo_producto = 5;

-- Ejercicio 6: Elimina el producto con ID 3.
-- Esta accion me tiraba error pq el producto con codigo_producto 3 estaba referenciado en la tabla e01_detalle_factura, voy a borrar ese registro para luego eliminar el de e01_producto
DELETE FROM e01_detalle_factura WHERE codigo_producto = 3;
DELETE FROM e01_producto WHERE codigo_producto = 3;

-- Ejercicio 7: Selecciona todos los productos cuyo precio esté entre $10 y $50.
SELECT * FROM e01_producto WHERE precio BETWEEN 10 AND 50;

-- Ejercicio 8: Selecciona todos los productos cuyo precio sea mayor que el precio promedio de todos los productos.
SELECT * FROM e01_producto 
WHERE precio > (SELECT AVG(precio) FROM e01_producto);

-- Ejercicio 9:  Actualiza el precio de todos los productos en la marca "Nulla Dignissim Institute" para que sea $5 más caro.
UPDATE e01_producto 
SET precio = precio + 5 
WHERE marca = 'Nulla Dignissim Institute';

-- Ejercicio 10: Selecciona todos los telefonos cuyo codigo de area no sea 844  y su numero sea mayor que 4369984 o su tipo sea F.
SELECT * FROM e01_telefono 
WHERE codigo_area <> 844 
AND (nro_telefono > 4369984 OR tipo = 'F');

-- Ejercicio 11: Selecciona los 10 productos más caros.
SELECT * FROM e01_producto 
ORDER BY precio DESC 
LIMIT 10;

-- Ejercicio 12: Selecciona las facturas cuya fecha contiene el año "2016".
SELECT * FROM e01_factura 
WHERE YEAR(fecha) = 2016;

-- Ejercicio 13: Agrega un nuevo producto a la tabla con el nombre "Nuevo Producto" y un precio de $29.99.
-- Esta accion tambien me tiraba error porque la tabla e01_producto tiene mas parametros ademas del nombre y el precio, consultando con chatgpt una posible solucion puede ser la de modificar la tabla para permitir nulls
ALTER TABLE e01_producto 
MODIFY COLUMN marca VARCHAR(45) DEFAULT NULL,
MODIFY COLUMN nombre VARCHAR(45) DEFAULT NULL,
MODIFY COLUMN descripcion VARCHAR(45) DEFAULT NULL,
MODIFY COLUMN precio FLOAT DEFAULT 0,
MODIFY COLUMN stock INT(11) DEFAULT 0;
INSERT INTO e01_producto (nombre, precio) VALUES ('Nuevo Producto', 29.99);

-- Ejercicio 14: ncrementa el precio de todos los productos en un 5%, pero solo si su precio actual es inferior a $50 o su nombre no contiene "descuento".
UPDATE e01_producto 
SET precio = precio * 1.05 
WHERE precio < 50 
   OR nombre NOT LIKE '%descuento%';

-- Ejercicio 15: Selecciona los teléfono que no sean del tipo F y cuyo número no sea mayor  a 4892549
SELECT * FROM e01_telefono 
WHERE tipo <> 'F' 
AND nro_telefono <= 4892549;
use "tiendaDB"

db.productos.insertMany([
  { nombre: "Laptop HP Pavilion", marca: "HP", precio: 1500, stock: 20, categoria: "Portátiles" },
  { nombre: "Mouse M720 Triathlon", marca: "Logitech", precio: 25, stock: 200, categoria: "Periféricos" },
  { nombre: "Teclado BlackWidow", marca: "Razer", precio: 100, stock: 50, categoria: "Periféricos" },
  { nombre: "Monitor UltraSharp U2720Q", marca: "Dell", precio: 450, stock: 35, categoria: "Monitores" },
  { nombre: "SSD 970 EVO Plus 1TB", marca: "Samsung", precio: 120, stock: 80, categoria: "Almacenamiento" },
  { nombre: "MacBook Air M1", marca: "Apple", precio: 999, stock: 15, categoria: "Portátiles" },
  { nombre: "Webcam C920", marca: "Logitech", precio: 70, stock: 60, categoria: "Accesorios" },
  { nombre: "Router Archer C7", marca: "TP-Link", precio: 90, stock: 40, categoria: "Redes" },
  { nombre: "Tarjeta gráfica RTX 3080", marca: "NVIDIA", precio: 700, stock: 10, categoria: "Componentes" },
  { nombre: "Disco duro externo 2TB", marca: "WD", precio: 80, stock: 120, categoria: "Almacenamiento" },
  { nombre: "Impresora LaserJet Pro", marca: "HP", precio: 200, stock: 25, categoria: "Impresión" },
  { nombre: "Tablet Galaxy Tab S7", marca: "Samsung", precio: 550, stock: 30, categoria: "Tablets" },
  { nombre: "Auriculares WH-1000XM4", marca: "Sony", precio: 350, stock: 45, categoria: "Audio" },
  { nombre: "Procesador Ryzen 9 5900X", marca: "AMD", precio: 450, stock: 18, categoria: "Componentes" },
  { nombre: "Altavoz inteligente Echo Dot", marca: "Amazon", precio: 50, stock: 150, categoria: "Audio" },
  { nombre: "Cable HDMI 2.1", marca: "Belkin", precio: 30, stock: 200, categoria: "Accesorios" },
  { nombre: "Fuente de alimentación 750W", marca: "Corsair", precio: 110, stock: 22, categoria: "Componentes" },
  { nombre: "Memoria RAM 16GB DDR4", marca: "Kingston", precio: 75, stock: 90, categoria: "Componentes" },
  { nombre: "Silla ergonómica para oficina", marca: "Ergohuman", precio: 300, stock: 12, categoria: "Mobiliario" },
  { nombre: "Laptop ThinkPad X1 Carbon", marca: "Lenovo", precio: 1400, stock: 18, categoria: "Portátiles" }
]);

// 1. Consultas Básicas

// Obtener todos los productos ordenados por precio de mayor a menor.
db.productos.find().sort({ precio: -1 });

// Buscar productos que tengan un stock entre 50 y 150 unidades.
db.productos.find({ stock: { $gte: 50, $lte: 150 } });

// Mostrar solo el nombre y la marca de los productos cuyo precio sea mayor a 100.
db.productos.find({ precio: { $gt: 100 } }, { nombre: 1, marca: 1, _id: 0 });

// Encontrar productos de la marca "HP" o "Logitech".
db.productos.find({ marca: { $in: ["HP", "Logitech"] } });

// 2. Filtros Avanzados
// Buscar productos cuyo nombre contenga la palabra "Laptop".
db.productos.find({ nombre: { $regex: /Laptop/i } });

// Obtener productos que no tengan stock menor a 100.
db.productos.find({ stock: { $not: { $lt: 100 } } });

// Mostrar productos que tengan marca "Razer" y precio mayor a $50.
db.productos.find({ marca: "Razer", precio: { $gt: 50 } });

// Buscar productos cuyo precio no sea ni $25 ni $100.
db.productos.find({ precio: { $nin: [25, 100] } });

// Encontrar productos con un tipo de dato "int" en el campo "precio".
db.productos.find({ precio: { $type: "int" } });

// 3. Modificaciones y Actualizaciones

// Aumentar el precio de los productos en un 10%.
db.productos.updateMany({}, { $mul: { precio: 1.1 } });

// Disminuir el stock en 5 unidades de todos los productos.
db.productos.updateMany({}, { $inc: { stock: -5 } });

// Agregar un campo "enOferta: true" a los productos que cuesten más de 100.
db.productos.updateMany({ precio: { $gt: 100 } }, { $set: { enOferta: true } });

// Eliminar el campo "marca" de todos los productos.
db.productos.updateMany({}, { $unset: { marca: "" } });

// Duplicar el stock de los productos cuyo nombre empiece con "T".
db.productos.updateMany( { nombre: /^T/ }, [ { $set: { stock: { $multiply: ["$stock", 2] } } } ]);

// 4. Eliminaciones

// Eliminar productos que cuesten más de $1000.
db.productos.deleteMany({ precio: { $gt: 1000 } });

// Borrar productos que tengan stock igual a 0.
db.productos.deleteMany({ stock: 0 });

// Eliminar todos los productos excepto los de la marca "Razer".
db.productos.deleteMany({ marca: { $ne: "Razer" } });
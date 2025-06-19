const clientPromise = require('@/lib/mongodb');

async function obtenerMovimientos() {
  const client = await clientPromise; 
  const db = client.db();
  const collection = db.collection('movimientos');
  const movimientos = await collection.find().sort({ fecha: -1 }).toArray();
  return movimientos;
}

async function crearMovimiento(nuevo) {
  if (!nuevo.descripcion || !nuevo.monto || !nuevo.tipo || !nuevo.fecha) {
    throw new Error('Faltan campos obligatorios');
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('movimientos');
  await collection.insertOne(nuevo);
  return nuevo;
}

async function eliminarMovimientoPorId(id) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('movimientos');

  const result = await collection.deleteOne({ id: Number(id) }); 
  return result.deletedCount > 0;
}


async function actualizarMovimientoPorId(id, datos) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('movimientos');

  console.log('🛠 Buscando documento con id:', id);

  const result = await collection.findOneAndUpdate(
    { id:Number(id) },
    { $set: datos },
    { returnDocument: 'after' }
  );
  if (!result.value) {
    console.log('❌ No se encontró el documento para actualizar');
  } else {
    console.log('✅ Documento actualizado:', result.value);
  }

  return result.value;

  
}

module.exports = {
  obtenerMovimientos,
  crearMovimiento,
  eliminarMovimientoPorId,
  actualizarMovimientoPorId,
};

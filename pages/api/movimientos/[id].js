const {
  actualizarMovimientoPorId,
  eliminarMovimientoPorId,
} = require('@/controllers/movimientosController');

async function handler(req, res) {
  try {
    const id = req.query.id;
    const idNum = Number(id);
    console.log(typeof id, id, '➡️', idNum);

    if (req.method === 'PUT') {
      const datos = req.body;
      const actualizado = await actualizarMovimientoPorId(idNum, datos);

      return res.status(200).json(actualizado);
    }

    if (req.method === 'DELETE') {
      const eliminado = await eliminarMovimientoPorId(idNum);
      if (!eliminado) {
        return res.status(404).json({ error: 'No se encontró para eliminar' });
      }

      return res.status(200).json({ mensaje: 'Movimiento eliminado' });
    }

    res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('❌ Error en [id] handler:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export default handler;
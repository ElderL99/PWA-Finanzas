import {
  obtenerMovimientos,
  crearMovimiento,
} from '@/controllers/movimientosController';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const movimientos = await obtenerMovimientos();
      return res.status(200).json(movimientos);
    }

    if (req.method === 'POST') {
      const nuevo = req.body;
      const guardado = await crearMovimiento(nuevo);
      return res.status(201).json(guardado);
    }

    res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('❌ Error en handler:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

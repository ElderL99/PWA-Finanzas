import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function useMovimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 🔁 Función que carga todos los movimientos desde MongoDB
  const cargarMovimientos = async () => {
    try {
      const res = await fetch('/api/movimientos');
      if (!res.ok) throw new Error('Error al cargar movimientos');
      const data = await res.json();
      setMovimientos(data);
      
    
    } catch (err) {
      toast.error('❌ Error al cargar movimientos');
      console.error(err);
    } finally {
      setCargando(false);
      
    }
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

  // ✅ AGREGAR nuevo movimiento
  const agregarMovimiento = async (nuevo) => {
    try {
      const preparado = {
        ...nuevo,
        monto: Number(nuevo.monto),
        id: Date.now(), 
      };

      const res = await fetch('/api/movimientos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preparado),
      });

      if (!res.ok) throw new Error();

      toast.success('✅ Movimiento agregado');
      await cargarMovimientos();
    } catch (err) {
      toast.error('❌ Error al guardar');
      console.error(err);
    }
  };

  // 🗑️ ELIMINAR movimiento
  const eliminarMovimiento = async (id) => {
    try {
      const res = await fetch(`/api/movimientos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error();

      toast.success('🗑️ Eliminado correctamente');
      await cargarMovimientos();
    } catch (err) {
      toast.error('❌ Error al eliminar');
      console.error(err);
    }
  };

 const editarMovimiento = async (actualizado) => {
    
  try {
    toast.info('🔄 Actualizando movimiento...');

    const res = await fetch(`/api/movimientos/${actualizado.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...actualizado,
        monto: Number(actualizado.monto),
      }),
    });
   
   
    toast.success('✏️ Movimiento actualizado');
    await cargarMovimientos(); 
    } catch (err) {
    toast.error('❌ Error al actualizar');
    console.error("Error al editar movimiento:", err);
    }

    
};



  const ingresos = movimientos.filter((m) => m.tipo === 'ingreso');
  const gastos = movimientos.filter((m) => m.tipo === 'gasto');

  return {
    movimientos,
    ingresos,
    gastos,
    agregarMovimiento,
    eliminarMovimiento,
    editarMovimiento,
    cargando,
  };
}

import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'finanzas:movimientos';

export default function useMovimientos() {
  const [movimientos, setMovimientos] = useState([]);

  // Cargar desde localStorage al inicio
  useEffect(() => {
  const datosFake = [
    {
      id: 1,
      descripcion: 'Sueldo Abril',
      monto: 1000,
      tipo: 'ingreso',
      fecha: '2025-04-01',
    },
    {
      id: 2,
      descripcion: 'Super Mayo',
      monto: 200,
      tipo: 'gasto',
      fecha: '2025-05-05',
    },
    {
      id: 3,
      descripcion: 'Freelance Junio',
      monto: 500,
      tipo: 'ingreso',
      fecha: '2025-06-15',
    },
  ];

  setMovimientos(datosFake);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(datosFake));
}, []);



  // Guardar en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movimientos));
  }, [movimientos]);

  // Agregar un nuevo movimiento
  const agregarMovimiento = (nuevo) => {
    setMovimientos((prev) => [nuevo, ...prev]);
  };
  // Eliminar un movimiento por ID
  const eliminarMovimiento = (id) => {
  setMovimientos((prev) => prev.filter((mov) => mov.id !== id));
};


// Separar ingresos y gastos
  const ingresos = movimientos.filter((m) => m.tipo === 'ingreso');
  const gastos = movimientos.filter((m) => m.tipo === 'gasto');

  return {
    movimientos,
    ingresos,
    gastos,
    agregarMovimiento,
    eliminarMovimiento,
  };
}

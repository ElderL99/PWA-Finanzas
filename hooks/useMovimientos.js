import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'finanzas:movimientos';

export default function useMovimientos() {
  const [movimientos, setMovimientos] = useState([]);

  // Cargar desde localStorage al inicio
  useEffect(() => {
    const dataGuardada = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (dataGuardada) {
      setMovimientos(JSON.parse(dataGuardada));
    }
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

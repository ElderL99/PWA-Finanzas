import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'finanzas:movimientos';

export default function useMovimientos() {
    const [movimientos, setMovimientos] = useState([]);

    // Cargar desde localStorage al inicio
    useEffect(() => {
        const datosFake = [
            {
                id: 1,
                descripcion: 'Super Mayo',
                monto: 200,
                tipo: 'gasto',
                categoria: 'comida',
                fecha: '2025-05-05',
            },
            {
                id: 2,
                descripcion: 'Alquiler Julio',
                monto: 300,
                tipo: 'gasto',
                categoria: 'hogar',
                fecha: '2025-07-20',
            },
            {
                id: 3,
                descripcion: 'Comida Septiembre',
                monto: 150,
                tipo: 'gasto',
                categoria: 'comida',
                fecha: '2025-09-25',
            },
            {
                id: 4,
                descripcion: 'Transporte Noviembre',
                monto: 100,
                tipo: 'gasto',
                categoria: 'transporte',
                fecha: '2025-11-15',
            },
            {
                id: 5,
                descripcion: 'Ropa Enero',
                monto: 250,
                tipo: 'gasto',
                categoria: 'entretenimiento',
                fecha: '2026-01-05',
            },
            {
                id: 6,
                descripcion: 'Servicios Marzo',
                monto: 400,
                tipo: 'gasto',
                categoria: 'hogar',
                fecha: '2026-03-10',
            },
            {
                id: 7,
                descripcion: 'Vacaciones Mayo',
                monto: 600,
                tipo: 'gasto',
                categoria: 'entretenimiento',
                fecha: '2026-05-20',
            },
            {
                id: 8,
                descripcion: 'Salario Julio',
                monto: 1500,
                tipo: 'ingreso',
                categoria: 'salario',
                fecha: '2026-07-01',
            },
            {
                id: 9,
                descripcion: 'Venta Agosto',
                monto: 300,
                tipo: 'ingreso',
                categoria: 'otro',
                fecha: '2026-08-15',
            },
            {
                id: 10,
                descripcion: 'Inversiones Octubre',
                monto: 800,
                tipo: 'ingreso',
                categoria: 'otro',
                fecha: '2026-10-30',
            },
        ];

        localStorage.setItem('finanzas:movimientos', JSON.stringify(datosFake));
        setMovimientos(datosFake);
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

    // Editar un movimiento existente
    const editarMovimiento = (movimientoActualizado) => {
        setMovimientos((prev) =>
            prev.map((mov) =>
                mov.id === movimientoActualizado.id ? movimientoActualizado : mov
            )
        );
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
        editarMovimiento,
    };
}

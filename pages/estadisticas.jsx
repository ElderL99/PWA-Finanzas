import Head from 'next/head';
import React from 'react';
import Navbar from '@/components/Navbar';
import useMovimientos from '@/hooks/useMovimientos';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Pie, PieChart, Cell
} from 'recharts';



export default function Estadisticas() {
    const { ingresos, gastos } = useMovimientos();

    const coloresPorCategoria = {
        comida: '#ef4444',           // rojo
        transporte: '#f97316',       // naranja
        salario: '#22c55e',          // verde
        hogar: '#3b82f6',            // azul
        entretenimiento: '#eab308',  // amarillo
        otro: '#a855f7',             // violeta
    };






    // Agrupa por mes
    const agruparPorMes = (movimientos) => {
        const agrupados = {};

        movimientos.forEach((mov) => {
            const mes = new Date(mov.fecha).toLocaleDateString('es-ES', {
                month: 'short',
                year: 'numeric',
            });

            if (!agrupados[mes]) agrupados[mes] = { mes, ingresos: 0, gastos: 0 };

            if (mov.tipo === 'ingreso') agrupados[mes].ingresos += mov.monto;
            else agrupados[mes].gastos += mov.monto;
        });

        return Object.values(agrupados).sort((a, b) =>
            new Date(`1 ${a.mes}`) - new Date(`1 ${b.mes}`)
        );
    };

    const datos = agruparPorMes([...ingresos, ...gastos]);


    const calcularGastosPorCategoria = (gastos) => {
        const agrupados = {};

        gastos.forEach((gasto) => {
            const cat = gasto.categoria || 'otro';
            if (!agrupados[cat]) agrupados[cat] = 0;
            agrupados[cat] += gasto.monto;
        });

        // Convertir a array para Recharts
        return Object.entries(agrupados).map(([categoria, valor]) => ({
            categoria,
            valor,
        }));
    };

    return (
        <>
            <Head>
                <title>Estadísticas</title>
            </Head>

            <main className="min-h-screen bg-gray-950 text-white p-4 pb-24">
                <h1 className="text-xl font-bold mb-6 text-gray-200">Estadísticas mensuales</h1>
                <h2 className="text-lg font-semibold text-gray-300 mt-10 mb-4">
                    Gastos por categoría
                </h2>

                {gastos.length > 0 ? (
                    <div className="w-full overflow-x-auto">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={calcularGastosPorCategoria(gastos)}
                                    dataKey="valor"
                                    nameKey="categoria"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ categoria, valor }) => `${categoria}: $${valor}`}
                                >
                                    {calcularGastosPorCategoria(gastos).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={coloresPorCategoria[entry.categoria] || '#8884d8'}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                ) : (
                    <p className="text-gray-400">No hay gastos para mostrar por categoría.</p>
                )}


            </main>

            <Navbar />
        </>
    );
}

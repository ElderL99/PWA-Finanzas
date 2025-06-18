import Head from 'next/head';
import Navbar from '@/components/Navbar';
import useMovimientos from '@/hooks/useMovimientos';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export default function Estadisticas() {
    const { ingresos, gastos } = useMovimientos();


    const calcularSaldoMensual = (movimientos) => {
        const agrupados = {};

        movimientos.forEach((mov) => {
            const mes = new Date(mov.fecha).toLocaleDateString('es-ES', {
                month: 'short',
                year: 'numeric',
            });

            if (!agrupados[mes]) agrupados[mes] = { mes, saldo: 0 };

            agrupados[mes].saldo += mov.tipo === 'ingreso' ? mov.monto : -mov.monto;
        });

        const ordenado = Object.values(agrupados).sort(
            (a, b) => new Date(`1 ${a.mes}`) - new Date(`1 ${b.mes}`)
        );

        // Calcular saldo acumulado
        let acumulado = 0;
        return ordenado.map((mes) => {
            acumulado += mes.saldo;
            return {
                ...mes,
                saldoAcumulado: acumulado,
            };
        });
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

    return (
        <>
            <Head>
                <title>Estadísticas</title>
            </Head>

            <main className="min-h-screen bg-gray-950 text-white p-4 pb-24">
                <h1 className="text-xl font-bold mb-6 text-gray-200">Estadísticas mensuales</h1>
                <h2 className="text-lg font-semibold text-gray-300 mt-10 mb-4">
                    Saldo acumulado por mes
                </h2>

                {(ingresos.length > 0 || gastos.length > 0) ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={calcularSaldoMensual([...ingresos, ...gastos])}>
                            <XAxis dataKey="mes" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="saldoAcumulado" fill="#3b82f6" name="Saldo acumulado" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-400">
                        No hay movimientos suficientes para mostrar estadísticas.
                    </p>
                )}

            </main>

            <Navbar />
        </>
    );
}

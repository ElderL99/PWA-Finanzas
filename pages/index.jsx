import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import CardResumen from '../components/CardResumen';
import useMovimientos from '@/hooks/useMovimientos';
import Formulario from '@/components/Formulario';
import MovimientoItem from '@/components/MovimientoItem';

export default function Home() {
  const {
    ingresos,
    gastos,
    movimientos,
    agregarMovimiento,
    eliminarMovimiento,
    editarMovimiento, // ✅ nuevo
  } = useMovimientos();

  const movimientosOrdenados = [...movimientos].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <>
      <Head>
        <title>Finanzas App</title>
      </Head>

      <main className="min-h-screen bg-gray-950 text-white p-4 pb-24">
        <h1 className="text-xl font-bold mb-4 text-gray-200">Resumen</h1>

        <Formulario onAgregar={agregarMovimiento} />
        <CardResumen ingresos={ingresos} gastos={gastos} />

        <h2 className="text-lg font-semibold text-gray-300 mb-2 mt-6">
          Movimientos recientes
        </h2>

        {movimientosOrdenados.length > 0 ? (
          movimientosOrdenados.map((mov) => (
            <MovimientoItem
              key={mov.id}
              id={mov.id}
              descripcion={mov.descripcion}
              monto={mov.monto}
              fecha={mov.fecha}
              tipo={mov.tipo}
              categoria={mov.categoria}
              onDelete={() => eliminarMovimiento(mov.id)}
              onEditar={editarMovimiento} // ✅ pasa la función
            />
          ))
        ) : (
          <p className="text-gray-400">Todavía no hay movimientos.</p>
        )}
      </main>

      <Navbar />
    </>
  );
}

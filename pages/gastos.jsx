import Head from 'next/head';
import Navbar from '../components/Navbar';
import MovimientoItem from '@/components/MovimientoItem';
import useMovimientos from '@/hooks/useMovimientos';

export default function Gastos() {
  const {
    gastos,
    eliminarMovimiento,
    editarMovimiento
  } = useMovimientos();

  const gastosOrdenados = [...gastos].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <>
      <Head>
        <title>Gastos</title>
      </Head>

      <main className="min-h-screen bg-gray-950 text-white p-4 pb-24">
        <h1 className="text-xl font-bold text-white mb-4">Gastos</h1>

        {gastosOrdenados.length > 0 ? (
          gastosOrdenados.map((mov) => (
            <MovimientoItem
              key={mov.id}
              {...mov}
              onDelete={() => eliminarMovimiento(mov.id)}
              onEditar={editarMovimiento}
            />
          ))
        ) : (
          <p className="text-gray-400">No hay gastos registrados.</p>
        )}
      </main>

      <Navbar />
    </>
  );
}

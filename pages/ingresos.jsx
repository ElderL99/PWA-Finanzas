import Head from 'next/head';
import Navbar from '../components/Navbar';
import MovimientoItem from '@/components/MovimientoItem';
import useMovimientos from '@/hooks/useMovimientos';

export default function Ingresos() {
  const { ingresos } = useMovimientos();

  const ingresosOrdenados = [...ingresos].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <>
      <Head>
        <title>Ingresos</title>
      </Head>

      <main className="min-h-screen bg-gray-950 text-white p-4 pb-24">
        <h1 className="text-xl font-bold text-white mb-4">Ingresos</h1>

        {ingresosOrdenados.length > 0 ? (
          ingresosOrdenados.map((mov) => (
            <MovimientoItem
              key={mov.id}
              descripcion={mov.descripcion}
              monto={mov.monto}
              fecha={mov.fecha}
              tipo={mov.tipo}
            />
          ))
        ) : (
          <p className="text-gray-400">No hay ingresos registrados.</p>
        )}
      </main>

      <Navbar />
    </>
  );
}

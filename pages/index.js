import Head from 'next/head';
import Navbar from '../components/Navbar';
import CardResumen from '../components/CardResumen';
import MovimientoItem from '../components/MovimientoItem'; // si ya lo tienes

export default function Home() {
  const ingresos = [
    { id: 1, descripcion: 'Sueldo', monto: 5000, fecha: '2025-06-01' },
    { id: 2, descripcion: 'Venta freelance', monto: 1200, fecha: '2025-06-12' },
  ];

  const gastos = [
    { id: 1, descripcion: 'Renta', monto: 1500, fecha: '2025-06-03' },
    { id: 2, descripcion: 'Super', monto: 700, fecha: '2025-06-10' },
  ];

  // Combinamos todo en un solo array y ordenamos por fecha
  const movimientos = [...ingresos, ...gastos].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <>
      <Head>
        <title>Finanzas App</title>
      </Head>

      <main className="min-h-screen bg-gray-950 text-white p-4 pb-24">
        <h1 className="text-xl font-bold mb-4 text-gray-200">Resumen</h1>

        <CardResumen ingresos={ingresos} gastos={gastos} />

        <h2 className="text-lg font-semibold text-gray-300 mb-2 mt-6">
          Movimientos recientes
        </h2>

        {movimientos.length > 0 ? (
          movimientos.map((mov) => (
            <div
              key={mov.id + mov.descripcion}
              className="flex justify-between bg-gray-800 rounded-xl px-4 py-3 mb-2"
            >
              <div>
                <p className="font-medium">{mov.descripcion}</p>
                <p className="text-xs text-gray-500">{mov.fecha}</p>
              </div>
              <p
                className={`text-base font-semibold ${
                  mov.monto > 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {mov.monto > 0 ? '+' : '-'}${Math.abs(mov.monto).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Todavía no hay movimientos.</p>
        )}
      </main>

      <Navbar />
    </>
  );
}

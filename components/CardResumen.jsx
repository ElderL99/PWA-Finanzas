import React from 'react';
export default function CardResumen({ ingresos, gastos }) {
  const totalIngresos = ingresos.reduce((acc, mov) => acc + mov.monto, 0);
  const totalGastos = gastos.reduce((acc, mov) => acc + mov.monto, 0);
  const saldo = totalIngresos - totalGastos;

  return (
    <div className="bg-gray-800 rounded-2xl p-5 shadow-md text-white">
      <div className="mb-4">
        <p className="text-sm text-gray-400 uppercase tracking-widest">Saldo actual</p>
        <p className="text-4xl font-bold text-white mt-1">${saldo.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-sm">
        <div className="bg-gray-900 rounded-xl py-3">
          <p className="text-gray-400">Ingresos</p>
          <p className="text-green-400 font-semibold text-lg">${totalIngresos.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 rounded-xl py-3">
          <p className="text-gray-400">Gastos</p>
          <p className="text-red-400 font-semibold text-lg">${totalGastos.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

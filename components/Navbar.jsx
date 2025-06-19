import Link from 'next/link';
import React from 'react';
import { MdHome, MdTrendingUp, MdTrendingDown, MdBarChart } from 'react-icons/md';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] border-t border-neutral-800 p-2 flex justify-around text-white text-sm z-50">
      <Link href="/" className="flex flex-col items-center">
        <MdHome className="text-xl" />
        <span>Resumen</span>
      </Link>
      <Link href="/ingresos" className="flex flex-col items-center">
        <MdTrendingUp className="text-xl" />
        <span>Ingresos</span>
      </Link>
      <Link href="/gastos" className="flex flex-col items-center">
        <MdTrendingDown className="text-xl" />
        <span>Gastos</span>
      </Link>
      <Link href="/estadisticas" className="flex flex-col items-center">
        <MdBarChart className="text-xl" />
        <span>Estadísticas</span>
      </Link>
    </nav>
  );
}

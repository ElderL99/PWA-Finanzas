export default function MovimientoItem({ descripcion, monto, fecha, tipo, onDelete }) {
  const esIngreso = tipo === 'ingreso';
  const color = esIngreso ? 'text-green-400' : 'text-red-400';
  const signo = esIngreso ? '+' : '-';

  return (
    <div className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3 mb-2">
      <div>
        <p className="font-medium text-white">{descripcion}</p>
        <p className="text-xs text-gray-500">{fecha}</p>
      </div>
      <div className="flex items-center gap-3">
        <p className={`text-base font-semibold ${color}`}>
          {signo}${Math.abs(monto).toFixed(2)}
        </p>
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-500 transition"
          title="Eliminar"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

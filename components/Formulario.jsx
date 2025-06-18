import { useState } from 'react';

export default function Formulario({ onAgregar }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('ingreso');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descripcion || !monto) return;

    const nuevoMovimiento = {
      id: Date.now(),
      descripcion,
      monto: parseFloat(monto),
      tipo,
      fecha: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    onAgregar(nuevoMovimiento);
    setDescripcion('');
    setMonto('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl text-white mb-6">
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white"
          placeholder="Ej. Supermercado"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Monto</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white"
          placeholder="Ej. 150.00"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white"
        >
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Agregar
      </button>
    </form>
  );
}

import { useState } from 'react';
import React from 'react';
export default function MovimientoItem({
  id,
  descripcion,
  monto,
  fecha,
  tipo,
  categoria,
  onDelete,
  onEditar,
}) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    descripcion,
    monto,
    tipo,
    categoria,
  });

  const esIngreso = tipo === 'ingreso';
  const color = esIngreso ? 'text-green-400' : 'text-red-400';
  const signo = esIngreso ? '+' : '-';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.descripcion || !form.monto || isNaN(form.monto)) {
      return alert('Completa todos los campos correctamente');
    }

    onEditar({
      id,
      ...form,
      monto: parseFloat(form.monto),
      fecha,
    });

    setEditando(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl px-4 py-3 mb-2 text-white">
      {editando ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="w-full p-2 rounded bg-gray-900 text-white"
            placeholder="Descripción"
          />
          <input
            type="number"
            value={form.monto}
            onChange={(e) => setForm({ ...form, monto: e.target.value })}
            className="w-full p-2 rounded bg-gray-900 text-white"
            placeholder="Monto"
          />
          <div className="flex gap-2">
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className="w-full p-2 rounded bg-gray-900 text-white"
            >
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
            </select>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full p-2 rounded bg-gray-900 text-white"
            >
              <option value="comida">Comida</option>
              <option value="transporte">Transporte</option>
              <option value="salario">Salario</option>
              <option value="hogar">Hogar</option>
              <option value="entretenimiento">Entretenimiento</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-green-600 py-1 rounded">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditando(false)}
              className="flex-1 bg-gray-600 py-1 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{descripcion}</p>
            <p className="text-xs text-gray-500">
              {fecha} – {categoria || 'otro'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className={`text-base font-semibold ${color}`}>
              {signo}${Math.abs(monto).toFixed(2)}
            </p>
            <button
              onClick={() => setEditando(true)}
              className="text-gray-500 hover:text-blue-400 transition"
              title="Editar"
            >
              ✏️
            </button>
            <button
              onClick={onDelete}
              className="text-gray-500 hover:text-red-500 transition"
              title="Eliminar"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

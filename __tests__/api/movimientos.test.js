const handler = require('../../test-helpers/handlerMovimientos.js');
const { createMocks } = require('node-mocks-http');

// GET
describe('API: GET /api/movimientos', () => {
  it('debe retornar una lista de movimientos (array)', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const data = JSON.parse(res._getData());
    expect(Array.isArray(data)).toBe(true);
  });
});

// POST
describe('API: POST /api/movimientos', () => {
  it('debe guardar un nuevo movimiento y responder con 201', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        descripcion: 'Test ingreso',
        monto: 123.45,
        tipo: 'ingreso',
        fecha: new Date().toISOString(),
        id: Date.now(),
      },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);

    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('descripcion', 'Test ingreso');
    expect(data).toHaveProperty('monto', 123.45);
    expect(data).toHaveProperty('tipo', 'ingreso');
    expect(data).toHaveProperty('fecha');
    expect(data).toHaveProperty('id');
  });
});

// PUT
describe('API: PUT /api/movimientos/[id]', () => {
  it('debe editar un movimiento y responder con 200', async () => {
    const nuevo = {
      descripcion: 'Editar test',
      monto: 10,
      tipo: 'ingreso',
      fecha: new Date().toISOString(),
      id: Date.now(),
    };

  
    const { req: reqPost, res: resPost } = createMocks({
      method: 'POST',
      body: nuevo,
    });
    await handler(reqPost, resPost);

    
    const editado = { ...nuevo, descripcion: 'Editado ✔️' };
    const { req, res } = createMocks({
      method: 'PUT',
      query: { id: nuevo.id.toString() }, 
      body: editado,
    });

    const handlerId = require('../../pages/api/movimientos/[id]');
    await handlerId(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});


// DELETE
describe('API: DELETE /api/movimientos/[id]', () => {
  it('debe eliminar un movimiento y responder con 200', async () => {
    const nuevo = {
      descripcion: 'Eliminar test',
      monto: 20,
      tipo: 'gasto',
      fecha: new Date().toISOString(),
      id: Date.now(),
    };

    await handler(createMocks({ method: 'POST', body: nuevo }).req, createMocks().res);

    const { req, res } = createMocks({
      method: 'DELETE',
      query: { id: nuevo.id },
    });

    await require('../../pages/api/movimientos/[id]')(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});

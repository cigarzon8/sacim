const request = require('supertest');
const app = require('../app'); // importa tu app express

describe('🧪 Pruebas de inserción de usuarios', () => {
  // Simula una sesión activa (puedes ajustar según tu middleware auth)
  const fakeSession = {
    user: {
      id_usuario: 1,
      proyecto: 1,
      rol: 'admin'
    }
  };

  it('✅ Debería crear un nuevo usuario con datos válidos', async () => {
    const response = await request(app)
      .post('/user/add')
      .send({
        nombres: 'Juan',
        apellidos: 'Pérez',
        correo: 'juan.perez@example.com',
        tipo_documento: 1,
        documento: '123456789',
        password: 'clave123'
      })
      .set('Cookie', [`session=${JSON.stringify(fakeSession)}`])
      .expect(200);

    expect(response.text).toContain('Usuario Creador correctamente');
  });

  it('🚫 Debería mostrar error si falta un campo requerido', async () => {
    const response = await request(app)
      .post('/user/add')
      .send({
        nombres: '',
        apellidos: 'Pérez',
        correo: 'sin.nombre@example.com',
        tipo_documento: 1,
        documento: '987654321',
        password: 'clave123'
      })
      .set('Cookie', [`session=${JSON.stringify(fakeSession)}`])
      .expect(200);

    expect(response.text).toContain('Diligencie todos los campos');
  });

  it('🚫 Debería mostrar error si el correo ya existe', async () => {
    const response = await request(app)
      .post('/user/add')
      .send({
        nombres: 'Juan',
        apellidos: 'Duplicado',
        correo: 'juan.perez@example.com', // ya existe
        tipo_documento: 1,
        documento: '222222222',
        password: 'clave123'
      })
      .set('Cookie', [`session=${JSON.stringify(fakeSession)}`])
      .expect(200);

    expect(response.text).toContain('Correo o documento duplicado');
  });
});

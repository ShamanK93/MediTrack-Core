const authController = require('../../src/controllers/authController');

describe("Auth - Tests unitaires", () => {

  test("Register échoue si missing username", async () => {
    const req = {
      body: { username: "", password: "test123" }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Champs manquants"
    });
  });

  test("Login échoue si mauvais mot de passe", async () => {
    const req = {
      body: { username: "test", password: "wrong" }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalled();
  });
});

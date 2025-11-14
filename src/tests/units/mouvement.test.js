const mouvementController = require('../../src/controllers/mouvementController');

describe("Mouvements - Tests unitaires", () => {

  test("Créer un mouvement - données invalides", async () => {
    const req = {
      body: { type: "UNKNOWN", quantite: 0 }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await mouvementController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("Liste des mouvements - format correct", async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    await mouvementController.list(req, res);

    expect(res.json).toHaveBeenCalled();
  });

});

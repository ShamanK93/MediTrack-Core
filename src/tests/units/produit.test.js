const produitController = require('../../src/controllers/produitController');

describe("Produit - Tests unitaires", () => {

  test("Création de produit - données invalides", async () => {
    const req = {
      body: { nom: "", code: null, quantite: -1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await produitController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Champs manquants ou invalides"
    });
  });

  test("Liste des produits - format correct", async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    await produitController.list(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});

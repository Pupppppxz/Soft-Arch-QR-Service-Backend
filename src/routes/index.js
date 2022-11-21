const Router = require("express").Router();
const qrController = require("../controllers/qrController");

Router.post("/qr", (req, res) => qrController.GenerateQR(req, res));
Router.delete("/qr", (req, res) => qrController.RemoveQR(req, res));

module.exports = Router;
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const router = require("./src/routes")
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(`/${process.env.QR_PATH}`, express.static(path.join(__dirname, 'public/qr')));

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server Running On Port ${process.env.PORT}`);
});
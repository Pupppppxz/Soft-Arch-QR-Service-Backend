const fs = require("fs");
const HttpException = require("../exception/httpException");
const qrService = require("../services/qrServices")

const GenerateQR = async (req, res) => {
    try {
        const { payload } = req.body;
        if (!payload) {
            throw new HttpException("Invalid payload", 401);
        }
        const fileName = await qrService.QR(payload);
        console.log(payload)
        return res.status(200).send({ 
            message: "Success",
            data: fileName,
        })
    } catch (err) {
        return res.status(err.statusCode ? err.statusCode : 500).json({ message: err.message });
    }
};

const RemoveQR = async (req, res) => {
    try {
        const { qrName } = req.body;
        if (!qrName) {
            throw new HttpException("Invalid Qr Name", 401);
        }
        const fileUrl = [__dirname, "/../../public/qr/", qrName].join("");
        fs.unlink(fileUrl, (err) => {
            if (err && err.code === "ENOENT") {
                return res.status(200).json({ message: "File not found" });
            } else if (err) {
                return res.status(200).json({ message: "Cannot remove file" });
            } else {
                return res.status(200).json({ message: "Removed!" });
            }
        })
    } catch (err) {
        return res.status(err.statusCode ? err.statusCode : 500).json({ message: err.message });
    }
}

module.exports = {
    GenerateQR,
    RemoveQR,
};
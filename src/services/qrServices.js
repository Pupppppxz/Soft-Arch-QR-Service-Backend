const qrcode = require("qrcode");
const path = require("path");
const HttpException = require("../exception/httpException");

const GenerateFileName = (length) => {
    const date = new Date();
    var result           = [date.getFullYear(), date.getMonth(), date.getDay() + 7].join("");
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const QR = async (payload) => {
    const fileName = `${GenerateFileName(20)}.jpg`;
    const err = await qrcode.toFile(
        `./public/qr/${fileName}`,
        payload,
        {
            color: {
                dark: '#FFFFFF',
                light: '#000000'
            },
            width: 600,
            scale: 8,
        }
    )
    if (err) {
        console.log(err)
        throw new HttpException("Error while generate QR", 500);
    } else {
        return `${process.env.QR_PATH}/${fileName}`;
    }
}

module.exports = {
    QR,
}
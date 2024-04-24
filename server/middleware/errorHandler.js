const { constants } = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrack: err.stack });
            break;
        case constants.NOT_FOUNT:
            res.json({ title: "Not Found", message: err.message, stackTrack: err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "FORBIDDEN", message: err.message, stackTrack: err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Un authorized", message: err.message, stackTrack: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Sdrver Error", message: err.message, stackTrack: err.stack });
            break;
        default:
            console.log("No Eror, All Good !");
            break;
    }


}
module.exports = errorHandler
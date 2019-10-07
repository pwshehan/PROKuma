const consts = require('../utils/constants');

module.exports = (req, res, next) => {
    let validate = false;
    let clientApiKey = req.query.apiKey
    if(!clientApiKey){
        validate = false;
    } else {
        if (clientApiKey == consts.api_key[0]) {
            req.hashValidation = true;
        }
        for (let i = 0; i < consts.api_key.length; i++) {
            if (clientApiKey == consts.api_key[i]) {
                validate = true;
            }
        }        
    }
    if (validate) {
        next();
    } else {
        throw res.status(400).send({
            error:{message:"Missing valid Api Key"}
        }); 
    }
};
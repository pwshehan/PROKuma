require('dotenv').config();

exports.api_key_mobile = process.env.API_KEY_MOB;
exports.api_key_web = process.env.API_KEY_WEB;

exports.jwt_key = process.env.APP_SECRET + '**JWT';

require('dotenv').config();

exports.jwt_key = process.env.APP_SECRET + '**JWT';

exports.api_key = process.env.API_KEY.split(" ");
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async function(){
  let db_url = 'mongodb://localhost/PROKuma';
  
  if (process.env.mongodb_user.length > 0) {
    //mongodb://admin:password@localhost:27017/db
    db_url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;
  } else {
  //mongodb://localhost:27017/db
    db_url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;
  }
  
  await mongoose.connect(db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
  );

};

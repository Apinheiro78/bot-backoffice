const {Pool} = require('pg')
const {db} = require ('./config')


const pool = new Pool ({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database,
    //ssl: true,
   // sslmode: 'verify-null'
   ssl: {
    rejectUnauthorized: false,
    ca: process.env.CACERT,
  }
})

module.exports = pool;

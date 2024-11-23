const mysql = require('mysql2/promise');


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'Test'
}

let connection;

const connectDB= async ()=>{

    if (!connection){
        try{
            connection = await mysql.createPool(dbConfig);
            console.log('Connected to database successfully')
        }catch (err){
            console.error(err);
        }
            return connection;
    }
    else {
        return connection
    }



}
module.exports = {connectDB, getConnection: () => connection};

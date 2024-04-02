import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()



const pool = mysql.createPool({
    host    :process.env.SQL_HOST,
    user    :process.env.SQL_USER,
    password:process.env.SQL_PASSWORD,
}).promise()

/*
export async function testFN(){
    const [result] =await pool.query("select *")
    return result
}
const resultatTestFN = await testFN()
*/
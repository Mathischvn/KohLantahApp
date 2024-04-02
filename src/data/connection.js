import postgres from 'postgres'
import dotenv from 'dotenv';
dotenv.config()

const pool = postgres('postgres://username:password@host:port/database',{     
    host    :process.env.SQL_HOST,
    username    :process.env.SQL_USER,
    password:process.env.SQL_PASSWORD, 
}).promise()

/*
export async function testFN(){
    const [result] =await pool.query("select *")
    return result
}
const resultatTestFN = await testFN()
*/
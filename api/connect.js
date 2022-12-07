import mysql from "mysql"

export const  db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'f3R1$tH3D3^',
    database: 'social'
})
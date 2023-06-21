const mysql2=require('mysql2/promise')
class Connection{
    static connect=mysql2.createPool({
        port:3307,
        host:"localhost",
        user:"root",
        database:'ecom'
    })
}
module.exports=Connection
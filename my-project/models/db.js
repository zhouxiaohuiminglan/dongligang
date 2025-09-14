const mysql = require('mysql2');
const {db} = require('../config')
const pool = mysql.createPool(db)
exports.qurey = function(sql,params=[]){
    return new Promise((resolve,reject)=>{
        pool.getConnection((error,connection)=>{
            if(error)throw error
            connection.query(sql,params,(error, results, fields)=>{
                console.log(`${sql}==>${params}==信息=>${results}`)
                connection.release();
                if(error){
                    console.log('sql查询出错')
                    return reject(error)
                }
                resolve(results)
            })
        })

    })
}
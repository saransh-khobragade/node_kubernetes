const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const push = async (element) => {
    try{
        const result = await check_table()

        if (result.rows[0].exists) {
            return await insert(element)
        } else {
            create_table()
        }
    }catch(err){
        return err
    }
}
const pop = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM stack order by id desc limit 1', (err, results) => {
            try{
                if (err) {
                    reject(err)
                } else {
                    pool.query(`delete from stack where id =${results.rows[0].id};`, (err, results2) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(results.rows[0].element)
                        }
                    })
                }
            }catch(err){
                reject(Error("No element left"))
            }
        })
    })
}

const create_table = async () => {
    return new Promise((resolve, reject) => {
        pool.query(`CREATE TABLE stack(ID SERIAL PRIMARY KEY,element VARCHAR(30));`, (err, result) => {
            if (err) {
                reject(true)
            } else {
                resolve(result)
            }
        })
    })
}
const check_table = async () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT EXISTS (SELECT * FROM pg_tables where schemaname='public' and tablename='stack');", async (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
const insert = async (element) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO stack(element) values(${element});`, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
module.exports = { push, pop, insert }

const express = require('express')
const bodyParser = require('body-parser')

const mongoDb = require('./mongo')
const postgres = require('./postgres')

const app = express()
app.use(bodyParser());
const port = process.env.PORT || 3000

async function start_server() {
    const db = await mongoDb.initMongo()

    app.get('/', async (req, res) => {
        res.status(200).send({ message: "hello server running" })
    })

    app.post(
        '/push', async (req, res) => {
            try {
                const db_name = req.body.db_name
                const element = req.body.element
                if (db_name && element) {
                    if (db_name === "mongo") {
                        const insert_result = await mongoDb.push(db, { element })
                        res.status(200).send({ "inserted_row_count": insert_result.insertedCount })
                    } else if (db_name === "postgres") {
                        const insert_result = await postgres.push(element)
                        res.status(200).send({ "inserted_row_count": insert_result.rowCount })
                    }
                    else {
                        throw Error("Invalid database")
                    }
                } else {
                    throw Error("Invalid input in body")
                }
            } catch (err) {
                res.status(400).send({ "err": err.message })
            }
        }
    )
    app.delete(
        '/pop', async (req, res) => {
            try{
                const db_name = req.body.db_name
                if (db_name) {
                    if (db_name === "mongo") {
                        const pop_result = await mongoDb.pop(db)
                        if(pop_result.value && pop_result.value.element){
                            res.status(200).send({ "poped_element": pop_result.value.element })
                        }else{
                            throw Error("No element left")
                        }
                    } else if (db_name === "postgres") {
                        const pop_element = await postgres.pop()
                        res.status(200).send({ "poped_element": pop_element })
                    } else {
                        throw Error("Invalid database")
                    }
                } else {
                    throw Error("Invalid input in body")
                }
            }catch(err){
                res.status(400).send({ "err": err.message })
            }
        }
    )

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
    })
}

start_server()

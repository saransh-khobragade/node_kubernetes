const express = require('express')
const bodyParser = require('body-parser')

const mongoDb = require('./mongo')

const app = express()
app.use(bodyParser());
const port = process.env.PORT || 3000


async function start_server() {
  const db = await mongoDb.initMongo()

  app.get('/', async (req, res) => {
    res.status(200).send({message:"hello server running"})
  })

  app.post(
    '/push',async (req, res) => {
        try{
            const db_name = req.body.db_name
            const element = req.body.element
            if(db_name && element){
                if(db_name==="mongo"){
                    const insert_result = await mongoDb.push(db,{element})
                    res.status(200).send({"insertedId":insert_result.insertedId})
                }else{
                    throw Error("Invalid db")
                }
            }else{
                res.status(400).send({"err":"Invalid input in body"})
            }
        }catch(err){
            res.status(400).send({"err":err.message})
        }
    }
  )
  app.delete(
    '/pop',async (req, res) => {
        const db_name = req.body.db_name
            if(db_name){
                if(db_name==="mongo"){
                    const pop_result = await mongoDb.pop(db)
                    res.status(200).send({"pop_element":pop_result.value})
                }else{
                    throw Error("Invalid db")
                }
            }else{
                res.status(400).send({"err":"Invalid input in body"})
            }
    }
  )

  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
  })
}

start_server()

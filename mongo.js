const MongoClient = require('mongodb').MongoClient
const marked = require('marked')

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/dev'

async function initMongo() {
  console.log('Initialising MongoDB...')
  let success = false
  while (!success) {
    try {
      client = await MongoClient.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      success = true
    } catch {
      console.log('Error connecting to MongoDB, retrying in 1 second')
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  console.log('MongoDB initialised')
  return client.db(client.s.options.dbName).collection('stack')
}


async function push(db, element) {
  return await db.insertOne(element)
}

async function pop(db) {
  return await db.findOneAndDelete({},{ "sort": { "_id": -1 } })
}

module.exports = {initMongo,push,pop}
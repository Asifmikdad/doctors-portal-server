const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { response } = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.verqdfd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('doctors_portal').collection('services');
    const bookingCollection = client.db('doctors_portal').collection('booking');






    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    
/** 
api naming convention
app.get('\booking') // get all bookings in this collection or get more then one or by filter
app.get('/booking') // get a specific booking
app.post('/booking') // add a new booking
app.patch('/booking/:id') // 


*/



app.post('/booking', async(req, res) => {
  const booking = req.body;
  const query = {treatment: booking.treatment, date: booking.date, patient: booking.patient}
  const result = await bookingCollection.insertOne(booking);
  res.send(result);


})

  }
  finally {

  }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from doctor uncle')
})

app.listen(port, () => {
  console.log(`Doctors app listening on port ${port}`)
})
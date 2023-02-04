require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ycofkd3.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const run = async () => {
  try {

    const serviceCollect = client.db('glassDoor').collection('services');


    // app.get('/',async(req,res)=>{
    //     const query = {}
    //     const cursor = serviceCollect.find(query)
    //     const services = await cursor.toArray()
    //     res.send(services)
    // })

    app.get('/services',async (req,res) =>{
        const query = {}
        const cursor = serviceCollect.find();
        const service = await cursor.toArray()
        res.send(service)
        // res.send({ status: true, data: service });
    })
    // app.get('/service/:id',async(req,res)=>{
    //     const id=req.params.id;
    //     const query = ({_id: ObjectId(id)});
    //     const services = await serviceCollect.findOne(query);
    //     res.send(services)
        
    //  })
   

    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await serviceCollect.insertOne(service);
      res.send(result);
    });

    app.delete("/service/:id", async (req, res) => {
      const id = req.params.id;

      const result = await serviceCollect.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello GlassDoor");
});

app.listen(port, () => {
  console.log(`GLassDoor on port ${port}`);
});
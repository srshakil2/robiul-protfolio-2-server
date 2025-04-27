const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3500;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mp1yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // work
    const responseCalection = client
      .db("robiul-protfolio2-data")
      .collection("data");
    // Todu: post data and get Data
    app.post("/compannyData", async (req, res) => {
      const userData = req.body;
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      const data = {
        name: userData.name,
        email: userData?.email,
        massage: userData?.massage,
        date: formattedDate,
      };

      const result = await responseCalection.insertOne(data);
      res.send(result);
    });
    // work
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//
app.get("/", (req, res) => {
  res.send("job-task-server is running for now");
});
app.listen(port, () => {
  console.log(`job-task is at: ${port}`);
});

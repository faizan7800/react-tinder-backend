import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards';
import Cors from 'cors'
// APP Config
const app = express()
const port = process.env.PORT || 8001
const connection_url =
  "mongodb+srv://faizan-admin:LoveArfan1234@cluster0.s7bouqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 
// Middlewares
app.use(express.json())
app.use(Cors())
// DB Config
mongoose.connect(connection_url, {useNewUrlParser: true},{useUnifiedTopology: true},).then(() => console.log('MongoDB connection established.')).catch((error) => console.error("MongoDB connection failed:", error.message))
// API End Points
app.get('/', (req, res)=> res.status(200).send("Hello World!!!"))
app.post('/tinder/cards', (req, res)=>{
    const dbCard = req.body;
    Cards.create(dbCard, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})
app.get('/tinder/cards', (req, res)=>{
  // res.status(200).send("hey this is me")
  try {
    Cards.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
     catch (error) {
    console.log(error)
  }
})
// Listener

app.listen(port, ()=> console.log(`listening on localhost: ${port}`))
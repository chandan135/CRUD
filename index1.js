// const express = require('express');

// const app=express();

// app.get('/', (req, res)=>{
//     res.send({"message":"hello world!"});
// })

// app.listen(3000,()=>{
//     console.log('listening on port 3000');
// })

const express = require("express");

const app = express();

app.use(express.json());

app.get("/chandan/:id", (req, res) => {
  console.log(req.params);
  res.send({ message: "hello world" });
});

app.get("/anupam", (req, res) => {
  res.send({ message: "hello Anupam" });
});
app.get("/Home", (req, res) => {
  //console.log(req.params);
  console.log(req.query);
  res.send({ Address: "Baruipur" });
});

app.get("/About", (req, res) => {
  console.log(req.headers);
  res.send({ message: "hello world" });
});

app.post("/add", (req, res) => {
  let z = req.body.x + Number(req.body.y);
  console.log(req.body);
  res.send({ message: "Sum:", Answer: z });
});

app.listen(3000, () => {
  console.log("Listening port 3000");
});

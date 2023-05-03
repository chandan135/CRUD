const express = require("express");

const app = express();
app.use(express.json());

let arr = [];
let ipAddress = "";

app.get("/", (req, res) => {
  res.send({ msg: "Hello World" });
});

app.get(["/display/:index", "/display"], (req, res) => {
  console.log(req.headers);
  ipAddress += req.headers.host;
  console.log(ipAddress);
  //console.log("params");
  console.log(req.params, " ");

  if (req.params.index !== undefined) {
    res.send({ data: arr[Number(req.params.index)] });
  } else {
    res.send({ data: arr });
  }
});

app.post("/insert", (req, res) => {
  console.log(req.headers);
  ipAddress += req.headers.host;
  console.log(ipAddress);
  arr.push(req.body);
  res.send({ message: "Data inserted successfully" });
});

// app.get("/display:index", (req, res) => {
//   let index = Number(req.params.index);
//   res.send({ data: arr[index] });
// });

app.delete("/delete/:index", (req, res) => {
  console.log(req.headers);
  ipAddress += req.headers.host;
  console.log(ipAddress);
  console.log("params");
  console.log(req.params);

  let index = Number(req.params.index);
  arr.splice(index, 1);

  res.send({ data: arr });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

//H/W
//Display:index-->//check params
//Update:app.patch-->update at desired index
//Delete the desired index

//console.log("params");
//console.log(req.params);

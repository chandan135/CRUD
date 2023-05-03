const express = require("express");
const { networkInterfaces } = require("os");
const requestIP = require("request-ip");

const app = express();
app.use(express.json());

let arr = [];
let status = [];

app.get("/", (req, res) => {
  res.send({ msg: "Hello World" });
});

app.get(["/display/:index", "/display"], (req, res) => {
  //console.log("params");
  console.log(req.params, " ");

  if (req.params.index !== undefined) {
    res.send({ data: arr[Number(req.params.index)] });
  } else {
    res.send({ data: arr });
  }
});

app.post("/insert", (req, res) => {
  // console.log(req.headers);
  // ipAddress += req.headers.host;
  // console.log(ipAddress);
  arr.push(req.body);
  res.send({ message: "Data inserted successfully" });
});

// app.get("/display:index", (req, res) => {
//   let index = Number(req.params.index);
//   res.send({ data: arr[index] });
// });

app.delete("/delete/:index", (req, res) => {
  // console.log(req.headers);
  // ipAddress += req.headers.host;
  // console.log(ipAddress);
  console.log("params");
  console.log(req.params);

  let index = Number(req.params.index);
  arr.splice(index, 1);

  res.send({ data: arr });
});

app.get("/status", async (req, res) => {
  // console.log(req.headers);
  status.push(req.headers.host);
  const ip = requestIP.getClientIp(req);
  // res.send({ ipAddress: status[0] });
  //const ipAddress = await function getIp();
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  console.log(results);
  //console.log(ipAddress);

  res.send({
    "server-ipAddress": results,
    "client-ipaddress": ip,
  });
});
// const { networkInterfaces } = require('os');

// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//         // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//         const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//         if (net.family === familyV4Value && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }
//             results[name].push(net.address);
//         }
//     }
// }

// app.get('/ip',(req,res)=>{

// })
const getIp = () => {};

app.listen(3000, () => {
  console.log("listening on port 3000");
});

//H/W
//Display:index-->//check params
//Update:app.patch-->update at desired index
//Delete the desired index

//console.log("params");
//console.log(req.params);

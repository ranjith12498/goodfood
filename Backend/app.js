var mysql = require("mysql");
var express = require("express");
const cors = require("cors");

var app = express();
var PORT = 3000;

//middleware
app.use(express.json());

app.use(cors({ origin: "http://localhost:4200" }));

//connection to db
var db = mysql.createConnection({
  host: "localhost",
  user: "testUser",
  password: "password",
  database: "goodfood",
});

db.connect((err) => {
  if (err) {
    console.log("Db connection error: " + err);
  } else console.log("db connected");
});

//create database goodfood-excute just once
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE goodfood";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
    res.json("DB created");
  });
});

//create table orders- execute just once
app.get("/creaordertetable", (req, res) => {
  let sql =
    "CREATE TABLE orders(id int AUTO_INCREMENT,name VARCHAR(255) address TEXT, menu TEXT, price FLOAT, distance FLOAT, status VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    res.json("Table created");
  });
});

//Insert Order Details to Orders Table
app.post("/createorder", (req, res) => {
  let values = {
    name: req.body.name,
    address: req.body.address,
    menu: req.body.menu,
    price: req.body.price,
    status: req.body.status,
    distance: req.body.distance,
  };
  let sql = "INSERT INTO orders SET ?";
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("Order Details added");
    res.send("Order Details added");
  });
});

//getting all order details from the orders table
app.get("/getallorders", (req, res) => {
  let sql = "SELECT * FROM orders";
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("All Order Details");
    res.send(result);
  });
});

//getting order details for specific id
app.get("/getorder/:id", (req, res) => {
  let sql = `SELECT * FROM orders WHERE id=${req.params.id}`;
  let query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`Order Details for ${req.params.id}`);
    res.send(result);
  });
});

//updating order details for single id
app.patch("/update", (req, res) => {
  console.log(req.body);
  let values = {
    name: req.body.name,
    address: req.body.address,
    menu: req.body.menu,
    price: req.body.price,
    status: req.body.status,
    distance: req.body.distance,
  };
  let sql = `UPDATE orders SET ? WHERE id = ${req.body.id}`;
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log(`Order Details for ${req.body.id}`);
    res.send(result);
  });
});

//deleting the row
app.delete("/delete/:id", (req, res) => {
  let sql = `DELETE FROM orders WHERE id = ${req.params.id}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`Records Deleted ${req.params.id}`);
    res.send(result);
  });
});

//create table menu- execute just once
app.get("/createmenutable", (req, res) => {
  let sql =
    "CREATE TABLE menu(id int AUTO_INCREMENT, MenuDetails VARCHAR(255), Price FLOAT, PRIMARY KEY(id));";
  db.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("Menu Table created");
    res.json("Menu Table created");
  });
});

//creating menu
app.get("/createmenu", (req, res) => {
  //console.log("Menu");
  let values = [
    ["Combo 1", 100],
    ["Combo 2", 200],
    ["Combo 3", 300],
  ];
  let sql = "INSERT INTO menu (MenuDetails, Price) VALUES ?";
  db.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Menu Details added");
    res.send("Menu Details added");
  });
});

//getting all menun details from the menu table
app.get("/getallmenu", (req, res) => {
  let sql = "SELECT * FROM menu";
  db.query(sql, function (err, result) {
    if (err) throw err;
    //console.log("All Menu Details");
    res.send(result);
  });
});

app.get("/getprice/:m", (req, res) => {
  let sql = `SELECT * FROM menu WHERE MenuDetails=${req.params.m}`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    //console.log(`Price for ${req.params.id}`);
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log("server is listening in port " + `${PORT}`);
});

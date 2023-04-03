const express = require("express");
const mysql = require("mysql");

const flash = require("express-flash");
const session = require("express-session");
const { Session } = require("inspector");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dcembakasi",
  });
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
  });
  //push data to a db
  app.post("/submit", function (req, res) {
    var titheNumber = req.body.titheNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var contact = req.body.contact;
    var sql = `INSERT INTO people (tithe_no, first_name, last_name, contact) VALUES ("${titheNumber}", "${firstName}", "${lastName}", "${contact}")`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Record Inserted");
      req.flash("success", "Data added successfully!");
      res.redirect("/people");
    });
  });
  
  connection.query('select * from people',(err,res,fields)=>{
      return console.log(fields)
  })
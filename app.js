const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const session = require("express-session");
const { Session } = require("inspector");

//express app
const app = express();
//register view engine
app.set("view engine", "ejs");
app.set("views", "views");
//middleware and static files.Files made  public to the browser are stored here including css.
app.use(express.static("public"));
app.use(flash());
app.use(session({resave:true, saveUninitialized:true, secret:"niaje", cookie:{secure:false, maxAge:180000000},}));
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, () => {
  process.on("uncaughtException", function (err) {
    // Handle the error safely
    // console.log("This is the error:");
    console.log(err);
  });
});

//Database connection
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

app.get('/login',(re,res)=>{
  res.render("login");
});

//Authenticate a user
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    connection.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/');
      } else {
        console.log("Incorrect username or password");
        res.render('login.ejs', { message: 'Incorrect username or password.' });
        
      }
      res.end();
    });
  } else {
    console.log("Enter both username and password");
    res.render('login.ejs', { message: 'Please enter both username and password.' });
    res.end();
  }
});

// app.get('/home', (req, res) => {
//   if (req.session.loggedin) {
//     res.render('home.ejs', { username: req.session.username });
//   } else {
//     res.redirect('/');
//   }
// });

// app.get("/", (req, res) => {
  
//   res.render("index");
// });
app.get('/', (req, res) => {
  const query = 'SELECT * FROM tithes';
  connection.query(query, (err, results) => {
    console.log(results);
    if (err) throw err;
    res.render('index.ejs', { tithes: results });
    });
  });

 
  
app.get("/trend", (req, res) => {
  // res.sendFile(__dirname + '/public/loader.ejs');
  res.render('/public/loader.ejs');
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



app.get('/people', (req, res) => {
  const query = 'SELECT * FROM people';
  connection.query(query, (err, results) => {
    console.log(results);
    if (err) throw err;
    res.render('people.ejs', { people: results });
    });
  });

  // Update the row with the specified ID
// const updateRow = (id, newData) => {
//   const sql = `UPDATE people SET tithe_no=?, first_name = ?, last_name = ? ,contact = ? WHERE tithe_no = ?`;

//   connection.query(sql, [newData.tithe_no, newData.first_name, newData.last_name, newData.contact], (err, result) => {
//     if (err) {
//       console.error('Error updating row: ', err);
//     } else {
//       console.log('Row updated successfully!');
//     }
//   });
// };

// Handle button click event to update the row with ID '123' with new data
// const button = document.getElementById('updateButton');
// button.addEventListener('click', () => {
//   const id = '123';
//   const newData = { tithe_no: 'John Doe', first_name: 30, last_name: '123 Main St',contact:232332 };

//   updateRow(id, newData);
// });


//404 page if ther's no match with the other requests then this runs
app.use((req, res) => {
  res.status(404).render("404");
});

//listen for requests


const mysql = require("mysql");

function showHide() {
  let x = document.getElementById("userForm");

  if (x.style.display == "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  loader.style.display = "none";
});


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dcembakasi",
});
connnection.deleteRecord(function(err) {
  alert('Today is sunday');
  if (err) throw err;
  var sql = "DELETE FROM admins WHERE username = 'r'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});
//Delete row from list
// function deleteRecord() {
  
//   alert('Today is Sunday');
   
//   const sql = 'DELETE FROM tithes WHERE tithe_no = 1';
//   var deleteIcon = document.getElementById('deleteTithe');
//   // Handle the icon click event and execute the SQL query
//   deleteIcon.addEventListener('click', async () => {
//     try {
//       const [rowsAffected] = await connection.execute(sql, [itemId]);
//       console.log(`Deleted ${rowsAffected} row(s)`);
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }

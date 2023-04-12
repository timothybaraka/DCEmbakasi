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

//Delete row from list
var itemId = 1;
const sql = 'DELETE FROM tithes WHERE tithe_no = 1';
var deleteIcon = document.getElementById('deleteTithe');
// Handle the icon click event and execute the SQL query
deleteIcon.addEventListener('click', async () => {
  try {
    const [rowsAffected] = await connection.execute(sql, [itemId]);
    console.log(`Deleted ${rowsAffected} row(s)`);
  } catch (error) {
    console.error(error);
  }
});

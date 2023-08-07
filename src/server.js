require("dotenv").config();

const app = require("./app");
const { db } = require("./database/config");

db.authenticate()
  .then(() => {
    console.log("Conection Exited 😂");
  })
  .catch(() => {
    console.log("Conection Failed 😡");
  });

db.sync()
  .then(() => {
    console.log("Conection Exited 😂");
  })
  .catch(() => {
    console.log("Conection Failed 😡");
  });

app.listen(process.env.PORT, () => {
  console.log(`running port: ${process.env.PORT} 😁`);
});

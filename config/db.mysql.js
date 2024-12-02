// db.mysql.js
import { Sequelize } from "sequelize";
const { DB_Name, DB_Password } = process.env;

const sequelize = new Sequelize("codeA", DB_Name, DB_Password, {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successfully.");
  } catch (error) {
    console.error("Dont run Database: ", error);
  }
})();

export default sequelize;

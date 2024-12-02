import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.mysql.js";
import dotenv from "dotenv";

dotenv.config();

class Test extends Model {

}

Test.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  },
  {
    sequelize,
    modelName: "Test",
    tableName: "Test",
    timestamps: false,
  }
);

export default Test;

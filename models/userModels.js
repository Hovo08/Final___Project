import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.mysql.js";
import md5 from "md5";
import dotenv from "dotenv";

dotenv.config();

class User extends Model {
  static hashPassword(password) {
    return md5(md5(password) + process.env.Password_Secret);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: false,
      get() {
        return undefined
      },
      set(value) {
        if(value){
        this.setDataValue("password", User.hashPassword(value));
        }
      },
    },
    verify_code: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

export default User;

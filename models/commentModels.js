import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.mysql.js";
import User from "./userModels.js";

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lesson_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt", // Corrected here as well
  }
);

// Associations
User.hasMany(Comment);
Comment.belongsTo(User);

export default Comment;

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.mysql.js";
import User from "./userModels.js";

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lesson_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
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
    modelName: "rating",
    tableName: "ratings",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

// Связи
User.hasOne(Rating); // Один пользователь может иметь много оценок (Rating)
Rating.belongsTo(User); // Оценка принадлежит пользователю

export default Rating;

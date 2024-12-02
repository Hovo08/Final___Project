import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
// app.use(userAuthorization)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
// Create HTTP server instance
// const server = app.listen(process.env.PORT || 8080, () => {
//   console.log(
//     `Server is running on http://localhost:${process.env.PORT || 8080}`
//   );
// });


export default app;
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fs = require('fs');
const productRouter = require('./routes/product')
dotenv.config();

const databaseStr = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.qatrhwq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();
const port = process.env.PORT || 3000;

const logFilePath = "./http.log";
const accessLogStream = fs.createWriteStream(logFilePath, {
  flags: "a",
});

mongoose
.connect(databaseStr)
  .then(() => {
    console.log("Connection to the database is successful");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });


app.use(express.json());
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(process.env.API_URL, productRouter);


const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const shutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    accessLogStream.end(() => {
      fs.truncate(logFilePath, 0, (err) => {
        if (err) {
          console.error("Failed to clear the log file:", err);
        } else {
          console.log("Log file cleared");
        }
        process.exit(0);
      });
    });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

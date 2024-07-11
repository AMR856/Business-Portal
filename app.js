const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fs = require("fs");
const mongoose = require("mongoose");
dotenv.config();

const databaseStr = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.qatrhwq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();
const port = process.env.PORT || 3000;

mongoose
.connect(databaseStr)
  .then(() => {
    console.log("Connection to the database is successful");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required : [true, 'Name is a required field'],
    unique : true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  countInStock: {
    type: Number,
    required : [true, 'Count is a required field']
  }
});

const Product = mongoose.model('Product', productSchema);

const logFilePath = "./http.log";
const accessLogStream = fs.createWriteStream(logFilePath, {
  flags: "a",
});

app.use(express.json());
app.use(morgan("tiny", { stream: accessLogStream }));

// app.use(process.env.API_URL);

app.post(`${process.env.API_URL}/here`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock
  });

  product.save().then((createdProduct) => {
    res.status(201).json({
      status: 'Success',
      createdProduct
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'Failed',
      error: err,
    });
  });
});

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

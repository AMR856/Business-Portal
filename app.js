const express = require('express');
const dotenv = require('dotenv');
const app = express();

const port = process.env.PORT || 3000;
dotenv.config('./.env');

console.log(process.env.USER_NAME);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
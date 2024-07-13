const {expressjwt: jwt} = require("express-jwt");

const authJwt = function authJwt() {
  const secret = process.env.JWT_SECRET;
  const apiURL = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\/api\/v1\/category(.*)/, methods: ['GET', 'OPTIONS']},
      `${apiURL}/users/login`,
      `${apiURL}/users/register`
    ]
  });
}

module.exports = authJwt;

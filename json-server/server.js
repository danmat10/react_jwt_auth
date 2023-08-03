const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const express = require("express");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const userRouter = jsonServer.router("users.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json());

const SECRET_KEY = "my-secret-key";

// Login endpoint
server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    const usersData = JSON.parse(data);
    const users = usersData.users;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const accessToken = jwt.sign({ username, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign({ username, role: user.role }, SECRET_KEY);
      res.json({ accessToken, refreshToken });
    } else {
      res.sendStatus(401);
    }
  });
});

// Middleware para validar JWT
const validateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protege os endpoints de dados com o middleware JWT
server.use("/db", validateJWT, router);
server.use("/users", validateJWT, userRouter);

server.listen(3030, () => {
  console.log("JSON Server is running on port 3030");
});

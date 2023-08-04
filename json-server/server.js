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
  const { email, password } = req.body;

  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    const usersData = JSON.parse(data);
    const users = usersData.users;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const access_token = jwt.sign({ email, role: user.role }, SECRET_KEY, {
        expiresIn: "5min",
      });
      const refresh_token = jwt.sign({ email, role: user.role }, SECRET_KEY);
      res.json({ access_token, refresh_token });
    } else {
      res.sendStatus(401);
    }
  });
});

// Refresh token endpoint
server.post("/auth/refresh", (req, res) => {
  const { refresh_token } = req.body;

  if (refresh_token) {
    jwt.verify(refresh_token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const new_access_token = jwt.sign(
        { email: user.email, role: user.role },
        SECRET_KEY,
        {
          expiresIn: "15min",
        }
      );
      res.json({ access_token: new_access_token });
    });
  } else {
    res.sendStatus(401);
  }
});

// Middleware para validar JWT
const validateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1]; // Dividindo a string pelo espaço para pegar apenas o token

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

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cookieParser());

const corsOptions = {
  origin: "*",
  credentials: true,
  // optionSuccessStatus: 200,
  // exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRouters = require("./routes/login");
const signUpRouters = require("./routes/signUp");
const DashboardRoute = require("./routes/dashboard");
const resetRoute = require("./routes/reset");

// app.use(
//   session({
//     secret: "my secret session",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(loginRouters);
app.use(signUpRouters);
app.use(DashboardRoute);
app.use(resetRoute);

app.use((err, req, res, next) => {
  res.status(500).render("500", {});
});

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://snypi:HpDdrTix3V36z86q@covid.lrhgqlw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });

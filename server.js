const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");

//dotenv config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "Server Running",
//   });
// });
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorsRoutes"));

// port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
  console.log(
    `Server running on port ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});

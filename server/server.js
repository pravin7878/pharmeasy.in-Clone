require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");

// config files
const swaggerSpecs = require('./src/config/swagger-output.json'); 
const connectToDB = require("./src/config/db");

// middelwares
const {
  errorHandler,
  notFoundHandler,
} = require("./src/middelware/errorHendaler");


// routes
const userRouter = require("./src/routes/user")
const adminRouter = require("./src/routes/admin")
const productRouter = require("./src/routes/Product")
const bookingRouter = require("./src/routes/booking")
const cartRouter = require("./src/routes/cart")
const sellerRouter = require("./src/routes/seller")

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = [
     "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/" , (req,res)=>{
    res.send("wellcome to server")
})
app.use("/user", userRouter);
app.use("/admin" , adminRouter);
app.use("/seller" , sellerRouter);
app.use("/products" , productRouter)
app.use("/bookings", bookingRouter);
app.use("/cart", cartRouter);

// hendeling for error
app.use(errorHandler);
// hendeling for not exist endpoind request
app.use(notFoundHandler);

app.listen(port , async()=>{
console.log(`server is runing on http://localhost:${port}`);
try {
    await connectToDB()
    console.log("DB Connected Success");
} catch (error) {
    console.log("DB connection failld",error);
}
})
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const ProductRouter = require("./products/productRoute");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/products",ProductRouter)

const connectDB=async()=>{
    await mongoose
  .connect("mongodb+srv://Vraj:Vishal123@cluster0.n6fk1.mongodb.net/mock-xii?retryWrites=true&w=majority")
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));
}

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});


const port = 8080;

app.listen(port,connectDB() ,() => console.log(`Server running on port port 🔥`));
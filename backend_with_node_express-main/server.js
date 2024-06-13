const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors= require("cors");
const bookRoutes = require("./books/bookRoutes");
const userRoutes = require("./users/userRoutes");

dotenv.config();

const app = express();

const corsOption = {
  origin: "http://localhost:3000/",
  methods: "GET,POST,PUT",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOption));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/book", bookRoutes);
app.use("/user", userRoutes);

(async () =>{
    try {
        await mongoose.connect("mongodb+srv://mongo:mongo123@cluster0.fhzzwx0.mongodb.net/bookStoreDb", {});
        console.log('Connected to MongoDB');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
})();
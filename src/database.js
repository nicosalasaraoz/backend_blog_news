import mongoose from "mongoose";

// const url = "mongodb://localhost:27017/news-nico";

mongoose.connect("mongodb+srv://nicolassalasaraoz:QAEfn3uqvqRjFmzF@cluster0.mmbiecs.mongodb.net/?retryWrites=true&w=majority");

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("BD conectada");
});

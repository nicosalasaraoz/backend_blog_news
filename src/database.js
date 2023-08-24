import mongoose from "mongoose";



mongoose.connect("mongodb+srv://nicolassalasaraoz:QAEfn3uqvqRjFmzF@cluster0.mmbiecs.mongodb.net/?retryWrites=true&w=majority");

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("BD conectada");
});

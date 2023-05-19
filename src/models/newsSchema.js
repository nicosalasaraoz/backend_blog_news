import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema({
    category: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    url: {
            type: String,
            trim: true,
            require: true,
        },
    },
);

const NewsModel = mongoose.model("news", newsSchema);

export default NewsModel;

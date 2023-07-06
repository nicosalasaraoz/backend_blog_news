import NewsModel from "../models/newsSchema";
import { validationResult } from "express-validator";

export const getNews = async (req, res) => {
    try {
        const news = await NewsModel.find();
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "La lista de noticias no fue encontrada",
        });
    }
};

export const crearNews = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }
        const savingNews = new NewsModel(req.body);
        await savingNews.save();
        res.status(201).json({
            mensaje: "La noticia se creó con exito",
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            mensaje: "La noticia no se pudo guardar en la BD",
        });
    }
};

export const verNews = async (req, res) => {
    try {
        const id = req.params.id;
        const noticiaBuscada = await NewsModel.findById(id);
        res.status(200).json(noticiaBuscada);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Noticia no encontrada",
        });
    }
};

export const modificarNews = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }
        const id = req.params.id;
        await NewsModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            mensaje: "La noticia se editó con exito",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "Error al editar la noticia",
        });
    }
};

export const eliminarNews = async (req, res) => {
    try {
        const id = req.params.id;
        await NewsModel.findByIdAndDelete(id);
        res.status(200).json({
            mensaje: "La noticia fue borrada",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "La noticia no fue borrada",
        });
    }
};

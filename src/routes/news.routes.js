import { Router } from "express";
import { check } from "express-validator";
import { getNews, crearNews, verNews, modificarNews, eliminarNews } from "../controllers/news.controllers";
import validarJWT from "../helpers/validar-jwt";

const router = Router();

router
    .route("/news")
    .get(getNews)
    .post(
        [
            validarJWT,
            check("category")
                .notEmpty()
                .withMessage("La categoria es un dato obligatorio")
                .isIn(["economia", "deportes", "mundo", "espectaculos", "politica", "opinion"])
                .withMessage("Debe ingresar una categoria valida"),
            check("title")
                .notEmpty()
                .withMessage("El titulo es un dato obligatorio")
                .isString()
                .isLength({
                    min: 4,
                    max: 500,
                })
                .withMessage("El titulo debe tener entre 4 y 500 caracteres"),
            check("description")
                .notEmpty()
                .withMessage("La descripción es un dato obligatorio")
                .isString()
                .isLength({
                    min: 8,
                    max: 500,
                })
                .withMessage("La descripción debe tener entre 8 y 500 caracteres"),
            check("content")
                .notEmpty()
                .withMessage("El contenido es un dato obligatorio")
                .isString()
                .isLength({
                    min: 8,
                    max: 10000,
                })
                .withMessage("El contenido debe tener entre 8 y 10000 caracteres"),
        ],
        crearNews
    );
router
    .route("/news/:id")
    .get(verNews)
    .put(
        [
            validarJWT,
            check("category")
                .notEmpty()
                .withMessage("La categoria es un dato obligatorio")
                .isIn(["economia", "deportes", "mundo", "espectaculos", "politica", "opinion"])
                .withMessage("Debe ingresar una categoria valida"),
            check("title")
                .notEmpty()
                .withMessage("El titulo es un dato obligatorio")
                .isString()
                .isLength({
                    min: 4,
                    max: 500,
                })
                .withMessage("El titulo debe tener entre 4 y 500 caracteres"),
            check("description")
                .notEmpty()
                .withMessage("La descripción es un dato obligatorio")
                .isString()
                .isLength({
                    min: 8,
                    max: 500,
                })
                .withMessage("La descripción debe tener entre 8 y 500 caracteres"),
            check("content")
                .notEmpty()
                .withMessage("El contenido es un dato obligatorio")
                .isString()
                .isLength({
                    min: 8,
                    max: 10000,
                })
                .withMessage("El contenido debe tener entre 8 y 10000 caracteres"),
        ],
        modificarNews
    )
    .delete(validarJWT, eliminarNews);

export default router;

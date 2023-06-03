import { Router } from "express";
import { check } from "express-validator";
import { listarUsuarios, crearUsuario, buscarUsuario, modificarUsuarios, eliminarUsuarios, login } from "../controllers/user.controllers";
const router = Router();

router
    .route("/login")
    .post(
        [
            check("email", "El email es obligatorio").isEmail(),
            check("pass", "La contraseña debe contener 8 caracteres como minimo").isLength({ min: 8 }),
        ],
        login
    );

router
    .route("/user")
    .get(listarUsuarios)
    .post(
        [
            check("name")
                .notEmpty()
                .withMessage("El nombre es un dato obligatorio")
                .isString()
                .withMessage("El dato ingresado debe ser de tipo string")
                .isLength({
                    min: 2,
                    max: 40,
                })
                .withMessage("El nombre del usuario puede tener entre 2 y 40 caracteres"),
            check("email").notEmpty().withMessage("El email es un dato obligatorio").isEmail().withMessage("El email es un dato incorrecto"),
            check("pass")
                .notEmpty()
                .withMessage("La contraseña es un dato obligatorio")
                .isLength({
                    min: 8,
                    max: 20,
                })
                .withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20")
        ],
        crearUsuario
    );

router
    .route("/user/:id")
    .get(buscarUsuario)
    .put(
        [
            check("name")
                .notEmpty()
                .withMessage("El nombre es un dato obligatorio")
                .isString()
                .withMessage("El dato ingresado debe ser de tipo string")
                .isLength({
                    min: 2,
                    max: 40,
                })
                .withMessage("El nombre del usuario puede tener entre 2 y 40 caracteres"),
            check("email").notEmpty().withMessage("El email es un dato obligatorio").isEmail().withMessage("El email es un dato incorrecto"),
            check("pass")
                .notEmpty()
                .withMessage("La contraseña es un dato obligatorio")
                .isLength({
                    min: 8,
                    max: 20,
                })
                .withMessage("La contraseña debe tener como minimo 8 caracteres y maximo 20")
        ],
        modificarUsuarios
    )
    .delete(eliminarUsuarios);

export default router;

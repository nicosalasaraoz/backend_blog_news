import UserModel from "../models/userSchema";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";

export const login = async (req, res) => {
    try {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        
        const { email, pass } = req.body;
       
        let usuario = await UserModel.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                mensaje: "correo o password invalido - correo",
            });
        }
        
        const passwordValido = bcrypt.compareSync(pass, usuario.pass);
        if (!passwordValido) {
            return res.status(400).json({
                mensaje: "correo o password invalido - password",
            });
        }

        
        const token = await generarJWT(usuario._id, usuario.email);
        return res.status(200).json({
            mensaje: "El usuario existe",
            nombre: usuario.name,
            uid: usuario._id,
            token
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "usuario o contraseña invalido",
        });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }

        
        let savingUser = await UserModel.findOne({ email: req.body.email });
        if (savingUser) {
            return res.status(400).json({
                mensaje: "ya existe un usuario con el email enviado",
            });
        }
        savingUser = new UserModel(req.body);

        
        const saltos = bcrypt.genSaltSync();
        savingUser.pass = bcrypt.hashSync(req.body.pass, saltos);

       
        await savingUser.save();
        res.status(201).json({
            mensaje: "El usuario se creó con exito",
            usuario: savingUser.name,
            uid: savingUser._id,
            rol: "admin"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "El usuario no se pudo guardar en la BD",
        });
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Usuarios no encontrados",
        });
    }
};

export const buscarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioBuscado = await UserModel.findById(id);
        res.status(200).json(usuarioBuscado);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Usuario no encontrado",
        });
    }
};

export const modificarUsuarios = async (req, res) => {
   const Admin_1 = "nicolas";
    if (
        req.usuario === Admin_1
    ) {
        return res.status(400).json({
        error: true,
        message: "This user cannot be modified!",
        });
    }
    try {
        const id = req.params.id;
        console.log(req.body);
        await UserModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            mensaje: "El usuario se edito con exito",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "Error al editar el usuario",
        });
    }
};

export const eliminarUsuarios = async (req, res) => {
    const Admin_1 = "nicolas";
    const SUPER_USER = "admin";

    if (req.rol === SUPER_USER) {
        return res.status(400).json({
        error: true,
        message: "This user cannot be erased!",
        });
    }

    if(req.usuario === Admin_1){
        return res.status(400).json({
        error: true,
        message: "This user cannot be erased!",
    });
    }
    try {
        const id = req.params.id;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({
            mensaje: "El usuario fue borrado",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "El usuario no fue borrado",
        });
    }
};

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_JWT;

export const logout = async (req, res) => {
  const { token } = req.body;
  if (token) {
    const userLog = jwt.verify(token, JWT_SECRET);
    const userEmail = userLog.user.email;
    const userFound = await UserModel.findOne({ userEmail });
    if (userFound) {
      userFound.token = "";
      await UserModel.updateOne({ userEmail }, userFound);
      res.status(200).json({ message: "Deslogueado", deslog: userFound });
    } else {
      res.status(500).json({ error: "Error" });
    }
  } else {
    res.status(500).json({ error: "Error" });
  }
};
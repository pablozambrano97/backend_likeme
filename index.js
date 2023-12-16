import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// importamos las consultas

import { allPosts, addPost } from "./datebase/consultas.js";

// instanciando express 

const app = express();

//midleware

app.use(express.json());
app.use(cors());

//levantando el servidor con las variables de ambiente .env

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});

//Creación de rutas con el metodo GET y POST

app.get("/posts", async (req, res)=>{
    try {
        const posts = await allPosts();
        return res.status(200).json({ok: true, message: 'posts publicados', posts});
    } catch (error) {
        return res.json({ok: false, message: error.message});
    }
});

app.post("/posts", (req, res) => {
    const {titulo, url, descripcion} = req.body;
    console.log(req.body);
    try {
        const result = addPost( {titulo, url, descripcion});
        return res.status(201).json({ ok: true, message: "Post agregado con exito", result });
    } catch (error) {
        return res.json({ok: false, message: error.message});
    }
});

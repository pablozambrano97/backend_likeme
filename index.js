import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// importamos las consultas

import { allPosts, addPost, updatePost, deletePost } from "./datebase/consultas.js";
import { handleError } from "./datebase/handleError.js";

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
        const { status, message } = handleError(error.code);
        return res.status(status).json({ ok: false, result: message })
    }
});

app.post("/posts", async (req, res) => {
    const {titulo, url, descripcion} = req.body;

    console.log(req.body);
    try {
            const result = await addPost( {titulo, url, descripcion});
            return res.status(201).json({ ok: true, message: "Post agregado con exito", result });
    } catch (error) {
        const { status, message } = handleError(error.code);
        return res.status(status).json({ ok: false, result: message })
    }
});

app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
            const result = await updatePost (id);
            return res.status(200).json({
                                            ok:true,
                                            message: 'likes incrementado en +1',
                                            result
                                        });
    } catch (error) {
        console.log(error);
        const { status, message } = handleError(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});

app.delete("/posts/:id", async (req, res) =>{
    const {id} = req.params;
    try {
        const result = await deletePost(id);
        return res.status(200).json({
                                        ok:true,
                                        message: `post con el id ${result} ha sido eliminado con exito`,
                                        id: result
                                    })
    } catch (error) {
        const { status, message } = handleError(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});


app.use("*", (req, res) => {
    res.json({ ok: false, result: "404 Pagina no Encontrada" });
});
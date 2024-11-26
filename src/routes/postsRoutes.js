import express from "express";
import cors from "cors"
import multer from "multer";
import { listarPosts, postarNovoPosto, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";


const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})


const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOption))
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPosto);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizarNovoPost )
};

export default routes;


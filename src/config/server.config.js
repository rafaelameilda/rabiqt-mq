import cors from "cors";
import express from "express";


const configureServer = (app) => {
    app.use(cors());
    app.use(express.json());
};

export { configureServer };

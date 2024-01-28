import express from "express";
import { postRate, getRates } from "../controllers/rate.js";

const rateRouter = express.Router();

rateRouter.post("/", postRate);
rateRouter.get("/", getRates);

export default rateRouter;
import express from "express";
import rateRouter from "./routes/rate.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/rate", rateRouter);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});

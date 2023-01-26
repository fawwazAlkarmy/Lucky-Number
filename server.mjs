import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import expressErrorHandler from "express-async-errors";
import { notFoundMiddleware } from "./middleware/notFound.mjs";
import { errorHandlerMiddleware } from "./middleware/error.mjs";
import { mainRouter } from "./routes/main.mjs";

const app = express();
const port = process.env.PORT;

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

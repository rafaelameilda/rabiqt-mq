import "express-async-errors";
import "dotenv/config";
import express from "express";
import { errorHandler } from "/errors";
import { configureServer } from "/config";
import { createRoutes } from '/routes';
import { consumeMessages } from '/messages'
const app = express();
const port = 3000;

try {
  consumeMessages()
  configureServer(app);
  createRoutes(app);
  app.use(errorHandler);

  const server = app.listen(port, () => console.log("Back-end running at the port ", port));
} catch (error) {
  console.log(
    "Back-end NOT-running verify your configuration at the port ",
    port
  );
  console.log(error);
}

import "./debug-bootstrap";
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";

const serverHandler = createStartHandler({
  createRouter: getRouter,
})(defaultStreamHandler);

export default serverHandler;

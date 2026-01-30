//this is the  main server file that redirects request to other services

import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import { httpLogger, logger } from "@smr/shared/logger";
import { AppConfig } from "@/application.config.js";

dotenv.config();
const app = express();

const PORT = AppConfig.PORT;
const AUTH_SERVICE_URL = AppConfig.AUTH_SERVICE_URL;

if (!AUTH_SERVICE_URL) {
  logger.error("Error : Auth service url nnot defined!");
  process.exit(1);
}

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded());

app.use(httpLogger);

app.use(
  "/user-service",
  proxy(AUTH_SERVICE_URL, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      //this prevents content length errors caused by chunking data in req.body by axios when run from backend / server side.
      //this will prevent  the request  being rejected immedialty by the backend node servers
      if (srcReq.body) {
        const bodyData = JSON.stringify(srcReq.body);
        proxyReqOpts.headers["Content-Length"] = Buffer.byteLength(bodyData);
        delete proxyReqOpts.headers["transfer-encoding"];
      }
      return proxyReqOpts;
    },
  }),
);

app.listen(PORT, () => {
  logger.info(`API Gateway is running in port ${PORT}`);
});

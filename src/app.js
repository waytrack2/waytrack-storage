/*
 * Copyright Jorge Toro Hoyos (jolthgs@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import config from "config";
import express from "express";
import deviceRoutes from "./routes/devices.js";
import { errorHandler } from "./middleware/error.js";
import logger from "./logger.js";

const httpServer = config.get("api.httpServer");

const app = express();
app.use(express.json());

app.use('/devices', deviceRoutes);

// 4xx
app.use(async (req, res, next) => {
  //res.status(404).json({error: `route ${req.path}. Not found`})
  const err = new Error(`route ${req.path}. Not found`);
  err.status = 404;
  next(err);
})

app.use(errorHandler);

app.listen(httpServer.port, httpServer.host, () => {
    logger.info(`waytrack storage running on port ${httpServer.host}:${httpServer.port}`);
})

import express from "express";
import * as deviceRoutes from "../controller/devices.js";

const router = express.Router();

/**
 * curl http://localhost:5000/devices
 *
 */
router.get("/", deviceRoutes.getDevices);

/**
 * curl -X POST -  -d {} http://localhost:5000/devices
 */
router.post("/", deviceRoutes.createDevice);

/**
 * http://localhost:5000/devices/id/:id
 */
router.get("/id/:id", deviceRoutes.getDevice);

/**
 * http://localhost:5000/:imei
 */
//router.get(/^\?imei=\d*/, getDeviceByIMEI);
//router.get(/\/\?imei=\d*/, getDeviceByIMEI);
//router.get("/:imei([0-9]{10}*)", getDeviceByIMEI);
router.get("/imei/:imei", deviceRoutes.getDeviceByIMEI);

router.patch("/id/:id", deviceRoutes.updateDeviceById);

router.patch("/imei/:imei", deviceRoutes.updateDeviceByIMEI);

/**
 * http://localhost:5000/devices/id/:id
 */
//router.delete("/id/:id", deviceRoutes.deleteDeviceById);

export default router;


import pool from "../db.js"; 
import logger from "../logger.js";
import { fetchAllBy, updateAllBy } from "./utils.js";

export const getDevices = async (req, res, next) => {
  try {
    const devices = await pool.query("SELECT * FROM gps ORDER BY id");
    return res.send(devices.rows);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export const createDevice = async (req, res, next) => {
  const device = req.body; 
  const query = "INSERT INTO gps (name, type, active, aka) VALUES ($1, $2, $3, $4)";
  const values = [device.name, device.type, device.active, device.aka];

  try {
    const dbResponse = await pool.query(query, values);
    return res.status(200).json({ ...device, dbResponse })
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

/*
 * Return a object or null.
 */ 
export const getDevice = async (req, res, next) => {
  const id = req.params;

  try {
    const response = await fetchAllBy(id, "gps");
    res.status(200).json({ 
      response
    })
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export const getDeviceByIMEI = async (req, res, next) => {
  const imei = req.params;

  try {
    const response = await fetchAllBy(imei, "gps");
    res.status(200).json({ 
      response
    })
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export const updateDeviceByIMEI = async (req, res, next) => {
  const { imei } = req.params;
  const body = req.body;
  let response;

  try {
    response = await fetchAllBy({ imei }, "gps");
  } catch (error) {
    logger.error(error);
    next(error);
  }

  try {
    response = await updateAllBy("gps", imei, "name", response, body);
    //console.log(response);
    res.status(200).json({
      response: response.rowCount
    })
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export const updateDeviceById = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  let response;

  try {
    response = await fetchAllBy({ id }, "gps");
  } catch (error) {
    logger.error(error);
    next(error);
  }

  try {
    response = await updateAllBy("gps", id, "id", response, body);
    //console.log(response);
    res.status(200).json({
      response: response.rowCount
    })
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export const deleteDeviceById = async (req, res) => {
}

export const deleteDeviceByIMEI = async (req, res) => {
}



































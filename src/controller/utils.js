import pool from "../db.js"; 
import logger from "../logger.js";
import { EntityNotExist } from "../error.js";

export const fetchAllBy = async(params={}, table) => {
  const [key, value] = Object.entries(params).flat();
  let query = `SELECT * FROM ${table} WHERE ${key}=${value}`;

  if (key === "imei") {
    query = `SELECT * FROM ${table} WHERE name='${value}'`;
  }

  let row;
  try {
    const response = await pool.query(query);
    row = response.rows[0];
  } catch (error) {
    logger.error(error);
    throw error;
  }

  if (!row) {
    throw new EntityNotExist(`The entity ${key}=${value} does not exist in the ${table} table.`);
  }
  return row;
}

/*
 * table : specify the name of the table that you want to update.
 * id: determine which rows to update.
 * whereColumn: name of the columns to update.
 * columns: All columns in the table.
 * columnsToUpdate: 
 *
 */
export const updateAllBy = async(table, id, whereColumn, columns={}, columnsToUpdate={}) => {
  const query = [`UPDATE ${table} SET`];
  const values = [];
  const set = [];

  for (const [key, value] of Object.entries(columnsToUpdate)) {
    if (key in columns) {
      values.push(value);
      set.push(`${key}=$${values.length}`);
    }
  }

  query.push(set)
  query.push(`WHERE ${whereColumn}='${id}'`);
  const queryString = query.join(' ');

  //console.log(`${queryString} : ${values}`);
  try {
    const response = await pool.query(queryString, values);
    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
//export const updateAllBy = async(table, id, whereColumn, columns={}, columnsToUpdate={}) => {
//  let query = [`UPDATE ${table} SET`];
//  const values = [];
//
//  Object.keys(columns).forEach((key) => {
//    if (key in columnsToUpdate) {
//      values.push(`${key}='${columnsToUpdate[key]}'`);
//    }
//  });
//
//  query.push(values);
//  query.push(`WHERE ${whereColumn}='${id}'`);
//  query = query.join(' ')
//
//  return `${query}`
//}

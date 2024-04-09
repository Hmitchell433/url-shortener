import { Database, open } from "sqlite";
import { Database as DBDriver } from "sqlite3";
let _db: Database;

/**
 * gets a ready-to-use instance of a sqlite database connected to this server
 *
 * Schema is specified in `connect.ts`
 */
export async function sqliteDb() {
  if (_db) {
    return _db;
  }

  _db = await open({ filename: "./collection.sqlite", driver: DBDriver });
  return _db;
}

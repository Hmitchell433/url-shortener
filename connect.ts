import { Database, OPEN_CREATE, OPEN_READWRITE } from "sqlite3";

// set up sqlite in general
const db = new Database(
  "./collection.sqlite",
  OPEN_READWRITE | OPEN_CREATE,
  (e) => {
    if (e) {
      console.error(e);
    } else {
      console.log("Setting up SQlite Database...");
    }
  }
);

db.serialize(() => {
  // set up a table with a basic schema to track our URLs
  // feel free to make changes to this
  db.run(
    `CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY,
            original TEXT,
            shortened TEXT
        )`,
    (e) => {
      if (e) {
        return console.error(e);
      } else {
        console.info("-> Created `urls` table");
      }
    }
  );

  // seed the database with an example url pair
  // this can be removed if you'd prefer
  const urlPair = [
    "http://amuchlongerurl.com/than/woud/be/pleasant/to/?type=in",
    "http://localhost:3000/short",
  ];
  db.run(`INSERT INTO urls(original, shortened) VALUES(?, ?)`, urlPair, (e) => {
    if (e) {
      return console.error(e);
    } else {
      console.info("--> Created url pair");
    }
  });
});

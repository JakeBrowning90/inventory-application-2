const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS album_credits (
    album_id INT REFERENCES albums(id),
    artist_id INT REFERENCES artists(id)
);

INSERT INTO album_credits (album_id, artist_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 1),
  (6, 2),
  (7, 5),
  (7, 6);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

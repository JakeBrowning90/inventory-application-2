const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS artists (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(60),
  activeyear INTEGER,
  notes VARCHAR(1000)
);

INSERT INTO artists (name, activeyear, notes)
VALUES
  ('Taylor Swift', 2003, 'Lorem Ipsum.'),
  ('Harry Styles', 2010, 'Lorem Ipsum.'),
  ('Jon Batiste', 1998, 'Lorem Ipsum.');
`;

async function main() {
  console.log("seeding artists...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

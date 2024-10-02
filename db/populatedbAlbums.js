const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(60),
  year INTEGER,
  notes VARCHAR(1000)
);

INSERT INTO albums (title, year, notes)
VALUES
  ('Midnights', 2022, 'Lorem Ipsum.'),
  ('Harrys House', 2022, 'Lorem Ipsum.'),
  ('We Are', 2021, 'Lorem Ipsum.');
`;

async function main() {
  console.log("seeding albums...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

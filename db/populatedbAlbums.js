const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(60),
  year INTEGER,
  notes VARCHAR(1000),
  image VARCHAR(255)
);

INSERT INTO albums (title, year, notes, image)
VALUES
  ('Midnights', 2022, 'Lorem Ipsum.', 'https://res.cloudinary.com/ddayyfbgs/image/upload/v1730409758/midnights_lze09q.png'),
  ('Harrys House', 2022, 'Lorem Ipsum.', 'https://res.cloudinary.com/ddayyfbgs/image/upload/v1730409757/harrysHouse_fwq2ir.png'),
  ('We Are', 2021, 'Lorem Ipsum.', 'https://res.cloudinary.com/ddayyfbgs/image/upload/v1730409757/weAre_uxszu6.png');
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

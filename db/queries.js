const pool = require("./pool");

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}

async function getArtistByID(id) {
  const rows = await pool.query("SELECT * FROM artists WHERE id = ($1)", [id]);
  return rows[0];
}

async function getAllAlbums() {
  const { rows } = await pool.query("SELECT * FROM albums");
  return rows;
}

module.exports = {
  getAllArtists,
  getArtistByID,
  getAllAlbums,
};

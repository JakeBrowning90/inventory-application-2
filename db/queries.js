const pool = require("./pool");

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}

async function getArtistByID(id) {
  const { rows } = await pool.query("SELECT * FROM artists WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function insertArtist(artist) {
  await pool.query(
    "INSERT INTO artists (name, activeyear, notes) VALUES ($1, $2, $3)",
    [artist.name, artist.activeyear, artist.notes]
  );
}

async function getAllAlbums() {
  const { rows } = await pool.query("SELECT * FROM albums");
  return rows;
}

async function getAlbumByID(id) {
  const { rows } = await pool.query("SELECT * FROM albums WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function getAlbumsByArtist(artist_id) {
  const { rows } = await pool.query(
    "SELECT albums.id, albums.title FROM albums INNER JOIN album_credits ON albums.id = album_credits.album_id INNER JOIN artists ON artists.id = album_credits.artist_id WHERE artists.id = ($1)",
    [artist_id]
  );
  // console.log(rows);
  return rows;
}

async function getArtistsByAlbum(album_id) {
  const { rows } = await pool.query(
    "SELECT artists.id, artists.name FROM albums INNER JOIN album_credits ON albums.id = album_credits.album_id INNER JOIN artists ON artists.id = album_credits.artist_id WHERE albums.id = ($1)",
    [album_id]
  );
  return rows;
}

async function insertAlbum(album) {
  await pool.query(
    "INSERT INTO albums (title, year, notes) VALUES ($1, $2, $3)",
    [album.title, album.year, album.notes]
  );
}

module.exports = {
  getAllArtists,
  getArtistByID,
  insertArtist,
  getAllAlbums,
  getAlbumByID,
  getAlbumsByArtist,
  getArtistsByAlbum,
  insertAlbum,
};

const pool = require("./pool");

async function getArtistCount() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM artists");
  return rows;
}

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists ORDER BY name ASC");
  return rows;
}

async function getArtistByID(id) {
  const { rows } = await pool.query("SELECT * FROM artists WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function insertArtist(artist) {
  // console.log(artist)
  await pool.query(
    "INSERT INTO artists (name, activeyear, notes) VALUES ($1, $2, $3)",
    [artist.name, artist.activeyear, artist.notes]
  );
}

async function updateArtist(id, artist) {
  await pool.query(
    "UPDATE artists SET name = ($1), activeyear = ($2), notes = ($3) WHERE id = ($4)",
    [artist.name, artist.activeyear, artist.notes, id]
  );
}

async function deleteArtist(id) {
  // Delete artist from artist table
  await pool.query("DELETE FROM artists WHERE id = ($1)", [id]);
}

async function getAlbumCount() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM albums");
  return rows;
}

async function getAllAlbums() {
  const { rows } = await pool.query("SELECT * FROM albums ORDER BY title ASC");
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
  // Insert album into table, get new ID
  const { rows } = await pool.query(
    "INSERT INTO albums (title, year, notes) VALUES ($1, $2, $3) RETURNING id",
    [album.title, album.year, album.notes]
  );
  // Insert albumid and artistid(s) into credits table
  if (Array.isArray(album.artist)) {
    album.artist.forEach((artist) => {
      pool.query(
        "INSERT INTO album_credits (album_id, artist_id) VALUES ($1, $2)",
        [rows[0].id, artist]
      );
    });
  } else {
    await pool.query(
      "INSERT INTO album_credits (album_id, artist_id) VALUES ($1, $2)",
      [rows[0].id, album.artist]
    );
  }
}

async function updateAlbum(id, album) {
  await pool.query(
    "UPDATE albums SET title = ($1), year = ($2), notes = ($3) WHERE id = ($4)",
    [album.title, album.year, album.notes, id]
  );
  // Clear existing credits from credits table
  await pool.query("DELETE FROM album_credits WHERE album_id = ($1)", [id]);
  // Insert albumid and artistid(s) into credits table
  if (Array.isArray(album.artist)) {
    album.artist.forEach((artist) => {
      pool.query(
        "INSERT INTO album_credits (album_id, artist_id) VALUES ($1, $2)",
        [id, artist]
      );
    });
  } else {
    await pool.query(
      "INSERT INTO album_credits (album_id, artist_id) VALUES ($1, $2)",
      [id, album.artist]
    );
  }
}

async function deleteAlbum(id) {
  // Delete album from album_credits table
  await pool.query("DELETE FROM album_credits WHERE album_id = ($1)", [id]);
  // Delete album from album table
  await pool.query("DELETE FROM albums WHERE id = ($1)", [id]);
}

module.exports = {
  getArtistCount,
  getAllArtists,
  getArtistByID,
  insertArtist,
  updateArtist,
  deleteArtist,
  getAlbumCount,
  getAllAlbums,
  getAlbumByID,
  getAlbumsByArtist,
  getArtistsByAlbum,
  insertAlbum,
  updateAlbum,
  deleteAlbum,
};

import pool from "../models/pool";
const createAthlete = (req, res) => {
  console.log(req.query.id);
  const id = req.query.id;
  pool.query("INSERT INTO athlets (userid) VALUES ($1)", [id]);
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(201).send(`User added with ID: ${result}`);
  };
};

const getAthletId = (req, res) => {
  pool.query("SELECT userid FROM athlets ORDER BY id ASC", [id]);
  (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(ress.rows);
  };
};

const deleteAthlete = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM athlets WHERE userid = $1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  createAthlete,
  getAthletId,
  deleteAthlete,
};

import pool from "../db.js";

export const postRate = async (req, res) => {
  const { image_id, value } = req.body;
  console.log("post request", image_id, value);
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO cat_ratings (CatImageID, Score, Date) 
      VALUES ($1, $2, NOW())
      `,
      [image_id, value]
    );
    res.status(201).json(rows);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getRates = async (req, res) => {
  try {
    const { rows } = await pool.query(`
          SELECT CatImageID, SUM(Score) as TotalScore
          FROM cat_ratings
          GROUP BY CatImageID
          ORDER BY TotalScore DESC
          LIMIT 10
      `);
    res.status(200).json(rows);
    console.log("get request, scoreboard");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

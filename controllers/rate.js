import pool from "../db.js";

export const postRate = async (req, res) => {
  const { image_id, value } = req.body;
  console.log("post request", image_id, value);
  try {
      const { rows } = await pool.query(`
          INSERT INTO cat_ratings (CatImageID, TotalScore, RatingCount) 
          VALUES ($1, $2, 1) 
          ON CONFLICT (CatImageID) 
          DO UPDATE SET TotalScore = cat_ratings.TotalScore + $2, RatingCount = cat_ratings.RatingCount + 1
      `, [image_id, value]);
      res.status(201).json(rows);
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
  }
};

export const getRates = async (req, res) => {
  try {
      const { rows } = await pool.query(`
          SELECT CatImageID, TotalScore, RatingCount, TotalScore / RatingCount AS AverageRating 
          FROM cat_ratings
          ORDER BY AverageRating DESC
          LIMIT 10
      `);
      res.status(200).json(rows);
      console.log("get request", rows)
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
  }
};
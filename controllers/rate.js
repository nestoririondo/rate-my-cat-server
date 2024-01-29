import pool from "../db.js";

export const postRate = async (req, res) => {
  const { image_id, value, device_info } = req.body;
  console.log("post request", image_id, value, device_info);
  try {
    const { rows } = await pool.query(
      `
        INSERT INTO cat_ratings (CatImageID, Score, Date, userAgent, language, screenWidth, screenHeight) 
        VALUES ($1, $2, NOW(), $3, $4, $5, $6)
        `,
      [
        image_id,
        value,
        device_info.userAgent,
        device_info.language,
        device_info.screenResolution.width,
        device_info.screenResolution.height,
      ]
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

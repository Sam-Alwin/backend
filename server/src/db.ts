import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST, 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  port: Number(process.env.DB_PORT) || 3306, 
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined, 
  },
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("Database synchronized ");
  })
  .catch((err) => {
    console.error("Sequelize Sync Error:", err);
    process.exit(1);
  });


sequelize.authenticate()
  .then(() => {
    console.log("MySQL Connected via Sequelize!");
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  });

export const closeDB = async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (err) {
    console.error("Error closing database connection:", err);
  }
};

export default sequelize;

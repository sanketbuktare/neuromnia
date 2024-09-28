const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const Skill = require("../models/Skill"); 

const loadCSVData = async () => {
  const skills = [];
  
  // Use __dirname and path to construct the absolute path
  const filePath = path.resolve(__dirname, '../vb_mapp_milestones.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Push each row of CSV data to the skills array
        skills.push({
          code: row["Skill Code"],
          level: parseInt(row["Level"], 10),
          domain: row["Domain"],
          milestone: row["Milestone"],
        });
      })
      .on("end", async () => {
        try {
          // Insert all skills data into the database
          await Skill.insertMany(skills);
          console.log("CSV data successfully loaded into MongoDB");
          resolve();
        } catch (err) {
          console.error("Error inserting data into MongoDB:", err);
          reject(err);
        }
      })
      .on("error", (err) => {
        console.error("Error reading CSV file:", err);
        reject(err);
      });
  });
};

module.exports = { loadCSVData };

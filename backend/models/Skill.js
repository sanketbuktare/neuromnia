const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  code: String,
  level: Number,
  domain: String,
  milestone: String,
});

const Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;

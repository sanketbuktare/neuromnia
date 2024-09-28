const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

/**
 * @swagger
 * components:
 *   schemas:
 *     MilestoneCode:
 *       type: object
 *       properties:
 *         milestoneCodes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of unique milestone codes
 *       example:
 *         milestoneCodes: ["MIL-01", "MIL-02", "MIL-03"]
 *
 *     Domain:
 *       type: object
 *       properties:
 *         domains:
 *           type: array
 *           items:
 *             type: string
 *           description: List of unique domains
 *       example:
 *         domains: ["Communication", "Social Skills", "Motor Skills"]
 *
 * /api/milestone/milestones:
 *   get:
 *     summary: Retrieves a list of unique milestone codes
 *     tags: [Milestones]
 *     responses:
 *       200:
 *         description: A list of unique milestone codes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilestoneCode'
 *       500:
 *         description: Server error
 *
 * /api/milestone/domains:
 *   get:
 *     summary: Retrieves a list of unique domains
 *     tags: [Milestones]
 *     responses:
 *       200:
 *         description: A list of unique domains
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Domain'
 *       500:
 *         description: Server error
 */

// API to get the list of unique milestone codes
router.get("/milestones", async (req, res) => {
  try {
    const milestoneCodes = await Skill.find().distinct("code");
    res.status(200).json({ milestoneCodes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching milestone codes", error });
  }
});

// API to get the list of unique domains
router.get("/domains", async (req, res) => {
  try {
    const domains = await Skill.find().distinct("domain");
    res.status(200).json({ domains });
  } catch (error) {
    res.status(500).json({ message: "Error fetching domains", error });
  }
});

module.exports = router;

module.exports = router;

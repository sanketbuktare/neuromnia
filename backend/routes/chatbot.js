const express = require("express");
const Skill = require("../models/Skill");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatbotRequest:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: Message containing either a milestone code or domain and level details
 *       example:
 *         message: "Domain: Language, Level: 2"
 *
 *     ChatbotResponse:
 *       type: object
 *       properties:
 *         reply:
 *           type: string
 *           description: The processed message reply from the chatbot
 *         error:
 *           type: string
 *           description: Error message if the request is invalid
 *
 * /api/chatbot:
 *   post:
 *     summary: Handles chatbot requests such as 'Lookup Milestone' or 'List Domain'
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatbotRequest'
 *     responses:
 *       200:
 *         description: The chatbot's reply for a valid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatbotResponse'
 *       400:
 *         description: Bad request due to invalid message or missing data
 *       404:
 *         description: No milestones found for the given query
 *       500:
 *         description: Internal server error
 */

// Middleware to validate message input
const validateMessage = (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  if (typeof message !== "string" || message.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "Message must be a non-empty string" });
  }
  next();
};

// Endpoint to handle chatbot requests
router.post("/", validateMessage, async (req, res) => {
  const { message } = req.body;

  try {
    // Handle 'Lookup Milestone' request by checking if the message contains a milestone code
    if (/^[A-Z]{3}-\d+$/.test(message)) {
      const milestone = await Skill.findOne({ code: message });
      if (!milestone) {
        return res.status(404).json({ reply: "Milestone not found" });
      }
      return res.json({
        reply: `Milestone: ${milestone.milestone}, Domain: ${milestone.domain}, Level: ${milestone.level}`,
      });
    }

    // Handle 'List Domain' request by checking if message contains domain and level
    const domainMatch = message.match(/Domain: (\w+), Level: (\d+)/);
    if (domainMatch) {
      const domain = domainMatch[1];
      const level = parseInt(domainMatch[2], 10);
      const milestones = await Skill.find({ domain, level });

      if (!milestones.length) {
        return res
          .status(404)
          .json({ reply: "No milestones found for this domain and level" });
      }

      const milestoneList = milestones
        .map((m) => `Code: ${m.code}, Milestone: ${m.milestone}`)
        .join("\n");
      return res.json({
        reply: `Milestones for domain ${domain} at level ${level}:\n${milestoneList}`,
      });
    }

    // If no valid request is matched
    return res.status(400).json({ error: "Invalid request format" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }
});

module.exports = router;

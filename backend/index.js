const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require('cors');

const chatbotRoute = require("./routes/chatbot");
const milestoneRoute = require("./routes/milestone");

const Skill = require("./models/Skill");
const { loadCSVData } = require("./utils/loadCsv");

const app = express();


app.use(express.json());
app.use(helmet()); 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Rate limiting to prevent abuse
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Neuromnia API",
      version: "1.0.0",
      description: "API for the Neuromnia project managing VB-MAPP milestones",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"], // paths to files containing Swagger annotations
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route for the chatbot API
app.use("/api/chatbot", chatbotRoute);
app.use("/api/milestone", milestoneRoute);

app.get("/", (req, res) => res.send("Server running"));

// Connecting to MongoDB
mongoose
  .connect("mongodb://localhost:27017/neuromnia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");

    // Check if the collection is empty before loading data
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await loadCSVData(); // Load CSV data only if the collection is empty
    } else {
      console.log("Data already exists, skipping CSV load.");
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Setting the server to listen on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

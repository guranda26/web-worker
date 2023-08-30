const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const communityRouter = require("./routes/community");
const analyticsRouter = require("./routes/analytics"); // Assuming you have this router defined
const cors = require("cors");

const app = express();
global.appRoot = path.resolve(__dirname);

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/community", communityRouter);
app.use("/analytics", analyticsRouter);

// Require necessary modules
require("isomorphic-fetch");

// Function to send performance metrics to the server
async function sendPerformanceMetrics(metrics) {
  try {
    const response = await fetch(
      "http://localhost:8080/analytics/performance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metrics),
      }
    );

    const data = await response.json();
    console.log("Performance metrics sent:", data);
  } catch (error) {
    console.error("Error sending performance metrics:", error);
  }
}

// Define a route handler for the /community endpoint
app.get("/community", async (req, res) => {
  const startTime = performance.now();

  try {
    const response = await fetch("http://localhost:3000/community");
    const communityData = await response.json();

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`Fetching /community took ${duration} milliseconds`);

    // Send the fetched data in the response
    res.json(communityData);

    const performanceMetrics = {
      endpoint: "/community",
      startTime: startTime,
      endTime: endTime,
      duration: duration,
    };
    await sendPerformanceMetrics(performanceMetrics);
  } catch (error) {
    console.error("Error fetching community data:", error);
    res.status(500).json({ error: "Error fetching community data" });
  }
});

app.get("/performance/community", async (req, res) => {
  const startTime = performance.now();

  try {
    const response = await fetch("http://localhost:3000/community");
    const communityData = await response.json();

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`Fetching /community took ${duration} milliseconds`);

    res.json(communityData);

    const performanceMetrics = {
      endpoint: "/performance/community",
      startTime: startTime,
      endTime: endTime,
      duration: duration,
    };
    await sendPerformanceMetrics(performanceMetrics);
  } catch (error) {
    console.error("Error fetching community data:", error);
    res.status(500).json({ error: "Error fetching community data" });
  }
});

app.post("/analytics/user", (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const analyticsData = req.body;

  res.json({ success: true });
});

app.post("/analytics/performance", (req, res) => {
  const performanceMetrics = req.body;
  res.json({ success: true });
});

module.exports = app;

// Packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/user");
const cors = require("cors");
const path = require("path");
// Files
const _dirname = path.resolve();
//cors
const corsOptions = {
  origin: "http://localhost:5173", // Change this to your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Include credentials if needed
};
app.use(cors(corsOptions));
const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/deva-timepass");
    console.log("MongoDB Connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with a failure
  }
};

// Connect to MongoDB
dbConnection().then(() => {
  app.use(express.json());
  app.use("/user", userRouter);
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });

  app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
});

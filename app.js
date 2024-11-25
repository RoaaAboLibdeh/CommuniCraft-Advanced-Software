
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const projectPath = require("./routes/projects");
const userPath = require("./routes/users");
const mongoose = require("mongoose");
const skillPath = require("./routes/skills");
const planPath = require("./routes/plans");
const toolPath = require("./routes/tools");
const finshPath = require("./routes/finishedpro");
const logger = require("./middlewares/logger");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected.."))
  .catch((error) => console.log("failed ", error));

const app = express();
app.use(express.json());
app.use(logger);

app.get("/searchBooksByTitle", async (req, res) => {
  const { title } = req.query;

  try {
    const response = await axios.get(
      `http://openlibrary.org/search.json?q=${encodeURIComponent(title)}`
    );
    const books = response.data.docs.map(book => ({
      title: book.title,
      description: book.description,
      authors: book.author_name,
      publication_date: book.first_publish_year
    }));
    res.json(books);
  } catch (error) {
    console.error("Error fetching data from Open Library:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Routes
app.use("/api/projects", projectPath);
app.use("/api/users", userPath);
app.use("/api/skills", skillPath);
app.use("/api/plans", planPath);
app.use("/api/tools", toolPath);
app.use("/api/finishedpro", finshPath);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);

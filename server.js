const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to get the list of images
app.get("/images", (req, res) => {
  const imagesDir = path.join(__dirname, "public", "images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }

    // Filter out non-image files (optional)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    res.json(imageFiles);
  });
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

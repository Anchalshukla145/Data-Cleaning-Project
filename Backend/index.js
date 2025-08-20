let cleanedData = [];
let stats = {
  filesProcessed: 0,
  dataPoints: 0,
  processingSpeed: 'Fast',
  recentActivity: []
};

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require("json2csv"); // ✅ NEW: Import for CSV download

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const results = [];
  const start = Date.now();

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fs.unlinkSync(req.file.path);
      cleanedData = cleanData(results);

      // ✅ Update stats
      stats.filesProcessed += 1;
      stats.dataPoints = cleanedData.length;
      stats.processingSpeed = Date.now() - start < 1000 ? 'Fast' : 'Moderate';
      stats.recentActivity.unshift({
        type: "Upload",
        timestamp: new Date().toISOString(),
        filename: req.file.originalname || "CSV File"
      });

      res.json(cleanedData);
    });
});

// ✅ Basic cleaning: Replace empty strings with null
function cleanData(data) {
  return data.map((row) => {
    Object.keys(row).forEach((key) => {
      if (row[key] === "") row[key] = null;
    });
    return row;
  });
}

// ✅ Serve cleaned data
app.get("/data", (req, res) => {
  res.json(cleanedData);
});

// ✅ Serve stats
app.get("/stats", (req, res) => {
  res.json(stats);
});

// ✅ NEW: Download cleaned data as CSV
app.get("/download", (req, res) => {
  if (!cleanedData.length) {
    return res.status(400).json({ message: "No data to download." });
  }

  try {
    const json2csv = new Parser();
    const csv = json2csv.parse(cleanedData);

    res.header("Content-Type", "text/csv");
    res.attachment("cleaned_data.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "Failed to convert data." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

const express = require("express");
const { fetchVideoStatistics } = require("./api");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/search", fetchVideoStatistics);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

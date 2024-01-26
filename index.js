const express = require("express");
const { fetchVideoStatistics } = require("./api");
const cors = require("cors");
const app = express();

app.use(cors());

// app.get("/search", fetchVideoStatistics);
app.get("/search",(req,res)=>{
  return res.send("heeloojhdbcjhdfbj");
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

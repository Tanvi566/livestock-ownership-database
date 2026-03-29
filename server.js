const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const routes = require("./routes/livestockRoutes");
app.use("/api", routes);

/* FIX ROOT ROUTE */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
app.get("/farmer", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "farmer.html"));
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
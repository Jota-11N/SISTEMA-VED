const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const votingRoutes = require('./routes/votingRoutes');
app.use('/api/vote', votingRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Sistema VED funcionando correctamente"
    });
});

module.exports = app;
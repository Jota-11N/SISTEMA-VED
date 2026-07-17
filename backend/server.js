require("dotenv").config();

const app = require("./src/app");
require("./src/config/database");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor VED ejecutándose en puerto ${PORT}`);
});
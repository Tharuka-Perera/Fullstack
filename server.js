require("dotenv").config();

const app = require("./app");
const connectDb = require("./src/db/connect");

const PORT = process.env.PORT || 4000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
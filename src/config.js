require("dotenv").config();

const config = {
    port: Number(process.env.PORT || 4000),
    jwtSecret: process.env.JWT_SECRET
};

module.exports = config; 
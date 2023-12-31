const { join } = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const router = require("./routers");
const db = require("./models");
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());

// ===========================

app.use("/api/auth", router.authRouter);
app.use("/api/user", router.userRouter);
app.use("/api/company", router.companyRouter);
app.use("/api/position", router.positionRouter);

app.use("/api/userImg", express.static(`${__dirname}/public/userImg`));

// ===========================

// not found
app.use((req, res, next) => {
	if (req.path.includes("/api/")) {
		res.status(404).send("Not found !");
	} else {
		next();
	}
});

app.listen(PORT, (err) => {
	if (err) {
		console.log(`ERROR: ${err}`);
	} else {
		console.log(`APP RUNNING at ${PORT} ✅`);
	}
});

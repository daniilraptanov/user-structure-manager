import express from "express";
import { DBCreator } from "./db/database";
import { AuthValidator } from "./middleware/auth-validator";
const cors = require("cors");
require('dotenv-safe').config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api/v1", require("./routes/auth-routes"));
app.use("/api/v1", AuthValidator.auth, require("./routes/user-routes"));

app.use(cors());

app.listen(port, async () => {
    try {
        const dbCreator = await DBCreator.getInstance();

        if (!dbCreator) {
            throw Error("database error");
        }
        return console.log(`server is listening on ${port}`);
    } catch (err) {
        console.log(err);
        return console.error(`server error (on ${port})`);
    }
});

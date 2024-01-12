const app = require("./src/app");
const connectionDB = require("./src/config/db");



app.listen(3000, async () => {
    console.log("Server Connected");
    await connectionDB();
})
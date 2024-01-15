const {app, express} = require("./src/app");
const path = require('path');
const connectionDB = require("./src/config/db");

//serve Client:
app.use(express.static(path.join(__dirname,"./client/dist")));

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, './client/dist/index.html'),
        function(err) {
            res.status(500).send(err)
        }
    )
})

app.listen(3000, async () => {
    console.log("Server Connected");
    await connectionDB();
})
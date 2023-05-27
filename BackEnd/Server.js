const app = require('./App');
const config = require("./app/config");
const MongoDB = require('./app/utils/mongodb.util');


// app.listen(PORT, () => {
//     console.log(`Server  is running at ${PORT}`);
// });

async function startServer () {
    try {
        await MongoDB.connect(config.db.uri);
        console.log(("Connected to MongoDB"));

        const PORT = config.app.port ;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Cannot connect to the database server",error);
        process.exit();
    }
}

startServer();
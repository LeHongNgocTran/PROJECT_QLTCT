const config = {
    app : {
        port : process.env.PORT || 3001
    },
    db : {
        uri : process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chỗ này là tên collection nè'     // chỗ này là đường link để connect với mongo
// đổi url là sẽ connect đc với mongdo bên m
    }
}

module.exports = config;
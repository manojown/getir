const MongoClient = require('mongodb').MongoClient;

/**
 * @description Singleton db Object to return connection 
 * @return { DB } Mongodb Client
 */
function DbConnection() {

    var db = null;

    async function DbConnect() {
        try {
            let url = process.env.MONGODB;
            let _db = await MongoClient.connect(url);
            _db = _db.db()
            return _db
        } catch (e) {
            throw e;
        }
    }

   async function Get() {
        try {
            if (db != null) {
                return db;
            } else {
                db = await DbConnect();
                return db; 
            }
        } catch (e) {
            throw e;
        }
    }

    return {
        Get: Get
    }
}


module.exports =  DbConnection();
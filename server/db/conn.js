import { MongoClient } from "mongodb";
const Db = {
  ATLAS_URI:
    "mongodb+srv://dsabag:dsabag12345@cluster0.bsiljug.mongodb.net/?retryWrites=true&w=majority",
  PORT: 6000,
};

const client = new MongoClient(Db.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

export const dbo = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("cymulate");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};

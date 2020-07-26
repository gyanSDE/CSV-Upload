const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csv_upload');
const db = mongoose.connection;
db.on('error', console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('sucessfully connected to the db');
});
module.exports = db;
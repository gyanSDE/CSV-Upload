const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');


const CSV_PATH = path.join('/uploads/csv');
const csvSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true
     }
}, {
    timestamps: true
}
);

let storage = multer.diskStorage({
    destination: function (req, file , cb ) {
      cb(null  , path.join(__dirname,'..',CSV_PATH));  
    },
    filename: function (req, file, cb ) {
         cb(null, file.fieldname + '-' + Date.now());
        //cb(null, req.body.filename);
    }
  });

  csvSchema.statics.uploadedCsv = multer({ storage: storage }).single('csv');

  csvSchema.statics.csvPath = CSV_PATH;

const Csv = mongoose.model('Csv' , csvSchema);

module.exports = Csv;
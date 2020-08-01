const Csv = require("../models/csvFile");
const path = require('path');
const csvtojson = require("csvtojson");

module.exports.home = async (req, res) => {

    let csv = await Csv.find({})

    return res.render('home', {
        title: "CSV | Upload",
        details: csv
    });
};
module.exports.uploadCsv = async (req, res) => {
    await Csv.uploadedCsv(req, res, async function (err) {
        if (err) {
            console.log('multer error', err);
        }
        if (req.file) {
            Csv.create({
                fileName: req.body.filename,
                fileUrl: Csv.csvPath + '/' + req.file.filename
                //fileUrl: req.file.filename
            });
        }
    })
    return res.redirect('/');
};

module.exports.viewCsv = async (req, res) => {
    let data = await Csv.findById(req.params.id)
    const csvFilePath = path.join(__dirname, '..', data.fileUrl);
    //const csv=require('csvtojson')
    //csv()
    //.fromFile(csvFilePath)
    //.then((jsonObj)=>{
    //console.log(jsonObj);
    //})
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    //console.log(jsonArray);
    //console.log(jsonArray.length);

    var keys = [];
    for (let k in jsonArray[0]) {
      keys.push(k);
      
    }

   // console.log(keys);

    return res.render('viewCsv', {
        title: "CSV | View",
        details: jsonArray,
        keys:keys,
        fileName:data.fileName
    });


    return res.redirect('/');
};
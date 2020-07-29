const Csv = require("../models/csvFile");

module.exports.home = async (req, res) => {

    let csv = await Csv.find({})

        return res.render('home',{
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
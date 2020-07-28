const Csv = require("../models/csvFile");

module.exports.home = (req, res) => {
    return res.render('home', {
        title: "Home"
    });
};
module.exports.uploadCsv = (req, res) => {
    Csv.uploadedCsv(req, res, function (err) {
        if (err) {
            console.log('multer error', err);
        }
        if (req.file) {
            Csv.create({
                fileName: req.body.filename,
                fileUrl: Csv.csvPath + '/' + req.file.filename
            });
        }       
    })
    return res.redirect('back');
};
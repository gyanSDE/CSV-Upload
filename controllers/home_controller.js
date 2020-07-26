module.exports.home=(req,res)=>{
    return res.render('home',{
        title: "Home"
    });
};
module.exports.uploadCsv=(req,res)=>{
    return res.redirect('back');
};
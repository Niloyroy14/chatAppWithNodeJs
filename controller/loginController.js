//get login page

function getLogin(req, res, next) {
    // res.render("index", {       //rending view file of ejs
    //     title: "Login - Chat Application",
    // });   

    res.render("index");  //title pass by decorateHtmlResponse middilewaare
}




module.exports = {
    getLogin,
};





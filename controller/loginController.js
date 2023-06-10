// internal imports
const User = require("../models/People");

//external imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

//get login page
function getLogin(req, res, next) {
    // res.render("index", {       //rending view file of ejs
    //     title: "Login - Chat Application",
    // });   

    res.render("index");  //title pass by decorateHtmlResponse middilewaare


}

//do login
async function login(req, res, next) {
    try {
        //find a user who has this email/username
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }]
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                //prepare the user object to generate token
                const userObject = {
                    username: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: "user",
                };

                //generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRETE, { expiresIn: process.env.JWT_EXPIRY });

                //set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.COOKIE_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                //set login user local identifier
                res.locals.loggedInUser = userObject;
                // console.log(res.locals.loggedInUser);
                res.render("inbox");   //render inbox view

            } else {
                throw createError("Login Failed! Please Try Again");
            }
        } else {
            throw createError("Login Failed! Please Try Again");
        }

    } catch (err) {
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        }); //render index view
    }

}


//do logout
function logout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}



module.exports = {
    getLogin,
    login,
    logout
};





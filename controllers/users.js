const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
try{
    let { username, email, password } = req.body;
const newUser = new User({ username, email });
const registeredUser =  await User.register(newUser, password);
console.log(registeredUser);
req.login(registeredUser, (err) => { // Log in the user after registration
if (err) {
    return next(err); // Handle login error
}
req.flash("success", "Welcome to Wanderlust!"); // Flash message for successful signup
res.redirect("/listings"); // Redirect to listings page after signup
});
}
catch(e){
    req.flash("error", e.message); // Flash message for error
    res.redirect("/signup"); // Redirect back to signup page on error
}
};

module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back!"); // Flash message for successful login
    let redirectUrl = res.locals.redirectUrl || '/listings'; // Use redirect URL from session or default to listings
    res.redirect(redirectUrl);  
}

module.exports.logout = (req, res,next) => {
    req.logout((err) =>{
if(err){
        return next(err); // Handle logout error
    }
req.flash("success", "you are now logged out"); // Flash message for successful logout
res.redirect("/listings"); // Redirect to listings page after logout   
})
}
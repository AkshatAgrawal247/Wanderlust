if(process.env.NODE_ENV !== "production") {
    require('dotenv').config(); // Load environment variables from .env file
}
 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
 const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
 const ExpressError = require('./utils/ExpressError.js');
 const session = require('express-session');
const MongoStore = require('connect-mongo'); // Store session in MongoDB
 const flash = require('connect-flash');
 const passport = require('passport');
 const LocalStrategy = require('passport-local');
 const User = require('./models/user.js');

const listingRouter  = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const { log } = require('console');


 

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}
// Set up EJS and middleware
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Session store error",err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
};

// Root route
// app.get('/', (req, res) => {
//     res.send("Hi, I'm the root route!");
// });




app.use(session(sessionOptions)); // Initialize session middleware
app.use(flash()); // Initialize flash middleware

app.use(passport.initialize()); // Initialize Passport.js
app.use(passport.session()); // Use session for Passport.js
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

app.use((req, res, next) => {
    console.log("Current User:", req.user); // Debugging
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user || null; // Make current user available in views
    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"student"
//     });
//   let registeredUser =   await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

    
app.use('/listings', listingRouter); // Use the listings routes
app.use('/listings/:id/reviews', reviewRouter); // Use the reviews routes
app.use('/', userRouter); // Use the user routes
// Catch-all for unmatched routes
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// Error-handling middleware (must be after all routes)
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(`<h1>${statusCode}</h1><p>${message}</p>`);
});

// Server start
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

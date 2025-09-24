#  Wanderlust

Wanderlust is a **full-stack travel accommodation marketplace** inspired by platforms like **Airbnb**.  
Users can browse, create, review, and manage listings for unique travel destinations.

---

## ✨ Features

- 🔐 **User Authentication** – Secure sign up, login, and logout using **Passport.js** with session persistence in MongoDB.  
- 🏠 **Listing Management** – Create, view, edit, and delete accommodation listings with title, description, price, and images.  
- ⭐ **Reviews & Ratings** – Community-driven reviews with **1–5 star ratings**.  
- ☁️ **Cloud Image Uploads** – Fast, reliable storage and delivery via **Cloudinary**.  
- 🗺️ **Geocoding & Maps** – Interactive maps and geocoding using **Mapbox**.  
- 🔍 **Search Functionality** – Find listings by title or location.  
- 📱 **Responsive Design** – Optimized for mobile and desktop with **Bootstrap**.  
- ✅ **Data Validation** – Secure server-side validation with **Joi**.  

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Frontend**: EJS, HTML, CSS, JavaScript  
- **Authentication**: Passport.js (passport-local, passport-local-mongoose)  
- **Image Storage**: Cloudinary, Multer (multer-storage-cloudinary)  
- **Geospatial**: Mapbox SDK  
- **Validation**: Joi  
- **Session Management**: express-session, connect-mongo  

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository_url>
cd wanderlust
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set up Environment Variables  
Create a **.env** file in the project root with the following keys:
```env
ATLASDB_URL="mongodb://127.0.0.1:27017/wanderlust"
SECRET="your_strong_secret_key"
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_api_key"
CLOUD_API_SECRET="your_cloudinary_api_secret"
MAP_TOKEN="your_mapbox_access_token"
```

### 4️⃣ Initialize Database (Optional)
Populate the database with sample data:
```bash
node init/index.js
```

### 5️⃣ Run the Application
```bash
node app.js
```
Server runs at **http://localhost:8080/** 🎉

---

## 📂 Project Structure

```
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
├── .gitignore
├── app.js
├── cloudConfig.js
├── middleware.js
├── package-lock.json
├── package.json
└── schema.js
```

 

## 🤝 Contributing

Contributions are welcome!  
- Fork the repo  
- Create a new branch (`git checkout -b feature-branch`)  
- Commit your changes (`git commit -m "Add new feature"`)  
- Push the branch (`git push origin feature-branch`)  
- Open a Pull Request 🎉  

---

## 🌟 Acknowledgments

- [Airbnb](https://www.airbnb.com/) for the inspiration.  
- [Mapbox](https://www.mapbox.com/) for maps and geocoding.  
- [Cloudinary](https://cloudinary.com/) for media management.  
- [Bootstrap](https://getbootstrap.com/) for responsive UI.  

const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors( corsOptions = { 
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

/* var corsOptions = { -- maybe later
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} */

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://TinyFox:12345@leagueapiuni.18g90cd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
  });

// Create a User model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username and password
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        res.json({ success: false, message: 'Username already exists' });
      } else {
        // Create a new user
        const user = new User({ username, password });
        await user.save();
        res.json({ success: true, message: 'Registration successful' });
      }
    } catch (error) {
      console.error('Error during registration', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

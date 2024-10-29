const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const AuthService = require('./services/AuthService');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const baseRoutes = require('./routes/baseRoutes');
const goalRoutes = require('./routes/goalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', baseRoutes);
app.use('/goals', goalRoutes);
app.use('/notifications', notificationRoutes);
app.use('/tasks', taskRoutes);
app.use('/teams', teamRoutes);
app.use('/users', userRoutes);

app.get('/register', (req, res) => {
  res.render('RegisterPage');
});

app.get('/login', (req, res) => {
  res.render('LoginPage');
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.authenticate(email, password);
    req.session.token = token;
    res.redirect('/');
  } catch (error) {
    res.status(401).render('ErrorPage', { error: error.message });
  }
});

app.use((req, res, next) => {
  if (req.session.token) {
    AuthService.authorize(req.session.token)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        res.status(401).render('ErrorPage', { error: 'Unauthorized' });
      });
  } else {
    res.status(401).render('ErrorPage', { error: 'Unauthorized' });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).render('ErrorPage', { error: err.message });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

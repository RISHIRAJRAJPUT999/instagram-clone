const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors());  
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

 app.get('/', (req, res) => {
    res.send('Instagram Clone API is running...');
});

 mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('DB Error:', err));

 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port no ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const uploadRoute = require('./routes/upload');
const postRoutes = require('./routes/postRoutes');
const prodRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRouter');
const companyRoutes = require('./routes/company');
const applyRoutes = require("./routes/applyRoutes");
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// Sử dụng CORS cho toàn bộ app
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error(err));

app.use('/api/posts', postRoutes);
app.use('/api/products', prodRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoute);
app.use('/api/image', imageRoutes);
app.use('/api/companies', companyRoutes);
app.use("/api", applyRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

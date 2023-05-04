const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoDb ic called here.
connectDB();

app.use(cors());
// cors is used to avoid Access Control Allow Origin Error

app.use('/api/auth', require('./routes/auth/auth'));
app.use('/api/items', require('./routes/items/items'));

// all routes were called here 

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`)) 
//app.get is used 
app.get('/', (req,res) => {
    res.send(`Server is connected`)
})

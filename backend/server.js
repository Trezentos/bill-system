const express = require('express');
const app = express();
const PORT = `${3000}`
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const debtRoute = require('./routes/debts');
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());

//Conect to DB
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true,
 useUnifiedTopology: true }, 
()=> console.log('Connected to db'));

//Router Middleware
app.use(express.json());

app.get('/', (req,res) => {
    res.json([
        {nome: "Gustavo"},
        {nome: "Mariane"}
    ]);
})
app.use('/api/user', authRoute);
app.use('/api/debt', debtRoute);

app.listen(PORT, ()=>{

    console.log(`http://localhost:${PORT} is running`);

})
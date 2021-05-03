const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const path = require('path')

const app = express();

colors.setTheme({
  custom: ['green', 'underline','bgYellow']
});

// Connect MongoDB 
connectDB();

// 
app.use(express.json({extended: false}));

//Routes Definitions

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))


//static assets in prod
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}



//Server-PORT Connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.custom));
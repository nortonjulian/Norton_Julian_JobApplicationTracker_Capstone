const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27018/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });


//mongod --port 27018 --dbpath ~/data/db --bind_ip 127.0.0.1
//ps aux | grep mongod


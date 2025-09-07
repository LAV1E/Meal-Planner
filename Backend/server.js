// const app = require('./src/app');
// require('dotenv').config();



// app.listen(process.env.PORT, () => {
//   console.log('Server is running at: http://localhost:3000');
// });


const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});


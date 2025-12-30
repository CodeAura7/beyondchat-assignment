require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("BeyondChat backend is live 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

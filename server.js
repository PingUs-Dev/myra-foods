import express from "express";
import {fileURLToPath} from "url";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000; // The port your Express server will run on

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for your cart page
app.get('/cart', (req, res) => {
  // Send the cart.html file when someone visits /cart
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.listen(PORT, () => {
  console.log(`🛒 Express server running at http://localhost:${PORT}`);
});


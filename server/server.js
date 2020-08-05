const express = require('express');
const path = require('path');

const app = express();
const PORT = 3004;

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(PORT, () => console.log(`Web Server Listenting on Port: ${PORT}`));
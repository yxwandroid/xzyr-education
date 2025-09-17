const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8088;

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(compression());

app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`知盈瑞教育网站运行在端口 ${PORT}`);
});

module.exports = app;
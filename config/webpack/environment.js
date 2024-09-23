const { environment } = require('@rails/webpacker');
const fileLoader = require('./loaders/file');

environment.loaders.prepend('file', fileLoader);

module.exports = environment;

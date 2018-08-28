const withTypescript = require('@zeit/next-typescript');

exports = module.exports = withTypescript({
  pageExtensions: ['tsx', 'ts'],
});

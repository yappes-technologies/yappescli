const fs = require('fs');
const isWsl = require('is-wsl');
const netrc = require('../utils/netrc');

exports.configs = function configs() {
  return {
    getHostDetails() {
      let hostDetails = {};
      if (process.env.YAPPES_ENV == 'developmen') {
        hostDetails = {
          host: 'localhost',
          port: 3001,
          scheme: 'http',
          basePath: '/api',
        };
      } else {
        hostDetails = {
          host: 'cliapi.yappes.com',
          port: '443',
          scheme: 'https',
          basePath: '/api',
        };
      }
      return hostDetails;
    },
    netrcPath: netrc.getFilePath(),
    configBase: '.yappes',
    getDelimiter() {
      if (process.platform == 'win32' || isWsl) {
        return '\\';
      }
      return '/';
    },
    getConfigSettings(callback) {
      let settingsString = '';
      if (process.platform == 'win32' || isWsl) {
        settingsString = '\\.yappes\\settings.json';
      } else {
        settingsString = '/.yappes/settings.json';
      }
      const configSettingPath = `${process.env.HOME || process.env.USERPROFILE}${settingsString}`;
      fs.readFile(configSettingPath, 'utf8', (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      });
    },
  };
};

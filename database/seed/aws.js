const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'rpt22' });
AWS.config.credentials = credentials;
AWS.config.region = 'us-west-1';

module.exports = AWS;

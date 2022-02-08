//host : 'mysql.ard.kinghost.net',

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'air',
      password : 'Matrix05',
      database : 'airport'
    }
  });
  
  module.exports = knex;
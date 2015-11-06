var r = require('rethinkdb');
var async = require('async');

// connect
r.connect( {host: 'localhost', port: 28015}, function(err, connection) {
  
  var actions = [];

  // delete from animals table
  // actions.push(function(callback) {
  //   r.table('animals').delete().run(connection, callback);
  // });
  
  // // delete from  pets table
  // actions.push(function(callback) {
  //   r.table('pets').delete().run(connection, callback);
  // });

  // create animals table
  // actions.push(function(callback) {
  //   r.db('test').tableCreate('animals').run(connection, callback);
  // });
  
  // // create pets table
  // actions.push(function(callback) {
  //   r.db('test').tableCreate('pets').run(connection, callback);
  // });

  add some animals
  actions.push(function(callback) {
    r.table('animals').update([
      {
        id: 1,
        type: "cat",
        legs: 4,
        exotic: false
      },
      {
        id: 2,
        type: "iguana",
        legs: 4,
        exotic: true
      },
      {
        id: 3,
        type: "goldfish",
        legs: 0,
        exotic: false
      }
    ]).run(connection, callback)
  })

  // add some pets
  actions.push(function(callback) {
    r.table('pets').insert([
      {
        name: "Paddy",
        animal_id: 1
      },
      {
        name: "Dave",
        animal_id: 2
      },
      {
        name: "Dumbo",
        animal_id: 3
      },
      {
        name: "Derek",
        animal_id: 2
      }
    ]).run(connection, callback)
  })

  async.series(actions, function(err, result) {

    if (err) throw err;

    console.log(JSON.stringify(result, null, 2));

  })

})
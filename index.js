var r = require('rethinkdb');

// default callback to log out from a cursor
var cursorLog = function(err, data) {

  if (err) throw err;

  console.log(JSON.stringify(data, null, 2));

}

// connect
r.connect( {host: 'localhost', port: 28015}, function(err, connection) {

  // get all animals
  r.table('animals').run(connection, function(err, cursor) {

    if (err) throw err;

    cursor.toArray(cursorLog)

  })

  // get all pets
  // r.table('pets').run(connection, function(err, cursor) {

  //   if (err) throw err;

  //   cursor.toArray(cursorLog)

  // })

  // get all exotic animals
  // r.table('animals').filter(
  //   r.row('exotic').eq(true)
  // ).run(connection, function(err, cursor) {

  //   if (err) throw err;

  //   cursor.toArray(cursorLog)

  // })

  // update all pet statuses
  // r.table('pets').update({status: "living"}).run(connection, cursorLog);
  // r.table('pets').update({status: "dead"}).run(connection, cursorLog);

  // update all pet iguana statuses
  // r.table('pets').filter(
  //   r.row('animal_id').eq(2)
  // ).update({status: "dead"}).run(connection, cursorLog);

  // join animals and pets
  // r.table('pets').eqJoin("animal_id", r.table('animals')).zip().run(connection, function(err, cursor) {

  //   if (err) throw err;

  //   cursor.toArray(cursorLog)

  // });

});
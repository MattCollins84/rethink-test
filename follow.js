var r = require('rethinkdb');

// default callback to log out from a cursor
var cursorLog = function(err, data) {

  if (err) throw err;

  console.log(JSON.stringify(data, null, 2));

}

// connect
r.connect( {host: 'localhost', port: 28015}, function(err, connection) {

  // follow changes to all pets
  r.table('pets').changes().run(connection, function(err, cursor) {

    cursor.each(function(err, row) {
      if (err) throw err;
      console.log(JSON.stringify(row, null, 2));
    });

  });

  // follow changes to pets that aren't iguanas
  // r.table('pets').filter(
  //   r.row('animal_id').eq(1)
  // ).changes().run(connection, function(err, cursor) {

  //   cursor.each(function(err, row) {
  //     if (err) throw err;
  //     console.log(JSON.stringify(row, null, 2));
  //   });

  // });

});
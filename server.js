

const connection = require('./config/connection.js')
const actionPromise = require('./script.js');



connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  runTool(connection)

});


async function runTool (connection) {
  const actionValue = await actionPromise()
  console.log(actionValue);
  switch(actionValue) {
    case 0:
      viewAll(connection)
      break
    default:
      afterConnection()
      
  }


}
const viewAll = (connection) => {
  connection.query('SELECT * FROM employees', function (err,res) {
  console.log(res);
  runTool(connection)

  })
}


const afterConnection = () => {
  connection.query('SELECT * FROM employees', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}






// createProduct = () => {
//   console.log('Inserting a new product...\n');
//   const query = connection.query(
//     'INSERT INTO employees SET ?',
//     {
//       employeeName: "phil",
//       employeeRole: "janitor"
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' product inserted!\n');
//       // Call updateProduct() AFTER the INSERT completes
//       // updateProduct();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// updateProduct = () => {
//   console.log('Updating all Rocky Road quantities...\n');
//   // Update the quantity for 'Rocky Road' to 100
//   //
//   // YOUR CODE HERE
//   //
//   // Include the callback function to catch any errors,
//   // log how many products were updated,
//   // and call deleteProduct() AFTER the UPDATE completes
//   //
//   // YOUR CODE HERE
//   //
//   const query = connection.query('UPDATE products SET ? WHERE ?', [
//       {
//         quantity: 100
//       },
//       {
//         flavor: 'Rocky Road'
//       }
//     ],function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' product Updated!\n');
//       deleteProduct();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
  
// };

// deleteProduct = () => {
//   console.log('Deleting all strawberry ice cream...\n');

//   // Delete the flavor 'strawberry'
//   //
//   // YOUR CODE HERE
//   //
//   // Include the callback function to catch any errors,
//   // log how many products were deleted,
//   // and call the readProducts() AFTER the DELETE completes
//   //
//   // YOUR CODE HERE
//   //
//   const query = connection.query(
//     'DELETE FROM products WHERE ?',
//     {
//       flavor: 'Strawberry'
//     }, function(err, res) {
//     if (err) throw err;
//       console.log(res.affectedRows + ' product deleted!\n');
//       readProducts();
//     })

//   // logs the actual query being run
//   console.log(query.sql);
// }

// readProducts = () => {
//   console.log('Selecting all products...\n');
//   // Select all of the data from the 'products' table
//   //
//   // YOUR CODE HERE
//   //
//   // Include the callback function to catch any errors,
//   // log all results of the SELECT statement,
//   // and end the connection
//   //
//   // YOUR CODE HERE
//   //
//   const query = connection.query('SELECT * FROM products', function (err,res) {
//     if(err) throw err;
//       console.log(res);
//       connection.end();
//   });
//   console.log(query.sql)


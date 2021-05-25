
const inquirer = require('inquirer');
const connection = require('./config/connection.js')
let query_all = `
SELECT * FROM departments AS department_name
RIGHT JOIN roles ON roles.department_id = departments.id 
`
// TODO: Create an array of questions for user input
const actionPrompt = [
  {
    type: 'list',
    message: 'Select an Action',
    default: 0,
    name: "topic",
    choices: [
      {value:{ name: 0, query: "SELECT employees.id, first_name, last_name, title, salary, departments.name AS Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id"},
      name: "View Full Employee Directory"},
      {value:{ name: 1, query: ""},name: "View by department"},
      {value:{ name: 2, query: "SELECT * FROM employees"},name: "Add a new Employee"},
      {value:{ name: 3, query: "SELECT * FROM employees"},name: "Quit" }
    ],
    filter(topic) {
      return new Promise((res,rej)=> {
        res({'value': topic.name,
            'query': topic.query});
      })

    }
  }]

  const departmentPrompt = 
  {

    type: 'list',
    message: 'Which department',
    default: 0,
    name: "byDepartment",
    choices: [
      {value:{ name: 0, query: ""}, name: "sales"},
      {value:{ name: 1, query: ""}, name: "r&d"},
      {value:{ name: 2, query: ""}, name:"finance"},
    ],
    filter(byDepartment) {
      return new Promise((res,rej)=> {
        res({'value': byDepartment.name,
            'query': byDepartment.query});
      })
  }
}
getEmployeeList = function() {
  connection.connect( err => {
    if (err) throw err;
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', function(err,res) {
      const mapped = res.map(  ({ name,value,...rest }) => { return {'value': rest.id, 'name' : name } })
      console.log(mapped)
      return mapped;
    });
  })
}

const addPrompt = [
  {
    type: 'input',
    message: 'Enter the employee information\nFirst Name:',
    name: "first_name", 
    filter(first_name) {
      return new Promise((res,rej)=> {
        res(first_name)
      })
    }
    },
    {
      type: 'input',
      message: 'Last Name:',
      name: "last_name",  
    },
    {
      type: 'list',
      message: 'manager',
    default: 1,
      choices: function() {
        return getEmployeeList();
      }

    }


  ];

const cTable = require('console.table');


let query;
inquirer.prompt(actionPrompt).then(
    function({ topic}) {
    console.table(topic)
    if (topic.value === 0 ) {
      callQuery(topic.query);
    }
    else if (topic.value === 2) {
      inquirer.prompt( [ departmentPrompt, ...addPrompt] ).then(
        function(addAnswers) {
          console.table(addAnswers);
          answers.push(addAnswers)

          query = addAnswers;
        }
      ).catch(error => {console.error(error)})
    }
    else{
      return ;
    }
    }).catch(err => console.log(err))
const callQuery = (query) => {
  connection.connect( err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    connection.query(`${query}`, (err,res) => {
      if (err) throw err;
      console.table(res)
    })})

 }


   




var runTool = async function() {
  const  action = await prompt();
  if (action.value) {
    query = JSON.parse( action.value )
    handleQuery();
  }
}
handleQuery = function () {
    console.log(query)
    if (query === null) {console.error('!!!!!!')}
    switch(query) {
      case "quit": {
        afterConnection();
      }
      case "view": {
        return viewAll();
      }
      case "add": {
        return join();
      }
      default: {
        console.log('INVALID')

      }
    // const actionValue = await actionPromise
    }
  }
  




join  = (connection) => {
  connection.query('SELECT title, firstName, lastName FROM employees RIGHT JOIN roles ON employees.role_id = roles.id', (err,res) => {
    console.table(res);
    viewAll();
  })
}

const viewAll = () => {
  connection.query('SELECT * FROM employees', function (err,res) {
    console.table(res)
  //  runTool()

  })
}


const afterConnection = () => {
  connection.query('SELECT * FROM employees', function(err, res) {
    if (err) throw err;
    console.table(res);
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


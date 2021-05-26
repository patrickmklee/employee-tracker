
const inquirer = require('inquirer');
const pool = require('./config/connection.js')
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
      {value:{ name: 1, query: "SELECT * from employees"},name: "View by department"},
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
  getRoles = function() {
    return pool.query('SELECT * from roles', (err,rows,fields) => {
     new Promise( (resolve,rej) => {
        resolve(rows)
      })
    })
    // let values = await pool;
    // console.log(values)
    // console.table(rows)
    // //  function(err,res) {
    //   if (err) throw err;
    // })
  }
  const departmentPrompt = 
  {

    type: 'list',
    message: 'Which department',
    default: 1,
    name: "byDepartment",
    choices: [
      {value:{ name: 1, query: "SELECT employees.*, roles.title, roles.salary FROM employees INNER JOIN roles on employees.role_id = roles.id  WHERE roles.department_id = 1"}, name: "sales"},
      {value:{ name: 2, query: "SELECT employees.*, roles.title, roles.salary FROM employees INNER JOIN roles on employees.role_id = roles.id  WHERE roles.department_id = 2"}, name: "r&d"},
      {value:{ name: 3, query: "SELECT employees.*, roles.title, roles.salary FROM employees INNER JOIN roles on employees.role_id = roles.id  WHERE roles.department_id = 3"}, name:"finance"},
    ],
    filter(byDepartment) {
      return new Promise((res,rej)=> {
        res({'value': byDepartment.name,
            'query': byDepartment.query});
      })
  }
}
getEmployeeList = function() {
  // pool.connect( err => {
    // if (err) throw err;
    
    pool.query('SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employees', function(err,res) {
      return res.map(  ({ Manager, ...rest }) => { return { 'name' : Manager, value: rest } })
      // console.log(mapped)
      // return mapped;
    });
  // })
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
      name: "last_name"
    },
    departmentPrompt
 ];

const cTable = require('console.table');




const callQuery = (query) => {
  // connection.connect( err => {
    // if (err) throw err;
    console.table(query)
    // console.log('connected as id ' + connection.threadId + '\n');
    pool.query(`${query}`, (err,res) => {
      if (err) throw err;
      console.table(res)
      inquirer.prompt( {type:'confirm', name:'confirm', message:'Continue?', default:true}).then(answers => {if (answers.confirm === false) {
          Promise.resolve('done');
       } else {
         return new Promise( (res,rej) => initPrompt())
       }
    }
      )
    })
  };


const insertEmployee = (answers) => {
  pool.execute(
    'INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [answers.first_name, answers.last_name, answers.title, null]
  ),
  function(err, results, fields) {
    if (err) throw err;
    console.table(resuts);
    console.table(fields);
  }
}




const afterConnection = () => {
  connection.query('SELECT * FROM employees', function(err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}


initPrompt = function() {
  inquirer.prompt(actionPrompt)
  .then(
  function({ topic}) {
      if (topic.value === 0 ) {
        callQuery(topic.query);
      } else if ( topic.value === 1) {
        inquirer.prompt(departmentPrompt).then(function (answers) {
          callQuery(answers.byDepartment.query)
          
        })
    } else if (topic.value === 2) {
      inquirer.prompt( addPrompt )
      .then(function( answers) { 
        pool.query('SELECT roles.id AS value, roles.title AS name from roles RIGHT JOIN departments on departments.id = roles.department_id WHERE departments.id = ?', [answers.byDepartment.value],function(err,res) {
          // console.log(answers)
          console.table(res);
          // cTable.getTable(res)
        // })
          inquirer.prompt({
            type :'list',
            message : 'select a title',
            name:'title',
            choices: res,
            default: "1",
            filter(title) {
              return new Promise((res,rej)=> {
                res(title)
              })
            }
        
        },answers).then(
          function(answers) {
            console.table(answers);
            insertEmployee( answers );
            return new Promise( (res,rej) => res( initPrompt()) );
          })
      })
    })
    }
    else{
      Promise.resolve('Done');
    }
    })

  }


  

initPrompt();
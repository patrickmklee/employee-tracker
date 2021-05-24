const inquirer = require('inquirer');
// const generateMarkdown = require('./utils/generateMarkdown');


// TODO: Create an array of questions for user input
const actionPrompt = [
    {
    type: 'list',
    // choices: ['View All employees', 'Add an Employee', 'Quit' ],
    message: '\r\n--------------------------------------------',
    default: null,
    name: "action",
    choices: [

        { name: 'View All Employees', value: 'viewAll' },
        { name: 'Add an employee', value: 'add' },
        { name: 'Quit', value: 'q'}
    ],
    // validate: function(input) {
    //     if (input.match(/^q$/)) {
    //         return false;
    //     } else {
    //         return  true
    //     }
    // },
    filter() {
        return new Promise.all(action)
            
        }
    }

];



let actionPromise = () => {
    // const answers = 
    console.clear();
    console.log('\n---------------------------------\n')
    inquirer.prompt(actionPrompt)
    .then(answers => { return {...answers } })
    .catch(err => console.error(err));
}
module.exports = actionPromise;
//module.exports = ( {  ...action  } = {  actionPromise() });


// const query = connection.query('SELECT * FROM employees', function (err,res) {
//     if(err) throw err;
//       console.log(res);
//       connection.end();
//   });
// const questions = [
//     {
//         type : 'input',
//         name : 'title',
//         message : 'Enter the name of your project: ',
//         validate : function(value) {
//             var pass = value.match(/\w+/g)
//             if ( pass ) {
//                 return true
//             }
//             return 'Project must have a name!'
//         },
        
//     },
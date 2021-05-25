// const generateMarkdown = require('./utils/generateMarkdown');
const inquirer = require('inquirer');


// TODO: Create an array of questions for user input
const actionPrompt = Array.from( [{
    type: 'list',
    
    message: 'Select an Action',
    default: "view",
    name: "topic",
    choices: ["view", "add", "quit"],
    //  { 
    //     name: 'View All Employees',value: "view"
    // },
    // {
    //      name: 'Add an employee', value: "add"
    // },
    // {
    //      name: 'Quit', value: "quit"
    // }
    // ],
    
    },
    {
    type: 'input',
    where: { topic:"add" },
    message: 'Enter the employee information',
    name: "first_name"
    }




]);

// const actionPromise = () =>  Promise.resolve( inquirer.prompt(actionPrompt))}
    // async function () { 
    // await inquirer.prompt(actionPrompt);
// }
// {return new Promise( (res, rej) => {
//     // const answers = 
//     // console.clear();
//     inquirer.prompt(actionPrompt)
//     .then( ({action}) => { res(action )})
//     .catch( err => {rej(err) })
// })}
runPrompt = () => {
    
    inquirer.prompt( {
        actionPrompt,
        filter() {
            return new Promise(answers) 
        }
    })
        .then(function(answers) {
        console.log(answers)
        return JSON.stringify(answers.topic)
    })
}

module.exports = { prompt: () =>{ ( inquirer.prompt(actionPrompt[0]) )}};
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
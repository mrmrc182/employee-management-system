const requests = {
  options: [
    {
      type: "list",
      message: "Select what you would like to work with today",
      name: "options",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Cancel"
      ],
    },
  ],
  addDepartment: [
    {
      type: "input",
      message: "Please add department name:",
      name: "name",
      validate: (input) => {
        if (input !== ''){
          return true;
        }
        return "Not a valid department name"
      }
    }
  ],
  addRole: [
    {
      type: "input",
      message: "Please add role name:",
      name: "title",
      validate: (input) => {
        if (input !== ''){
          return true;
        }
        return "Not a valid role name"
      }
    },
    {
      type: "input",
      message: "Please enter role salary:",
      name: "salary",
      validate: (input)=> {
        if (input !== isNaN && input !== ""){
          return true;
        } else {
        return "Enter a valid numeric salary"
        }
      },
    }
  ],
  addEmployee: [
    {
      type: "input",
      message: "Please enter the employee's first name:",
      name: "first_name",
      validate: (input) => {
        if (input !== ''){
          return true;
        }
        return "Not a valid name"
      }
    },
    {
      type: "input",
      message: "Please enter the employee's last name:",
      name: "last_name",
      validate: (input) => {
        if (input !== ''){
          return true;
        }
        return "Not a valid name"
      }
    },
  ]
};

module.exports = requests;

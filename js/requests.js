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
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
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
};

module.exports = requests;

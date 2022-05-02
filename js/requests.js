const requests = {
  options: [
    {
      type: "list",
      message: "Select what you would like to work with today",
      name: "options",
      choices: ["Departments", "Roles", "Employees", "Cancel"],
    },
  ],

  department: [
    {
      type: "list",
      message: "Choose from the following:",
      name: "action",
      choices: [
        "View Departments",
        "View Department Budget",
        "Add Department",
        "Delete Department",
        "Cancel",
      ],
    },
  ],

  role: [
      {
        type: "list",
        message: "Choose from the following:",
        name: "action",
        choices: [
            "View Roles",
            "Add Role",
            "Delete Role"
        ],
      }
    ],
};

module.exports = requests;

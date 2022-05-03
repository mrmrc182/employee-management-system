const mysql = require("mysql2");
const inquirer = require("inquirer");
const inputs = require("./js/inputs");
const util = require("util");
const requests = require("./js/requests");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password123!@#",
  database: "employees_db",
});

//promise for database
db.query = util.promisify(db.query);

//when asking for selections
const selectedOptionList = (message, name, objArray) => {
  return {
    type: "list",
    message: message,
    name: name,
    choices: objArray,
  };
};

const optionRequest = () => {
  inquirer.prompt(requests.options).then((optionAnswer) => {
    switch (optionAnswer.options) {
      case "View All Departments":
        return tableDisplayDepartment();
      case "View All Employees":
        return tableDisplayEmployee();
      case "View All Roles":
        return tableDisplayRoles();
      case "Add Department":
        return addDepartment();
      case "Add Role":
        return addRole();
      case "Add Employee":
        return addEmployee();
      case "Update Employee Role":
        return updateEmployeeRole();
      case "Cancel":
        console.log("Bye!");
        return optionRequest();
    }
  });
};

const tableDisplayDepartment = async () => {
  try {
    const table = await db.query(inputs.department);
    console.table(table);
    return optionRequest();
  } catch (err) {
    console.log(err);
  }
};

const addDepartment = () => {
  inquirer.prompt(requests.addDepartment).then(async (addDepartmentInput) => {
    const newDept = addDepartmentInput.name;
    try {
      await db.query(inputs.newDepartment, newDept);
      return optionRequest();
    } catch (err) {
      console.log(err);
    }
  });
};

const tableDisplayRoles = async () => {
  try {
    const table = await db.query(inputs.roles);
    console.table(table);
  } catch (err) {
    console.log(err);
  }
};

const addRole = async () => {
  try {
    const departmentTable = await db.query(inputs.department);
    let departmentArray = departmentTable.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    requests.addRole.push(
      selectedOptionList(
        "Which department will this role belong to?",
        "department",
        departmentArray
      )
    );
  } catch (err) {
    console.log(err);
  }
  inquirer.prompt(requests.addRole).then(async (addRoleInput) => {
    const { title, salary, department } = addRoleInput;
    try {
      await db.query(inputs.newRole, [title, salary, department]);
      return optionRequest();
    } catch (err) {
      console.log(err);
    }
  });
};

const tableDisplayEmployee = async () => {
  try {
    const table = await db.query(inputs.employee);
    console.table(table);
  } catch (err) {
    console.log(err);
  }
  return optionRequest();
};

const addEmployee = () => {
  inquirer.prompt(requests.addEmployee).then(async (addEmployeeInput) => {
    const { first_name, last_name } = addEmployeeInput;
    try {
      await db.query(inputs.newEmployee, [first_name, last_name]);
      return optionRequest();
    } catch (err) {
      console.log(err);
    }
    return optionRequest();
  });
};

optionRequest();

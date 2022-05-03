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
  inquirer
  .prompt (requests.addDepartment)
  .then (async (addDepartmentInput)=>{
    const newDept = addDepartmentInput.name;
    try {
      await db.query(inputs.newDepartment, newDept);
      return optionRequest();
    } catch (err){
      console.log(err);
    }
  });
}

const tableDisplayEmployee = async () => {
  try {
    const table = await db.query(inputs.employee);
    console.table(table);
  } catch (err) {
    console.log(err);
  }
};

const tableDisplayRoles = async () => {
  try {
    const table = await db.query(inputs.roles);
    console.table(table);
  } catch (err) {
    console.log(err);
  }
};

optionRequest();

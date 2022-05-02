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
      case "Departments":
        return optionsDepartment();
      case "Cancel":
        console.log("Bye!");
        return optionRequest();
    }
  });
};

const optionsDepartment = () => {
  inquirer.prompt(requests.department).then((departmentInput) => {
    switch (departmentInput.action) {
      case "View Departments":
        return tableDisplayDepartment();
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
    } catch (err){
        console.log(err);
    }
};

optionRequest();

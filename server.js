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
    return optionRequest();
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
      return optionRequest();
    }
  });
};

const tableDisplayRoles = async () => {
  try {
    const table = await db.query(inputs.roles);
    console.table(table);
    return optionRequest();
  } catch (err) {
    console.log(err);
    return optionRequest();
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

const addEmployee = async () => {
  try {
    const roleTable = await db.query(inputs.roles);
    let roleArray = roleTable.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    requests.addEmployee.push(
      selectedOptionList(
        "Which role will the employee have?",
        "role",
        roleArray
      )
    );
  } catch (err) {
    console.log(err);
  }
  try {
    const managerTable = await db.query(inputs.employee);
    let managerArray = managerTable.map((employee) => ({
      name: employee.First + " " + employee.Last,
      value: employee.ID,
    }));
    requests.addEmployee.push(
      selectedOptionList(
        "Who will be the employee's manager?",
        "manager",
        managerArray
      )
    );
  } catch (err) {
    console.log(err);
  }
  inquirer.prompt(requests.addEmployee).then(async (addEmployeeInput) => {
    const { first_name, last_name, role, manager } = addEmployeeInput;
    try {
      await db.query(inputs.newEmployee, [first_name, last_name, role, manager]);
      return optionRequest();
    } catch (err) {
      console.log(err);
    }
    return optionRequest();
  });
};

const updateEmployeeRole = async () => {
  let updateEmployeePrompts = [];
  try {
    const employeeTable = await db.query(inputs.employee);
    let employeeArray = employeeTable.map((employee) => ({
      name: employee.First,
      value: employee.ID,
    }));
    updateEmployeePrompts.push(
      selectedOptionList(
        "Which employee will you be updating?",
        "employee",
        employeeArray
      )
    );
  } catch (err) {
    console.log(err);
  }
  try {
    const roleTable = await db.query(inputs.roles);
    let roleArray = roleTable.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    updateEmployeePrompts.push(
      selectedOptionList(
        "Which role will the employee now have?",
        "role",
        roleArray
      )
    );
  } catch (err) {
    console.log(err);
  }
  inquirer
    .prompt(updateEmployeePrompts)
    .then(async (updateEmployeePromptsResponse) => {
      const { employee, role } = updateEmployeePromptsResponse;
      try {
        await db.query(inputs.updateEmployee("role"), [role, employee]);
        return optionRequest();
      } catch (err) {
        console.log(err);
        return optionRequest();
      }
    });
};

optionRequest();

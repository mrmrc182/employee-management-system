const inputs = {
    department:
    `SELECT * from department ORDER BY id ASC`,
    newDepartment:
    `INSERT INTO department (name) VALUES (?)`,
    roles:
    `SELECT * from role ORDER BY id ASC`,
    newRole:
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    employee:
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`,
    newEmployee:
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    updateEmployee: 
    `UPDATE employee SET role_id = (?), manager_id = (?) WHERE id = (?)`,
}

module.exports = inputs;




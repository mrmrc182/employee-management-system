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
    `SELECT * from employee ORDER BY id ASC`,
    newEmployee:
    `INSERT INTO employee (first_name, last_name) VALUES (?, ?)`
}

module.exports = inputs;
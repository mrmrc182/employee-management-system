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
    `SELECT employee.id AS ID, first_name AS First, last_name AS Last, role.title AS Title, department.name AS Dept, role.salary AS Salary FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id ORDER BY last_name ASC;`,
    newEmployee:
    `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`,
    updateEmployee: (role) => { 
    return `UPDATE employee SET ${role}_id = (?) WHERE id= (?)`
    }
}

module.exports = inputs;
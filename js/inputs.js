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
    `SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, role.title AS Title, department.name AS Dept, role.salary AS Salary, employee.manager_id AS Manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    ORDER BY employee.last_name ASC;`,
    newEmployee:
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    updateEmployee: (role) => { 
    return `UPDATE employee SET ${role}_id = (?) WHERE id= (?)`
    }
}

module.exports = inputs;

// JOIN employee AS manager ON employee.manager_id = employee.id


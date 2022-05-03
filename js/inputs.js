const inputs = {
    department:
    `SELECT * from department ORDER BY id ASC`,
    newDepartment:
    `INSERT INTO department (name) VALUES (?)`,
    employee:
    `SELECT * from employee ORDER BY id ASC`,
    roles:
    `SELECT * from role ORDER BY id ASC`
}

module.exports = inputs;
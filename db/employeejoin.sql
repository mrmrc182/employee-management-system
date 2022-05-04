source schema.sql;
source seeds.sql;

SELECT last_name, first_name, employee.id, role.title, role.salary, department.name AS dept FROM employee JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id ORDER BY last_name ASC;

-- Basic JOIN template (Joins will often need to be more complex working with more than two tables at times.)
-- SELECT <columns>
-- FROM <left_table>
-- JOIN <right_table>
-- ON <left_table>.<column> = <right_table>.<column>;
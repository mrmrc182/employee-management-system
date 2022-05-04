INSERT INTO department (name)
VALUES  ("Legal"),
        ("Finance"),
        ("Human Resources"),
        ("Security"),
        ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES  ("HR Manager", 80000, 3),
        ("HR Assistant", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Bryan", "Garris", 1),
        ("Ian", "Curtis", 2),
        ("Johnny", "Rocket", 1),
        ("Jesse", "Pinkman", 2);
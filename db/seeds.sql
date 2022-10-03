INSERT INTO department (dept_name)
VALUES ('Sales'),
        ('HR'),
        ('Marketing');

INSERT INTO roles (title,salary,dept_id) VALUES
    ('Salesperson',55000,1),
    ('HR Rep',65000,2),
    ('Marketer',50000,3);

INSERT INTO employee (first_name,last_name,role_id) VALUES
    ('John','Smith',1);
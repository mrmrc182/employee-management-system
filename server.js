const express = require("express");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password123!@#',
    database: 'employees_db'
});
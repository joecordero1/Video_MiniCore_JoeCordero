// api/students.js
const express = require('express');
const serverless = require('serverless-http');
const router = express.Router();

const app = express();

class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

const students_db = [
    new Student(17072, "Paula Polisinlinker"),
    new Student(17075, "Daniel Cardenas"),
    new Student(17078, "Nico Herbas"),
    new Student(17081, "Galo Hernandez"),
    new Student(17290, "Poli Linker"),
];

// Ruta para obtener todos los estudiantes
router.get('/', (req, res) => {
    res.json(students_db);
});

// Exporta el router para usar en index.js
module.exports = router;


import express from 'express';
import bodyParser from 'body-parser';


/**
 * Express application instance.
 * @type {import('express').Express}
 */
const app = express();
app.use(bodyParser.json());


/**
 * Represents a student.
 * @class
 */
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

/**
 * Represents a note for a student's grade.
 * @class
 */
class Note {
    constructor(student_id, grade, date) {
        this.student_id = student_id;
        this.grade = grade;
        this.date = new Date(date);
    }
}

/**
 * Represents a period of time with a start date, end date, and weight.
 * @class
 */
class Period {
    constructor(dateA, dateB, weight) {
        this.dateA = new Date(dateA);
        this.dateB = new Date(dateB);
        this.weight = weight;
    }
}

const students_db = [
    new Student(17072, "Paula Polisinlinker"),
    new Student(17075, "Daniel Cardenas"),
    new Student(17078, "Nico Herbas"),
    new Student(17081, "Galo Hernandez"),
    new Student(17290, "Poli Linker"),
];


const notes_db = [
    new Note(17072, 10, '2024-01-15'),
    new Note(17072, 10, '2024-02-20'),
    new Note(17072, 10, '2024-03-05'),
    new Note(17072, 10, '2024-04-10'),
    new Note(17072, 10, '2024-05-15'),
    new Note(17072, 10, '2024-06-20'),
    new Note(17072, 9, '2024-07-05'),
    new Note(17072, 10, '2024-08-10'),
    new Note(17072, 10, '2024-09-15'),
    new Note(17072, 10, '2024-10-20'),
    new Note(17072, 9, '2024-11-05'),
    new Note(17072, 10, '2024-12-10'),

    new Note(17075, 5, '2024-01-05'),
    new Note(17075, 6, '2024-02-10'),
    new Note(17075, 9, '2024-03-15'),
    new Note(17075, 7, '2024-04-20'),
    new Note(17075, 8, '2024-05-05'),
    new Note(17075, 1, '2024-06-10'),
    new Note(17075, 9, '2024-07-15'),
    new Note(17075, 8, '2024-08-20'),
    new Note(17075, 9, '2024-09-05'),
    new Note(17075, 6, '2024-10-10'),
    new Note(17075, 8, '2024-11-15'),
    new Note(17075, 9, '2024-12-20'),

    new Note(17078, 7, '2024-01-15'),
    new Note(17078, 4, '2024-02-20'),
    new Note(17078, 8, '2024-03-25'),
    new Note(17078, 9, '2024-04-05'),
    new Note(17078, 5, '2023-05-10'),
    new Note(17078, 7, '2024-06-15'),
    new Note(17078, 4, '2024-07-20'),
    new Note(17078, 8, '2024-08-25'),
    new Note(17078, 4, '2024-09-05'),
    new Note(17078, 5, '2024-10-10'),
    new Note(17078, 7, '2024-11-15'),
    new Note(17078, 4, '2024-12-20'),

    new Note(17081, 9, '2024-01-05'),
    new Note(17081, 1, '2024-02-10'),
    new Note(17081, 7, '2024-03-15'),
    new Note(17081, 9, '2024-04-20'),
    new Note(17081, 5, '2024-05-25'),
    new Note(17081, 7, '2024-06-05'),
    new Note(17081, 6, '2024-07-10'),
    new Note(17081, 5, '2024-08-15'),
    new Note(17081, 7, '2024-09-20'),
    new Note(17081, 9, '2024-10-25'),
    new Note(17081, 5, '2024-11-05'),
    new Note(17081, 10, '2024-12-10'),

    new Note(17290, 10, '2024-01-15'),
    new Note(17290, 10, '2024-02-20'),
    new Note(17290, 10, '2024-03-25'),
    new Note(17290, 10, '2024-04-05'),
    new Note(17290, 10, '2024-05-10'),
    new Note(17290, 10, '2024-06-15'),
    new Note(17290, 10, '2024-07-20'),
    new Note(17290, 10, '2024-08-25'),
    new Note(17290, 10, '2024-09-05'),
    new Note(17290, 10, '2024-10-10'),
    new Note(17290, 10, '2024-11-15'),
    new Note(17290, 10, '2024-12-20'),
];


/**
 * Retrieves a student from the database based on their ID.
 * @param {number} student_id - The ID of the student to retrieve.
 * @returns {object|undefined} - The student object if found, otherwise undefined.
 */
function getStudent(student_id) {
    return students_db.find(student => student.id === student_id);
}

/**
 * Computes the grades for each student based on the given periods.
 * 
 * @param {Array} periods - An array of period objects containing date ranges and weights.
 * @returns {Object} - An object containing the final grades for each student.
 * @throws {Error} - If the date range is invalid or the weights are invalid.
 */
function computeGrades(periods) {
    if (periods.some(p => p.dateA > p.dateB)) {
        throw new Error("Invalid date range");
    }

    if (periods.reduce((acc, p) => acc + p.weight, 0) >= 1) {
        throw new Error("Invalid weights");
    }

    let finalGrades = {};

    periods.forEach(period => {
        notes_db.forEach(note => {
            if (note.date >= period.dateA && note.date <= period.dateB) {
                if (!finalGrades[note.student_id]) {
                    finalGrades[note.student_id] = { total: 0, count: 0 };
                }

                finalGrades[note.student_id].total += note.grade * period.weight;
                finalGrades[note.student_id].count += period.weight;
            }
        });
    });

    for (let studentId in finalGrades) {
        let student = getStudent(parseInt(studentId));
        let gradeData = finalGrades[studentId];
        let average = gradeData.total / gradeData.count;

        finalGrades[studentId] = {
            name: student.name,
            grade: average,
            needed: average < 6 ? 6 - average : 0
        };
    }

    return finalGrades;
}

// Routes
app.post('/compute', (req, res) => {
    try {
        const periodRequests = req.body.map(p => new Period(p.dateA, p.dateB, p.weight));
        const result = computeGrades(periodRequests);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/students', (req, res) => {
    try {
        res.json(students_db);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Init server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Init server on  http://localhost:${PORT}`);
});

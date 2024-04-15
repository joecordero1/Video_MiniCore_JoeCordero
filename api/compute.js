// api/compute.js
const serverless = require('serverless-http');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

class Note {
    constructor(student_id, grade, date) {
        this.student_id = student_id;
        this.grade = grade;
        this.date = new Date(date);
    }
}

class Period {
    constructor(dateA, dateB, weight) {
        this.dateA = new Date(dateA);
        this.dateB = new Date(dateB);
        this.weight = weight;
    }
}

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

function computeGrades(periodRequests) {
    const periods = periodRequests.map(p => new Period(p.dateA, p.dateB, p.weight));
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
        let gradeData = finalGrades[studentId];
        let average = gradeData.total / gradeData.count;

        finalGrades[studentId] = {
            grade: average,
            needed: average < 6 ? 6 - average : 0
        };
    }

    return finalGrades;
}
// Define el endpoint de tu API para el cálculo de notas
router.post('/', (req, res) => {
    try {
      const result = computeGrades(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Error calculating grades" });
    }
  });

app.post('/compute', (req, res) => {
    try {
        const result = computeGrades(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: "Error calculating grades" });
    }
});
module.exports = router;

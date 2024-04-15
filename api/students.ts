import serverless from 'serverless-http';
import express, { Request, Response } from 'express';

const app = express();

class Student {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

const students_db: Student[] = [
    new Student(17072, "Paula Polisinlinker"),
    new Student(17075, "Daniel Cardenas"),
    new Student(17078, "Nico Herbas"),
    new Student(17081, "Galo Hernandez"),
    new Student(17290, "Poli Linker"),
];

app.get('/students', (req: Request, res: Response) => {
    res.json(students_db);
});

export default serverless(app);
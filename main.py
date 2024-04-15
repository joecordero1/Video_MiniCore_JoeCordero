from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime
import uvicorn
from os import environ
from pydantic import BaseModel, confloat
from datetime import datetime


class Period(BaseModel):
    """
    Represents a period of time with start and end dates.

    Attributes:
        dateA (datetime): The start date of the period.
        dateB (datetime): The end date of the period.
        weight (float): The weight of the period, ranging from 0 to 1.
    """
    dateA: datetime
    dateB: datetime
    weight: confloat(ge=0, le=1)


class PeriodRequest(BaseModel):
    """
    Represents a period request.

    Attributes:
        dateA (str): The start date of the period.
        dateB (str): The end date of the period.
        weight (float): The weight of the period.
    """
    dateA: str
    dateB: str
    weight: float


class Note(BaseModel):
    """
    Represents a note for a student's grade.

    Attributes:
        student_id (int): The ID of the student.
        grade (float): The grade received by the student.
        date (datetime): The date when the grade was recorded.
    """
    student_id: int
    grade: confloat(ge=0, le=10)
    date: datetime


class Student(BaseModel):
    """
    Represents a student.

    Attributes:
        id (int): The unique identifier of the student.
        name (str): The name of the student.
    """
    id: int
    name: str


students_db = [
    Student(id=17072, name="Paula Polisinlinker"),
    Student(id=17075, name="Daniel Cardenas"),
    Student(id=17078, name="Nico Herbas"),
    Student(id=17081, name="Galo Hernandez"),
    Student(id=17290, name="Poli Linker"),
]


notes_db = [
    Note(student_id=17072, grade=10, date=datetime(2024, 1, 15)),
    Note(student_id=17072, grade=10, date=datetime(2024, 2, 20)),
    Note(student_id=17072, grade=10, date=datetime(2024, 3, 5)),
    Note(student_id=17072, grade=10, date=datetime(2024, 4, 10)),
    Note(student_id=17072, grade=10, date=datetime(2024, 5, 15)),
    Note(student_id=17072, grade=10, date=datetime(2024, 6, 20)),
    Note(student_id=17072, grade=9, date=datetime(2024, 7, 5)),
    Note(student_id=17072, grade=10, date=datetime(2024, 8, 10)),
    Note(student_id=17072, grade=10, date=datetime(2024, 9, 15)),
    Note(student_id=17072, grade=10, date=datetime(2024, 10, 20)),
    Note(student_id=17072, grade=9, date=datetime(2024, 11, 5)),
    Note(student_id=17072, grade=10, date=datetime(2024, 12, 10)),

    Note(student_id=17075, grade=5, date=datetime(2024, 1, 5)),
    Note(student_id=17075, grade=6, date=datetime(2024, 2, 10)),
    Note(student_id=17075, grade=9, date=datetime(2024, 3, 15)),
    Note(student_id=17075, grade=7, date=datetime(2024, 4, 20)),
    Note(student_id=17075, grade=8, date=datetime(2024, 5, 5)),
    Note(student_id=17075, grade=1, date=datetime(2024, 6, 10)),
    Note(student_id=17075, grade=9, date=datetime(2024, 7, 15)),
    Note(student_id=17075, grade=8, date=datetime(2024, 8, 20)),
    Note(student_id=17075, grade=9, date=datetime(2024, 9, 5)),
    Note(student_id=17075, grade=6, date=datetime(2024, 10, 10)),
    Note(student_id=17075, grade=8, date=datetime(2024, 11, 15)),
    Note(student_id=17075, grade=9, date=datetime(2024, 12, 20)),

    Note(student_id=17078, grade=7, date=datetime(2024, 1, 15)),
    Note(student_id=17078, grade=4, date=datetime(2024, 2, 20)),
    Note(student_id=17078, grade=8, date=datetime(2024, 3, 25)),
    Note(student_id=17078, grade=9, date=datetime(2024, 4, 5)),
    Note(student_id=17078, grade=5, date=datetime(2023, 5, 10)),
    Note(student_id=17078, grade=7, date=datetime(2024, 6, 15)),
    Note(student_id=17078, grade=4, date=datetime(2024, 7, 20)),
    Note(student_id=17078, grade=8, date=datetime(2024, 8, 25)),
    Note(student_id=17078, grade=4, date=datetime(2024, 9, 5)),
    Note(student_id=17078, grade=5, date=datetime(2024, 10, 10)),
    Note(student_id=17078, grade=7, date=datetime(2024, 11, 15)),
    Note(student_id=17078, grade=4, date=datetime(2024, 12, 20)),

    Note(student_id=17081, grade=9, date=datetime(2024, 1, 5)),
    Note(student_id=17081, grade=1, date=datetime(2024, 2, 10)),
    Note(student_id=17081, grade=7, date=datetime(2024, 3, 15)),
    Note(student_id=17081, grade=9, date=datetime(2024, 4, 20)),
    Note(student_id=17081, grade=5, date=datetime(2024, 5, 25)),
    Note(student_id=17081, grade=7, date=datetime(2024, 6, 5)),
    Note(student_id=17081, grade=6, date=datetime(2024, 7, 10)),
    Note(student_id=17081, grade=5, date=datetime(2024, 8, 15)),
    Note(student_id=17081, grade=7, date=datetime(2024, 9, 20)),
    Note(student_id=17081, grade=9, date=datetime(2024, 10, 25)),
    Note(student_id=17081, grade=5, date=datetime(2024, 11, 5)),
    Note(student_id=17081, grade=10, date=datetime(2024, 12, 10)),

    Note(student_id=17290, grade=10, date=datetime(2024, 1, 15)),
    Note(student_id=17290, grade=10, date=datetime(2024, 2, 20)),
    Note(student_id=17290, grade=10, date=datetime(2024, 3, 25)),
    Note(student_id=17290, grade=10, date=datetime(2024, 4, 5)),
    Note(student_id=17290, grade=10, date=datetime(2024, 5, 10)),
    Note(student_id=17290, grade=10, date=datetime(2024, 6, 15)),
    Note(student_id=17290, grade=10, date=datetime(2024, 7, 20)),
    Note(student_id=17290, grade=10, date=datetime(2024, 8, 25)),
    Note(student_id=17290, grade=10, date=datetime(2024, 9, 5)),
    Note(student_id=17290, grade=10, date=datetime(2024, 10, 10)),
    Note(student_id=17290, grade=10, date=datetime(2024, 11, 15)),
    Note(student_id=17290, grade=10, date=datetime(2024, 12, 20)),
]


def get_student(student_id: int):
    for student in students_db:
        if student.id == student_id:
            return student
    return None


def compute_grades(periods: List[Period]):
    try:
        p1, p2 = periods

        if p1.dateA > p1.dateB or p1.dateB > p2.dateA or p2.dateA > p2.dateB:
            raise HTTPException(status_code=400, detail="Invalid date range")

        if p1.weight + p2.weight >= 1 or p1.weight < 0 or p2.weight < 0:
            raise HTTPException(status_code=400, detail="Invalid weights")
        
        notes = notes_db
        students = students_db

        # get all the notes for each period for each student
        notes_p1 = []
        notes_p2 = []

        for note in notes:
            if p1.dateA <= note.date <= p1.dateB:
                notes_p1.append(note)
            elif p2.dateA <= note.date <= p2.dateB:
                notes_p2.append(note)
        
        # get the average for each student
        average_p1 = {}
        average_p2 = {}

        if len(notes_p1) == 0 or len(notes_p2) == 0:
            raise HTTPException(status_code=400, detail="No notes in the specified range")

        for note in notes_p1:
            if note.student_id in average_p1:
                average_p1[note.student_id].append(note.grade)
            else:
                average_p1[note.student_id] = [note.grade]

        for note in notes_p2:
            if note.student_id in average_p2:
                average_p2[note.student_id].append(note.grade)
            else:
                average_p2[note.student_id] = [note.grade]
        
        for student in students:
            if student.id not in average_p1:
                average_p1[student.id] = []
            if student.id not in average_p2:
                average_p2[student.id] = []

        # compute the average for each student
        for student_id, grades in average_p1.items():
            average_p1[student_id] = sum(grades) / len(grades)

        for student_id, grades in average_p2.items():
            average_p2[student_id] = sum(grades) / len(grades)
        
        # compute the final grade for each student
        final_grades = {}

        for student_id in average_p1:

            grade = average_p1[student_id] * p1.weight + average_p2[student_id] * p2.weight,

            final_grades[student_id] = {
                "name": get_student(student_id).name ,
                "grade": grade,

                "p1": average_p1[student_id],
                "p2": average_p2[student_id],

                "p1_weight": p1.weight,
                "p2_weight": p2.weight,

                "needed": 6 - grade[0] if grade[0] < 6 else 0,
            }

        return final_grades
    except:
        raise HTTPException(status_code=400, detail=f"Invalid request,{periods}")


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/compute")
def read_student(request: List[PeriodRequest]):
    try:
        

        periods = []

        for period_data in request:
            date_a = datetime.strptime(period_data.dateA, "%Y-%m-%d")
            date_b = datetime.strptime(period_data.dateB, "%Y-%m-%d")

            period = Period(dateA=date_a, dateB=date_b, weight=period_data.weight)
            periods.append(period)

        res = compute_grades(periods)

        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.get("/students")
def read_students():
    return students_db


if __name__ == "__main__":
    port = int(environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

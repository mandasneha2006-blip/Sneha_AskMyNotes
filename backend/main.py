from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS so React can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (or use "http://localhost:5173")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for Student payload
class Student(BaseModel):
    name: str
    marks: int

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/calculate")
def calculate(student: Student):
    marks = student.marks

    # Determine Grade
    if marks >= 90:
        grade = "A+"
    elif marks >= 70:
        grade = "B"
    elif marks >= 60:
        grade = "C"
    elif marks >= 50:
        grade = "D"
    else:
        grade = "F"

    # Determine Pass/Fail
    if marks >= 40:
        result = "Pass"
    else:
        result = "Fail"

    return {
        "name": student.name,
        "marks": marks,
        "grade": grade,
        "result": result
    }
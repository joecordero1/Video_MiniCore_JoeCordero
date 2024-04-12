import React, { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";

interface Input {
    dateA: string | number; // Fix: Allow both string and number values
    dateB: string | number; // Fix: Allow both string and number values
    weight: string | number; // Fix: Allow both string and number values
}

interface StudentData {
    name: string;
    grade: number[];
    p1: number;
    p2: number;
    p1_weight: number;
    p2_weight: number;
    needed: number;
}

interface ResponseData {
    [studentID: string]: StudentData;
}

const App: React.FC = () => {
    const [inputs, setInputs] = useState<Input[]>([
        { dateA: "", dateB: "", weight: 0 },
        { dateA: "", dateB: "", weight: 0 },
    ]);

    const [responseData, setResponseData] = useState<ResponseData | null>(null);

    const handleInputChange = (
        index: number,
        field: keyof Input,
        value: string | number
    ) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://mini-core-grades-back.vercel.app/compute",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inputs),
                }
            );

            if (!response.ok) {
                throw new Error("Error in API request");
            }

            const data: ResponseData = await response.json();
            setResponseData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="container">
                <h1>Compute Grades</h1>
                <span>By Washington Yandun</span>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="input-center">
                        {inputs.map((input, index) => (
                            <div className="input-group" key={index}>
                                <label htmlFor={`dateA${index}`}>
                                    Start Date:
                                </label>
                                <input
                                    type="date"
                                    id={`dateA${index}`}
                                    value={input.dateA}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleInputChange(
                                            index,
                                            "dateA",
                                            e.target.value
                                        )
                                    }
                                />
                                <label htmlFor={`dateB${index}`}>
                                    Final Date:
                                </label>
                                <input
                                    type="date"
                                    id={`dateB${index}`}
                                    value={input.dateB}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleInputChange(
                                            index,
                                            "dateB",
                                            e.target.value
                                        )
                                    }
                                />
                                <label htmlFor={`weight${index}`}>
                                    Weight (0-1):
                                </label>
                                <input
                                    type="number"
                                    id={`weight${index}`}
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={input.weight}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        handleInputChange(
                                            index,
                                            "weight",
                                            e.target.valueAsNumber
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <div className="send">
                        <button type="submit">Compute</button>
                    </div>
                </form>
            </div>

            {responseData && (
                <div className="response-container">
                    <h2>Response Data:</h2>
                    <table className="response-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th>P1</th>
                                <th>P2</th>
                                <th>Needed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(responseData).map(
                                ([studentID, studentData]) => (
                                    <tr key={studentID}>
                                        <td>{studentID}</td>
                                        <td>{studentData.name}</td>
                                        <td>{studentData.grade[0]}</td>
                                        <td>{studentData.p1}</td>
                                        <td>{studentData.p2}</td>
                                        <td>{studentData.needed}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default App;

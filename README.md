# Mini Core Grades

## Overview

This repository contains a simple web application for computing grades based on defined periods. The application consists of a Node backend for handling grade computations and a React frontend for user interaction.

## Features

-   **Grade Computation:** Compute grades for students based on specified periods and weights.

-   **User Interface:** A clean and intuitive user interface built with React for an easy user experience.
-   **API Integration:** Seamless integration with the Node backend for efficient grade calculations.

## Backend (Node)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/WashingtonYandun/MiniCore_Grades.git
    ```

2. Install dependencies:

    ```bash
    cd server/
    npm i
    ```

### Usage

1. Run the Node server:

    ```bash
    npm run dev
    ```

The server will be available at `http://localhost:8000`. Ensure the server is running before using the frontend.

## Frontend (React)

### Installation

1. Navigate to the frontend directory:

    ```bash
    cd client/
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Usage

1. Start the React development server:

    ```bash
    npm start
    ```

Open your browser and go to `http://localhost:3000` to use the application.

## How to Use

Enter the start date, end date, and weight for each period in the form.
Click the `"Compute"` button to send the request to the backend.
View the computed grades, including the overall grade, individual period grades, and the needed grade to achieve a passing score.

# bhareth — VVERTEX Smart Examination Timetable Scheduler

VVERTEX turns student subject registrations into a conflict graph and creates a conflict-free examination session plan using vertex-coloring heuristics. It is a browser-based project built with HTML, CSS, and native JavaScript modules.

## Project objectives

- Model each subject as a graph vertex and connect subjects that share at least one registered student.
- Apply graph-coloring algorithms to assign non-conflicting subjects to the same examination session.
- Make the registration data, graph, algorithms, and resulting schedule understandable through an interactive dashboard.

## Features

- Dashboard metrics derived from the current registration data and latest verified coloring.
- Add, edit, search, filter, and remove student registrations; view the subject catalog and enrollment counts.
- Import registrations from CSV with column checks, row validation, preview, and clear feedback.
- Load the supplied project dataset (20 student records) or enter registrations manually.
- Build and inspect an interactive subject-conflict graph with slot colors, node details, and zoom.
- Generate an examination timetable, verify it against every graph edge, filter it, print it, and export it as CSV.
- Compare algorithm color counts and measured runtimes; export current scheduling metrics as a CSV report.
- General graph-coloring workspace, responsive navigation, and light/dark themes.

## Graph model and algorithms

Every distinct registered subject is a vertex. An undirected edge joins two subjects when at least one student is registered for both. A valid coloring assigns different colors to the endpoints of every edge; each color class becomes one examination session.

- **Greedy Coloring** visits vertices in input order and assigns the first available color.
- **Welsh–Powell** orders vertices by descending degree, then greedily assigns colors.
- **DSATUR** repeatedly selects the uncolored vertex with the greatest number of distinct neighboring colors, breaking ties by degree.

These are heuristics, so their valid colorings are not guaranteed to use the minimum possible number of sessions. VVERTEX verifies generated colorings against all conflict edges. The timetable currently represents numbered sessions; it does not assign calendar dates or times.

## Technologies

- HTML5 and CSS3, including responsive layouts and theme variables
- Vanilla JavaScript with ES modules
- Node.js built-in HTTP server for local preview
- Node.js built-in test runner (`node --test`)

No third-party runtime dependencies are required.

## Project structure

```text
index.html          Dashboard and application views
styles.css          Responsive interface and themes
server.js           Local static-file server
js/app.js           Application state, rendering, and interactions
js/graph.js         Conflict graph construction and graph validation
js/coloring.js      Greedy, Welsh–Powell, and DSATUR algorithms
js/validation.js    Registration validation and CSV parsing
js/project-data.js  Supplied project registration dataset
js/general-mode.js  General graph input state
tests/graph.test.js Automated graph, algorithm, and CSV tests
```

## Install and run locally

Install Node.js 18 or newer, then run these commands from the project directory:

```sh
npm start
```

Open [http://localhost:8000](http://localhost:8000). The server reads `PORT` and `HOST` environment variables; by default it listens on port `8000` and host `0.0.0.0` for local or cloud preview use.

Run the automated tests with:

```sh
npm test
```

## Registration CSV format

CSV files must include `student_id` and `subject_codes` columns. One student goes on each row; separate multiple subject codes with commas inside a quoted field:

```csv
student_id,subject_codes
STU001,"CS101, MA102, PH103"
```

Header aliases include `student`, `id`, `registration_no` for student IDs and `subjects`, `courses`, `course_codes` for subject codes. Accepted subject codes are 2–5 uppercase letters followed by 2–4 digits (such as `CS101`) or 2 digits + 2–5 uppercase letters + 3–4 digits (such as `25CS2304`). Missing values, malformed codes, and duplicate student-course registrations are rejected.

## Screenshots

Screenshots are not included in the repository yet. Add captures of the dashboard, conflict graph, and timetable to a `screenshots/` directory and link them here when available.

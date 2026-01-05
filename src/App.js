import React, { useState } from 'react';
import './App.css';

// Default data
const defaultStudents = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
  'Frank'
];

const defaultJobs = [
  'Line Leader',
  'Door Holder',
  'Paper Passer',
  'Board Eraser',
  'Attendance Helper',
  'Librarian'
];

function App() {
  const [students, setStudents] = useState(defaultStudents);
  const [jobs, setJobs] = useState(defaultJobs);
  const [assignments, setAssignments] = useState([]);
  const [newStudent, setNewStudent] = useState('');
  const [newJob, setNewJob] = useState('');
  const [autoRotate, setAutoRotate] = useState(true);

  // Add a new student
  const addStudent = () => {
    if (newStudent.trim()) {
      setStudents([...students, newStudent.trim()]);
      setNewStudent('');
    }
  };

  // Remove a student
  const removeStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    // Clear assignments to avoid stale data
    setAssignments([]);
  };

  // Add a new job
  const addJob = () => {
    if (newJob.trim()) {
      setJobs([...jobs, newJob.trim()]);
      setNewJob('');
    }
  };

  // Remove a job
  const removeJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    // Clear assignments to avoid stale data
    setAssignments([]);
  };

  // Assign jobs to students
  const assignJobs = () => {
    const newAssignments = [];
    const minLength = Math.min(students.length, jobs.length);
    
    for (let i = 0; i < minLength; i++) {
      newAssignments.push({
        student: students[i],
        job: jobs[i]
      });
    }
    
    setAssignments(newAssignments);
  };

  // Rotate jobs (move first student to end)
  const rotateJobs = () => {
    if (students.length > 0) {
      const rotatedStudents = [...students.slice(1), students[0]];
      setStudents(rotatedStudents);
      if (autoRotate && assignments.length > 0) {
        // Create assignments with rotated students immediately
        const newAssignments = [];
        const minLength = Math.min(rotatedStudents.length, jobs.length);
        for (let i = 0; i < minLength; i++) {
          newAssignments.push({
            student: rotatedStudents[i],
            job: jobs[i]
          });
        }
        setAssignments(newAssignments);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Classroom Job Manager</h1>
      </header>
      
      <div className="container">
        <div className="section">
          <h2>Students</h2>
          <div className="input-group">
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addStudent()}
              placeholder="Add new student"
            />
            <button onClick={addStudent}>Add Student</button>
          </div>
          <ul className="list">
            {students.map((student, index) => (
              <li key={index}>
                {student}
                <button onClick={() => removeStudent(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Jobs</h2>
          <div className="input-group">
            <input
              type="text"
              value={newJob}
              onChange={(e) => setNewJob(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addJob()}
              placeholder="Add new job"
            />
            <button onClick={addJob}>Add Job</button>
          </div>
          <ul className="list">
            {jobs.map((job, index) => (
              <li key={index}>
                {job}
                <button onClick={() => removeJob(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="section full-width">
          <h2>Job Assignments</h2>
          <div className="controls">
            <button className="primary" onClick={assignJobs}>
              Assign Jobs
            </button>
            <button className="secondary" onClick={rotateJobs}>
              Rotate Jobs
            </button>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
              />
              Auto-rotate on rotation
            </label>
          </div>
          {assignments.length > 0 ? (
            <div className="assignments">
              {assignments.map((assignment, index) => (
                <div key={index} className="assignment-card">
                  <div className="student-name">{assignment.student}</div>
                  <div className="arrow">→</div>
                  <div className="job-name">{assignment.job}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-assignments">
              Click "Assign Jobs" to create assignments
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

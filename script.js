// Default students list
const defaultStudents = [
    'Silver Bergman',
    'Harper Bruring',
    'Finn Dieringer',
    'Maggie Fictum',
    'John Gooch',
    'Elias Hefti',
    'Micah Hemling',
    'Riley Judson',
    'Finnegan Leitch',
    'Delaney Scheberl',
    'Briley Simon',
    'Greta Smith',
    'Jackson Staebell',
    'Oliver Dieringer',
    'Aidan Fictum',
    'Holly Fictum',
    'Lincoln Kohlwey',
    'Abby Lentz',
    'Faith Marohn',
    'Blake Nixdorf',
    'Julia Rust',
    'Adin Schultz',
    'Naomi Smith',
    'Reese Staebell'
];

// DOM Elements
const studentsInput = document.getElementById('students-input');
const jobsInput = document.getElementById('jobs-input');
const assignBtn = document.getElementById('assign-btn');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const studentCount = document.getElementById('student-count');
const jobCount = document.getElementById('job-count');
const resultsSection = document.getElementById('results-section');
const assignmentsList = document.getElementById('assignments-list');
const errorMessage = document.getElementById('error-message');

// Event Listeners
studentsInput.addEventListener('input', updateCounts);
jobsInput.addEventListener('input', updateCounts);
assignBtn.addEventListener('click', assignJobs);
clearBtn.addEventListener('click', clearAll);
saveBtn.addEventListener('click', saveAssignments);

// Load saved data on page load
window.addEventListener('load', loadSavedData);

// Update student and job counts
function updateCounts() {
    const students = getInputList(studentsInput.value);
    const jobs = getInputList(jobsInput.value);
    
    studentCount.textContent = `${students.length} student${students.length !== 1 ? 's' : ''}`;
    jobCount.textContent = `${jobs.length} job${jobs.length !== 1 ? 's' : ''}`;
}

// Parse input text into array
function getInputList(text) {
    return text
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Assign jobs to students
function assignJobs() {
    // Hide previous error messages
    errorMessage.style.display = 'none';
    
    const students = getInputList(studentsInput.value);
    const jobs = getInputList(jobsInput.value);
    
    // Validation
    if (students.length === 0) {
        showError('Please enter at least one student name.');
        return;
    }
    
    if (jobs.length === 0) {
        showError('Please enter at least one job.');
        return;
    }
    
    // Shuffle students for random assignment
    const shuffledStudents = shuffleArray(students);
    
    // Create assignments
    const assignments = [];
    const unassignedStudents = [];
    const unassignedJobs = [];
    
    // Assign jobs to students (one job per student)
    const minLength = Math.min(students.length, jobs.length);
    
    for (let i = 0; i < minLength; i++) {
        assignments.push({
            student: shuffledStudents[i],
            job: jobs[i]
        });
    }
    
    // Track unassigned students or jobs
    if (students.length > jobs.length) {
        for (let i = jobs.length; i < students.length; i++) {
            unassignedStudents.push(shuffledStudents[i]);
        }
    } else if (jobs.length > students.length) {
        for (let i = students.length; i < jobs.length; i++) {
            unassignedJobs.push(jobs[i]);
        }
    }
    
    // Display assignments
    displayAssignments(assignments, unassignedStudents, unassignedJobs);
}

// Display assignments in the UI
function displayAssignments(assignments, unassignedStudents, unassignedJobs) {
    assignmentsList.innerHTML = '';
    
    // Show assigned jobs
    assignments.forEach(assignment => {
        const card = document.createElement('div');
        card.className = 'assignment-card';
        card.innerHTML = `
            <span class="student-name">${escapeHtml(assignment.student)}</span>
            <span class="job-name">→ ${escapeHtml(assignment.job)}</span>
        `;
        assignmentsList.appendChild(card);
    });
    
    // Show unassigned students if any
    if (unassignedStudents.length > 0) {
        const unassignedSection = document.createElement('div');
        unassignedSection.className = 'unassigned-section';
        unassignedSection.innerHTML = `
            <h3>⚠️ Students Without Jobs</h3>
            <ul class="unassigned-list">
                ${unassignedStudents.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
            </ul>
        `;
        assignmentsList.appendChild(unassignedSection);
    }
    
    // Show unassigned jobs if any
    if (unassignedJobs.length > 0) {
        const unassignedSection = document.createElement('div');
        unassignedSection.className = 'unassigned-section';
        unassignedSection.innerHTML = `
            <h3>⚠️ Jobs Without Students</h3>
            <ul class="unassigned-list">
                ${unassignedJobs.map(j => `<li>${escapeHtml(j)}</li>`).join('')}
            </ul>
        `;
        assignmentsList.appendChild(unassignedSection);
    }
    
    resultsSection.style.display = 'block';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    resultsSection.style.display = 'none';
}

// Clear all inputs and results
function clearAll() {
    if (confirm('Are you sure you want to clear all data?')) {
        studentsInput.value = '';
        jobsInput.value = '';
        resultsSection.style.display = 'none';
        errorMessage.style.display = 'none';
        updateCounts();
        localStorage.removeItem('classroomJobsData');
    }
}

// Save assignments to localStorage
function saveAssignments() {
    const data = {
        students: studentsInput.value,
        jobs: jobsInput.value,
        lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem('classroomJobsData', JSON.stringify(data));
    
    // Show confirmation
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✓ Saved!';
    saveBtn.style.background = '#4CAF50';
    saveBtn.style.color = 'white';
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
        saveBtn.style.color = '';
    }, 2000);
}

// Load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('classroomJobsData');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            studentsInput.value = data.students || '';
            jobsInput.value = data.jobs || '';
            updateCounts();
        } catch (e) {
            console.error('Error loading saved data:', e);
            // Load default students on error
            studentsInput.value = defaultStudents.join('\n');
            updateCounts();
        }
    } else {
        // Load default students if no saved data
        studentsInput.value = defaultStudents.join('\n');
        updateCounts();
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

# 🎓 Classroom Job Selector

A simple web application that randomly assigns classroom jobs to students. Perfect for teachers who want a fair and automated way to distribute classroom responsibilities.

## Features

- 📝 Easy input for students and jobs (one per line)
- 🎲 Random assignment algorithm using Fisher-Yates shuffle
- 📊 Visual display of assignments
- ⚠️ Alerts for unassigned students or jobs
- 💾 Auto-save functionality using browser localStorage
- 📱 Responsive design that works on desktop and mobile
- 🎨 Beautiful, modern UI with gradient theme

## How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or server required!

2. **Enter Students**
   - Type student names in the left text area
   - Enter one name per line
   - Example:
     ```
     Alice
     Bob
     Charlie
     Diana
     ```

3. **Enter Jobs**
   - Type job names in the right text area
   - Enter one job per line
   - Example:
     ```
     Line Leader
     Door Holder
     Paper Passer
     Board Eraser
     ```

4. **Assign Jobs**
   - Click the "🎲 Assign Jobs Randomly" button
   - The app will randomly match students to jobs
   - Each student gets one job
   - If there are more students than jobs (or vice versa), unassigned items will be shown

5. **Save Your Setup**
   - Click "💾 Save Assignments" to save your student and job lists
   - Data is stored in your browser and will be loaded automatically next time

6. **Start Fresh**
   - Click "🗑️ Clear All" to remove all data and start over

## Technical Details

- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **No Dependencies**: No frameworks or libraries required
- **Browser Compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Storage**: Uses localStorage API for data persistence
- **Algorithm**: Fisher-Yates shuffle for fair randomization
- **Security**: XSS protection through HTML escaping

## Files

- `index.html` - Main application page
- `styles.css` - Styling and responsive design
- `script.js` - Application logic and randomization

## Privacy

All data is stored locally in your browser. No information is sent to any server or third party.

## License

This project is open source and available for educational use.
# 🎓 Classroom Job Selector

A simple web application that randomly assigns classroom jobs to students. Perfect for teachers who want a fair and automated way to distribute classroom responsibilities.

## Features

- 📝 Easy input for students and jobs (one per line)
- 🎲 Random assignment algorithm using Fisher-Yates shuffle
- 📊 Visual display of assignments
- ⚠️ Alerts for unassigned students or jobs
- 💾 Auto-save functionality using browser localStorage
- 📱 Responsive design that works on desktop and mobile
- 🎨 Beautiful, modern UI with blue gradient theme (#0095DA)
- 📺 TV Display Mode with 4x4 grid layout for classroom projection
- 🖼️ **Iframe embeddable** - can be embedded in any website

## How to Use

### Development Mode

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```
   - Opens on port 5173
   - Hot reload enabled
   - Navigate to http://localhost:5173

### Production Build

```bash
npm run build
```
- Outputs to `dist/` directory
- Optimized for production
- Ready for deployment

### Using the Application

1. **Enter Students**
   - Type student names in the left text area
   - Enter one name per line
   - Example:
     ```
     Alice
     Bob
     Charlie
     Diana
     ```

2. **Enter Jobs**
   - Type job names in the right text area
   - Enter one job per line
   - Example:
     ```
     Line Leader
     Door Holder
     Paper Passer
     Board Eraser
     ```

3. **Assign Jobs**
   - Click the "🎲 Assign Jobs Randomly" button
   - The app will randomly match students to jobs
   - Each student gets one job
   - If there are more students than jobs (or vice versa), unassigned items will be shown

4. **Save Your Setup**
   - Click "💾 Save Assignments" to save your student and job lists
   - Data is stored in your browser and will be loaded automatically next time

5. **Start Fresh**
   - Click "🗑️ Clear All" to remove all data and start over

6. **TV Display Mode**
   - Click "📺 TV Display Mode" to show assignments in a 4x4 grid
   - Perfect for displaying on a classroom TV or projector
   - Press ESC or click "✕ Exit TV Mode" to return

## Deployment

### Optidev Platform

This project is configured for deployment on Optidev with:
- ✅ Vite build system outputting to `dist/`
- ✅ Dev server on port 5173 with `strictPort: true`
- ✅ `server.host: true` in vite.config
- ✅ `X-Frame-Options: ALLOWALL` header for preview
- ✅ Static SPA (no SSR)

## Embedding in Your Website

The Classroom Job Selector can be embedded in any website using an iframe:

```html
<iframe 
    src="https://your-domain.com/index.html" 
    width="100%" 
    height="800" 
    frameborder="0"
    title="Classroom Job Selector"
    allow="clipboard-write"
></iframe>
```

**Features when embedded:**
- ✅ Fully functional job assignment system
- ✅ Responsive layout adapts to iframe size
- ✅ TV Display Mode works within iframe
- ✅ LocalStorage persists data between sessions
- ✅ All interactive features preserved

See `iframe-demo.html` for a complete embedding example with multiple size options.

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
- `iframe-demo.html` - Example showing how to embed the app in an iframe

## Privacy

All data is stored locally in your browser. No information is sent to any server or third party.

## License

This project is open source and available for educational use.
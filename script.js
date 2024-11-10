// Adding code for some new features: theme switching, code suggestions, and basic version control.

// Initialize an object to store code versions
let codeVersions = [];
let currentTheme = 'dark';
const themes = {
    dark: 'ace/theme/monokai',
    light: 'ace/theme/github',
    highContrast: 'ace/theme/twilight',
    custom: 'ace/theme/chrome'
};

// Add new button elements in HTML for theme and version control
document.body.insertAdjacentHTML('beforeend', `
    <button id="saveVersionButton">Save Version</button>
    <button id="showVersionsButton">Show Versions</button>
    <select id="themeSelector">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="highContrast">High Contrast</option>
        <option value="custom">Custom</option>
    </select>
`);

// Theme selector functionality
document.getElementById('themeSelector').addEventListener('change', (event) => {
    currentTheme = event.target.value;
    editor.setTheme(themes[currentTheme]);
});

// Version control - Save current code
document.getElementById('saveVersionButton').addEventListener('click', () => {
    const code = editor.getValue();
    const date = new Date().toLocaleString();
    codeVersions.push({ date, code });
    alert(`Version saved: ${date}`);
});

// Show previous code versions
document.getElementById('showVersionsButton').addEventListener('click', () => {
    if (codeVersions.length === 0) {
        alert('No saved versions available');
        return;
    }
    const versions = codeVersions.map((v, index) => `${index + 1}: ${v.date}`).join('\n');
    const versionIndex = prompt(`Saved versions:\n${versions}\nEnter version number to load:`) - 1;
    if (versionIndex >= 0 && versionIndex < codeVersions.length) {
        editor.setValue(codeVersions[versionIndex].code);
    }
});

// Basic code suggestions
const codeSuggestions = {
    'html': ['<!DOCTYPE html>', '<html>', '<head>', '<body>', '<h1>', '<p>', '<a href="#">Link</a>', '</html>', '</body>'],
    'css': ['color', 'background', 'margin', 'padding', 'border', 'font-size', 'text-align'],
    'javascript': ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'console.log']
};

function showSuggestions(language) {
    const suggestions = codeSuggestions[language];
    if (suggestions) {
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        alert(`Suggestion: ${randomSuggestion}`);
    }
}

// Show a suggestion every 30 seconds
setInterval(() => {
    const language = document.getElementById('languageSelector').value;
    showSuggestions(language);
}, 30000);  // 30 seconds

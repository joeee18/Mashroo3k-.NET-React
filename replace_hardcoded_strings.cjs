const fs = require('fs');
const path = require('path');

// Load the hardcoded report
const hardcodedReport = JSON.parse(fs.readFileSync('translations/hardcoded_report.json', 'utf8'));

// Load the translation keys to find matches
const enTranslations = JSON.parse(fs.readFileSync('translations/en.json', 'utf8'));
const newEnKeys = JSON.parse(fs.readFileSync('translations/i18n_new_keys_en.json', 'utf8'));

// Function to flatten nested objects into a single level object with dot notation keys
function flattenObject(obj, prefix = '') {
    const flattened = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(flattened, flattenObject(obj[key], fullKey));
            } else {
                flattened[fullKey] = obj[key];
            }
        }
    }

    return flattened;
}

// Flatten both translation objects
const flattenedEnTranslations = flattenObject(enTranslations);
const flattenedNewEnKeys = flattenObject(newEnKeys);

// Create a reverse lookup map from English text to translation key
const textToKeyMap = {};

// Add existing translations
for (const key in flattenedEnTranslations) {
    if (flattenedEnTranslations.hasOwnProperty(key)) {
        textToKeyMap[flattenedEnTranslations[key]] = key;
    }
}

// Add new keys
for (const key in flattenedNewEnKeys) {
    if (flattenedNewEnKeys.hasOwnProperty(key)) {
        textToKeyMap[flattenedNewEnKeys[key]] = key;
    }
}

// Group the hardcoded strings by file
const filesToProcess = {};

hardcodedReport.forEach(item => {
    if (!filesToProcess[item.file]) {
        filesToProcess[item.file] = [];
    }
    filesToProcess[item.file].push(item);
});

// Counter for tracking replacements
let totalReplacements = 0;
const filesModified = new Set();

// Process each file
for (const relativeFilePath in filesToProcess) {
    if (filesToProcess.hasOwnProperty(relativeFilePath)) {
        const fullPath = path.join('.', relativeFilePath);

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            console.log(`File not found: ${fullPath}`);
            continue;
        }

        // Read the file content
        let fileContent = fs.readFileSync(fullPath, 'utf8');
        let fileModified = false;

        // Get all strings to replace for this file
        const stringsToReplace = filesToProcess[relativeFilePath];

        // Sort by line number descending to avoid line number shifts when replacing
        stringsToReplace.sort((a, b) => b.line - a.line);

        // Process each string
        for (const item of stringsToReplace) {
            const originalText = item.text;
            const escapedOriginalText = originalText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

            // Determine the replacement based on file extension
            let replacementPrefix, replacementSuffix;
            const ext = path.extname(relativeFilePath).toLowerCase();

            if (ext === '.cs' || ext === '.cshtml' || ext === '.razor') {
                replacementPrefix = '_localizer["';
                replacementSuffix = '"]';
            } else if (ext === '.tsx' || ext === '.jsx' || ext === '.ts' || ext === '.js') {
                replacementPrefix = 't("';
                replacementSuffix = '")';
            } else {
                console.log(`Unsupported file type: ${relativeFilePath}`);
                continue;
            }

            // Find the translation key for this text
            let translationKey = textToKeyMap[originalText];

            // If no key found, we would normally generate one, but for this script,
            // we'll just skip it since we're focusing on existing keys
            if (!translationKey) {
                console.log(`No translation key found for: "${originalText}" in ${relativeFilePath}:${item.line}`);
                continue;
            }

            // Create the replacement string
            const replacement = replacementPrefix + translationKey + replacementSuffix;

            // Replace the text in the file content
            // We need to be careful with the replacement to ensure we match exactly
            const regex = new RegExp(`"${escapedOriginalText}"`, 'g');
            const newContent = fileContent.replace(regex, `"${replacement}"`);

            // Check if replacement was made
            if (newContent !== fileContent) {
                fileContent = newContent;
                fileModified = true;
                totalReplacements++;
                console.log(`Replaced "${originalText}" with "${replacement}" in ${relativeFilePath}`);
            }
        }

        // Write the file back if it was modified
        if (fileModified) {
            fs.writeFileSync(fullPath, fileContent, 'utf8');
            filesModified.add(relativeFilePath);
            console.log(`Modified file: ${relativeFilePath}`);
        }
    }
}

console.log(`\nReplacement Summary:`);
console.log(`Total replacements: ${totalReplacements}`);
console.log(`Files modified: ${filesModified.size}`);
console.log(`Files: ${Array.from(filesModified).join(', ')}`);
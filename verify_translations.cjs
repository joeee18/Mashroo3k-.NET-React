const fs = require('fs');
const path = require('path');

// Function to get all files with specific extensions recursively
function getAllFiles(dirPath, arrayOfFiles, fileTypes) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(file => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            // Skip excluded directories
            if (!filePath.includes('node_modules') &&
                !filePath.includes('bin') &&
                !filePath.includes('obj') &&
                !filePath.includes('dist') &&
                !filePath.includes('.git')) {
                arrayOfFiles = getAllFiles(filePath, arrayOfFiles, fileTypes);
            }
        } else {
            // Check if file matches one of the specified types
            const ext = path.extname(file).toLowerCase();
            if (fileTypes.includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}

// Function to check if a string is inside a translation function
function isInsideTranslationFunction(line) {
    // Check for translation function patterns
    const translationPatterns = [
        /t\([^)]*\)/,                    // t("...")
        /\$t\([^)]*\)/,                  // $t("...")
        /i18n\.t\([^)]*\)/,              // i18n.t("...")
        /_localizer\[[^\]]*\]/,          // _localizer["..."]
        /Localizer\[[^\]]*\]/,           // Localizer["..."]
        /Resources\.[^.]*\./,            // Resources.*.
        /nameof\([^)]*\)/,               // nameof()
        /typeof\([^)]*\)/,               // typeof()
        /exception/i,                    // exception messages
        /log\([^)]*\)/i,                 // logging messages
        /console\.[^(]*\([^)]*\)/i,      // console.log/warn/error
        /href=|src=|url\(/i,             // URLs
        /key=|id=|name=|className=/i,    // attributes
        /import\s|from\s|require\(/i,    // import/require statements
        /\/\/|\/\*/                      // comments
    ];

    return translationPatterns.some(pattern => pattern.test(line));
}

// Function to extract string literals from a line
function extractStringLiterals(line) {
    const stringLiterals = [];
    let inString = false;
    let stringStart = -1;
    let quoteChar = '';
    let escaped = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (!inString) {
            // Check for start of string
            if ((char === '"' || char === "'" || char === '`') && !escaped) {
                inString = true;
                stringStart = i;
                quoteChar = char;
            }
        } else {
            // Check for end of string
            if (char === quoteChar && !escaped) {
                inString = false;
                const stringContent = line.substring(stringStart + 1, i);
                // Only include strings longer than 2 characters that look like user-facing text
                if (stringContent.length > 2 &&
                    !/^[0-9\s]*$/.test(stringContent) &&  // Not just numbers/spaces
                    !/^[A-Z_]+$/.test(stringContent) &&   // Not constants like URL_PATH
                    !/^[a-z]+:\/\/|^www\./.test(stringContent) && // Not URLs
                    !/^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/.test(stringContent)) { // Not property paths
                    stringLiterals.push({
                        content: stringContent,
                        start: stringStart,
                        end: i
                    });
                }
            }
        }

        // Handle escape characters
        escaped = (char === '\\' && !escaped);
    }

    return stringLiterals;
}

// Function to generate translation key name based on file path
function generateTranslationKey(filePath, lineContent) {
    // Get relative path from project root
    const relativePath = path.relative('.', filePath);

    // Get file name without extension
    const fileName = path.basename(filePath, path.extname(filePath));

    // Create a simple hash of the line content
    let hash = 0;
    for (let i = 0; i < lineContent.length; i++) {
        const char = lineContent.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert to positive hex string
    const shortHash = Math.abs(hash).toString(16).substring(0, 8);

    // Create key in the format: auto.<fileName>.<shortHash>
    return `auto.${fileName}.${shortHash}`;
}

// Main verification function
function verifyTranslations() {
    // Define file types to scan
    const frontendTypes = ['.tsx', '.ts', '.jsx', '.js'];
    const backendTypes = ['.cs', '.cshtml', '.razor'];

    // Get all relevant files
    const frontendFiles = getAllFiles('.', [], frontendTypes);
    const backendFiles = getAllFiles('.', [], backendTypes);

    console.log(`Found ${frontendFiles.length} frontend files and ${backendFiles.length} backend files to scan.`);

    const untranslatedItems = [];

    // Process frontend files
    frontendFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');

            lines.forEach((line, lineIndex) => {
                // Skip empty lines or lines that are clearly not user-facing
                if (line.trim().length === 0 ||
                    line.trim().startsWith('//') ||
                    line.trim().startsWith('/*') ||
                    line.trim().startsWith('*') ||
                    isInsideTranslationFunction(line)) {
                    return;
                }

                // Extract string literals from the line
                const stringLiterals = extractStringLiterals(line);

                stringLiterals.forEach(literal => {
                    // Check if this string is already inside a translation function
                    if (!isInsideTranslationFunction(line)) {
                        untranslatedItems.push({
                            file: path.relative('.', filePath),
                            line: lineIndex + 1,
                            text: literal.content,
                            suggestedKey: generateTranslationKey(filePath, literal.content)
                        });
                    }
                });
            });
        } catch (error) {
            console.log(`Error reading file ${filePath}: ${error.message}`);
        }
    });

    // Process backend files
    backendFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');

            lines.forEach((line, lineIndex) => {
                // Skip empty lines or lines that are clearly not user-facing
                if (line.trim().length === 0 ||
                    line.trim().startsWith('//') ||
                    line.trim().startsWith('/*') ||
                    line.trim().startsWith('*') ||
                    line.includes('_localizer[') ||
                    line.includes('Localizer[') ||
                    line.includes('Resources.') ||
                    line.includes('nameof(') ||
                    line.includes('typeof(')) {
                    return;
                }

                // Extract string literals from the line
                const stringLiterals = extractStringLiterals(line);

                stringLiterals.forEach(literal => {
                    // For backend files, we're looking for strings that should use _localizer
                    if (!line.includes('_localizer[') && !line.includes('Localizer[')) {
                        untranslatedItems.push({
                            file: path.relative('.', filePath),
                            line: lineIndex + 1,
                            text: literal.content,
                            suggestedKey: generateTranslationKey(filePath, literal.content)
                        });
                    }
                });
            });
        } catch (error) {
            console.log(`Error reading file ${filePath}: ${error.message}`);
        }
    });

    // Generate report
    let reportData;
    if (untranslatedItems.length === 0) {
        reportData = { status: "No untranslated user text remains." };
    } else {
        reportData = untranslatedItems;
    }

    // Write report to file
    fs.writeFileSync('translations/untranslated_remaining.json', JSON.stringify(reportData, null, 2));

    console.log(`\nVerification complete. Found ${untranslatedItems.length} potential untranslated strings.`);
    console.log(`Report saved to translations/untranslated_remaining.json`);

    // Show summary
    if (untranslatedItems.length > 0) {
        console.log('\nTop 10 untranslated strings:');
        untranslatedItems.slice(0, 10).forEach(item => {
            console.log(`  ${item.file}:${item.line} - "${item.text}" -> ${item.suggestedKey}`);
        });
    }
}

// Run verification
verifyTranslations();
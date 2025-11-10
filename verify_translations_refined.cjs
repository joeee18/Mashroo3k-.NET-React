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

// Function to check if a string is inside a translation function or should be excluded
function shouldExcludeString(line, stringContent) {
    // Check for translation function patterns and other exclusions
    const exclusionPatterns = [
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
        /\/\/|\/\*/,                     // comments
        /import\s|from\s|require\(/i,    // import/require statements
        /class\s|extends\s|implements\s/i, // class declarations
        /interface\s|type\s/i,           // TypeScript types
        /function\s|const\s|let\s|var\s/i, // variable/function declarations
        /[A-Z][a-zA-Z0-9]*\.[A-Z][A-Z_0-9]*/, // Constants like SomeClass.SOME_CONSTANT
        /[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/,  // Property paths like obj.property
        /[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/,  // Paths like route/path
        /https?:\/\/|www\./,             // URLs
        /application\/json|text\/html|Content-Type/, // HTTP headers
        /[0-9]+px|[0-9]+%|[0-9]+em/,     // CSS units
        /#[a-fA-F0-9]{3,6}/,             // Hex colors
        /true|false|null|undefined/,     // Boolean/null values
        /^[A-Z_][A-Z0-9_]+$/,            // Constants like URL_PATH
        /^[a-z]+-[a-z-]+$/,              // CSS classes like text-center
        /^[a-z]+:[a-z]+$/,               // CSS properties like color:red
        /^[0-9\s]+$/,                    // Numbers and spaces
        /^[\w-]+$/,                      // Simple words or CSS classes
        /{[^}]*}/                        // Template literals with variables
    ];

    // Check if the line contains any exclusion patterns
    const hasExclusionPattern = exclusionPatterns.some(pattern => pattern.test(line));

    // Additional checks for the specific string content
    const isTechnicalString =
        stringContent.length <= 2 ||                           // Very short strings
        /^[0-9\s]*$/.test(stringContent) ||                    // Just numbers/spaces
        /^[A-Z_][A-Z0-9_]+$/.test(stringContent) ||            // Constants like URL_PATH
        /^[a-z]+-[a-z-]+$/.test(stringContent) ||              // CSS classes like text-center
        /^[a-z]+:[a-z]+$/.test(stringContent) ||               // CSS properties like color:red
        /^[0-9]+px|[0-9]+%|[0-9]+em$/.test(stringContent) ||   // CSS units
        /https?:\/\/|www\./.test(stringContent) ||             // URLs
        /#[a-fA-F0-9]{3,6}/.test(stringContent) ||             // Hex colors
        /[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/.test(stringContent) ||  // Property paths
        /[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/.test(stringContent) ||  // Paths
        /{[^}]*}/.test(stringContent);                         // Template variables

    return hasExclusionPattern || isTechnicalString;
}

// Function to extract string literals from a line and filter for user-facing text
function extractUserFacingStrings(line, lineNumber, filePath) {
    const userFacingStrings = [];
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

                // Check if this string should be considered user-facing
                if (!shouldExcludeString(line, stringContent)) {
                    userFacingStrings.push({
                        content: stringContent,
                        line: lineNumber,
                        file: filePath
                    });
                }
            }
        }

        // Handle escape characters
        escaped = (char === '\\' && !escaped);
    }

    return userFacingStrings;
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
                if (line.trim().length === 0) {
                    return;
                }

                // Extract user-facing strings from the line
                const userFacingStrings = extractUserFacingStrings(line, lineIndex + 1, filePath);

                userFacingStrings.forEach(stringInfo => {
                    // Check if this string is already inside a translation function
                    if (!line.includes('t(') && !line.includes('$t(') && !line.includes('i18n.t(')) {
                        untranslatedItems.push({
                            file: path.relative('.', filePath),
                            line: stringInfo.line,
                            text: stringInfo.content,
                            suggestedKey: generateTranslationKey(filePath, stringInfo.content)
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
                if (line.trim().length === 0) {
                    return;
                }

                // Extract user-facing strings from the line
                const userFacingStrings = extractUserFacingStrings(line, lineIndex + 1, filePath);

                userFacingStrings.forEach(stringInfo => {
                    // For backend files, we're looking for strings that should use _localizer
                    if (!line.includes('_localizer[') && !line.includes('Localizer[')) {
                        untranslatedItems.push({
                            file: path.relative('.', filePath),
                            line: stringInfo.line,
                            text: stringInfo.content,
                            suggestedKey: generateTranslationKey(filePath, stringInfo.content)
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
        // Remove duplicates
        const uniqueItems = [];
        const seen = new Set();

        untranslatedItems.forEach(item => {
            const key = `${item.file}:${item.line}:${item.text}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueItems.push(item);
            }
        });

        reportData = uniqueItems;
    }

    // Write report to file
    fs.writeFileSync('translations/untranslated_remaining.json', JSON.stringify(reportData, null, 2));

    console.log(`\nVerification complete. Found ${reportData.length} potential untranslated strings.`);
    console.log(`Report saved to translations/untranslated_remaining.json`);

    // Show summary
    if (reportData.length > 0 && reportData.length !== 1) {
        console.log('\nTop 10 untranslated strings:');
        reportData.slice(0, 10).forEach(item => {
            console.log(`  ${item.file}:${item.line} - "${item.text}" -> ${item.suggestedKey}`);
        });
    }
}

// Run verification
verifyTranslations();
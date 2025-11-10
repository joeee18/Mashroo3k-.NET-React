const fs = require('fs');

// Load the existing translation files
const enTranslations = JSON.parse(fs.readFileSync('translations/en.json', 'utf8'));
const arTranslations = JSON.parse(fs.readFileSync('translations/ar.json', 'utf8'));

// Load the new keys files
const newEnKeys = JSON.parse(fs.readFileSync('translations/i18n_new_keys_en.json', 'utf8'));
const newArKeys = JSON.parse(fs.readFileSync('translations/i18n_new_keys_ar.json', 'utf8'));

// Function to merge objects recursively
function deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                // If both target and source have this key as an object, merge them recursively
                if (result.hasOwnProperty(key) && typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])) {
                    result[key] = deepMerge(result[key], source[key]);
                } else {
                    // Otherwise, just assign the source object
                    result[key] = source[key];
                }
            } else {
                // For non-object values, just assign
                result[key] = source[key];
            }
        }
    }

    return result;
}

// Merge the new keys into existing translations
const mergedEnTranslations = deepMerge(enTranslations, newEnKeys);
const mergedArTranslations = deepMerge(arTranslations, newArKeys);

// Write the merged files back
fs.writeFileSync('translations/en.json', JSON.stringify(mergedEnTranslations, null, 2), 'utf8');
fs.writeFileSync('translations/ar.json', JSON.stringify(mergedArTranslations, null, 2), 'utf8');

console.log('Translation files merged successfully!');
console.log(`English keys: ${Object.keys(newEnKeys).length} new keys added`);
console.log(`Arabic keys: ${Object.keys(newArKeys).length} new keys added`);
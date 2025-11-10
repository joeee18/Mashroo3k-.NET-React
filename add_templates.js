// Script to add the 10 new AI analysis templates
// Run this script using Node.js after starting the backend server

const API_BASE = 'https://localhost:7143'; // Change if your backend runs on a different port

async function createTemplate(templateData) {
    try {
        const response = await fetch(`${API_BASE}/api/templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(templateData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create template: ${response.status} ${errorText}`);
        }

        const template = await response.json();
        console.log(`Created template: ${template.name} (ID: ${template.id})`);
        return template.id;
    } catch (error) {
        console.error(`Error creating template "${templateData.name}":`, error.message);
        return null;
    }
}

async function createTemplateField(fieldData) {
    try {
        const response = await fetch(`${API_BASE}/api/templatefields`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create field: ${response.status} ${errorText}`);
        }

        const field = await response.json();
        console.log(`  Created field: ${field.label} (ID: ${field.id})`);
        return field.id;
    } catch (error) {
        console.error(`  Error creating field "${fieldData.label}":`, error.message);
        return null;
    }
}

async function main() {
    console.log('Adding 10 new AI analysis templates...\n');

    // Template 1: t("auto.add_templates.c10a6f9d")
    const template1Id = await createTemplate({
        name: 't("auto.add_templates.c10a6f9d")',
        description: 't("auto.add_templates.341baaf8")',
        category: 't("auto.add_templates.51ce077b")',
        duration: 25,
        isPopular: true
    });

    // Template 2: t("auto.add_templates.e4dc7e8c")
    const template2Id = await createTemplate({
        name: 't("auto.add_templates.e4dc7e8c")',
        description: 't("auto.add_templates.a05629f0")',
        category: 'SWOT & PESTEL',
        duration: 30,
        isPopular: true
    });

    // Template 3: Building the t("auto.add_templates.7cb15e41") Plan
    const template3Id = await createTemplate({
        name: 'Building the t("auto.add_templates.7cb15e41") Plan',
        description: 't("auto.add_templates.e50be642")',
        category: 't("auto.add_templates.7cb15e41")',
        duration: 20,
        isPopular: false
    });

    // Template 4: t("auto.add_templates.35f15607") Performance Assessment
    const template4Id = await createTemplate({
        name: 't("auto.add_templates.35f15607") Performance Assessment',
        description: 't("auto.add_templates.ebbe09d1")',
        category: 't("auto.add_templates.35f15607")',
        duration: 20,
        isPopular: false
    });

    // Template 5: Assessing t("auto.add_templates.699aed86") Readiness
    const template5Id = await createTemplate({
        name: 'Assessing t("auto.add_templates.699aed86") Readiness',
        description: 't("auto.add_templates.9e2bd18d")',
        category: 't("auto.add_templates.699aed86")',
        duration: 25,
        isPopular: false
    });

    // Template 6: t("auto.add_templates.341d1d54")
    const template6Id = await createTemplate({
        name: 't("auto.add_templates.341d1d54")',
        description: 't("auto.add_templates.dd606b87")',
        category: 't("auto.add_templates.341d1d54")',
        duration: 20,
        isPopular: false
    });

    // Template 7: AI Business t("auto.add_templates.9583dd0b")
    const template7Id = await createTemplate({
        name: 'AI Business t("auto.add_templates.9583dd0b")',
        description: 't("auto.add_templates.0e409094")',
        category: 't("auto.add_templates.9583dd0b")',
        duration: 15,
        isPopular: false
    });

    // Template 8: t("auto.add_templates.0bb83092") Maturity Assessment
    const template8Id = await createTemplate({
        name: 't("auto.add_templates.0bb83092") Maturity Assessment',
        description: 't("auto.add_templates.99c57dee")',
        category: 't("auto.add_templates.0bb83092")',
        duration: 25,
        isPopular: false
    });

    // Template 9: AI t("auto.add_templates.7ad75512") Generator
    const template9Id = await createTemplate({
        name: 'AI t("auto.add_templates.7ad75512") Generator',
        description: 't("auto.add_templates.ab3ebb31")',
        category: 't("auto.add_templates.7ad75512")',
        duration: 30,
        isPopular: true
    });

    // Template 10: AI-Based t("auto.add_templates.176d74bf") Analyzer
    const template10Id = await createTemplate({
        name: 'AI-Based t("auto.add_templates.176d74bf") Analyzer',
        description: 't("auto.add_templates.9910f2a8")',
        category: 't("auto.add_templates.176d74bf")',
        duration: 25,
        isPopular: false
    });

    console.log('\nTemplate creation completed. Template fields need to be added manually through the developer interface.');
    console.log('The following templates were created:');
    console.log(`1. t("auto.add_templates.c10a6f9d") (ID: ${template1Id})`);
    console.log(`2. t("auto.add_templates.e4dc7e8c") (ID: ${template2Id})`);
    console.log(`3. Building the t("auto.add_templates.7cb15e41") Plan (ID: ${template3Id})`);
    console.log(`4. t("auto.add_templates.35f15607") Performance Assessment (ID: ${template4Id})`);
    console.log(`5. Assessing t("auto.add_templates.699aed86") Readiness (ID: ${template5Id})`);
    console.log(`6. t("auto.add_templates.341d1d54") (ID: ${template6Id})`);
    console.log(`7. AI Business t("auto.add_templates.9583dd0b") (ID: ${template7Id})`);
    console.log(`8. t("auto.add_templates.0bb83092") Maturity Assessment (ID: ${template8Id})`);
    console.log(`9. AI t("auto.add_templates.7ad75512") Generator (ID: ${template9Id})`);
    console.log(`10. AI-Based t("auto.add_templates.176d74bf") Analyzer (ID: ${template10Id})`);
}

// Run the script
main().catch(console.error);
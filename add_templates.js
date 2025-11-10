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

    // Template 1: AI Business Idea Validator
    const template1Id = await createTemplate({
        name: 'AI Business Idea Validator',
        description: 'Validate your business idea with AI-powered analysis covering core concept, financial hypotheses, feasibility, market validation, and critical assumptions.',
        category: 'Business Validation',
        duration: 25,
        isPopular: true
    });

    // Template 2: AI-Powered SWOT & PESTEL Builder
    const template2Id = await createTemplate({
        name: 'AI-Powered SWOT & PESTEL Builder',
        description: 'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths, weaknesses, opportunities, threats, and external factors.',
        category: 'SWOT & PESTEL',
        duration: 30,
        isPopular: true
    });

    // Template 3: Building the Marketing Plan
    const template3Id = await createTemplate({
        name: 'Building the Marketing Plan',
        description: 'Create a comprehensive marketing plan with target audience definition, budget allocation, channels, USP, and KPIs.',
        category: 'Marketing',
        duration: 20,
        isPopular: false
    });

    // Template 4: Financial Performance Assessment
    const template4Id = await createTemplate({
        name: 'Financial Performance Assessment',
        description: 'Evaluate your financial health with detailed analysis of revenue, costs, profits, and advanced financial metrics.',
        category: 'Financial',
        duration: 20,
        isPopular: false
    });

    // Template 5: Assessing Growth Readiness
    const template5Id = await createTemplate({
        name: 'Assessing Growth Readiness',
        description: 'Determine your business readiness for growth with operational efficiency, leadership, scalability, and financial runway analysis.',
        category: 'Growth',
        duration: 25,
        isPopular: false
    });

    // Template 6: Gap Analysis
    const template6Id = await createTemplate({
        name: 'Gap Analysis',
        description: 'Identify gaps between your current state and future goals with financial baselines, operational capabilities, and market position analysis.',
        category: 'Gap Analysis',
        duration: 20,
        isPopular: false
    });

    // Template 7: AI Business Health Check
    const template7Id = await createTemplate({
        name: 'AI Business Health Check',
        description: 'Comprehensive health check of your business covering identity, financial indicators, operational efficiency, market relationships, and business vitals.',
        category: 'Health Check',
        duration: 15,
        isPopular: false
    });

    // Template 8: Digital Maturity Assessment
    const template8Id = await createTemplate({
        name: 'Digital Maturity Assessment',
        description: 'Assess your digital maturity across identity, investment, tools, engagement, and dimensions of digital capability.',
        category: 'Digital',
        duration: 25,
        isPopular: false
    });

    // Template 9: AI Pitch Deck Generator
    const template9Id = await createTemplate({
        name: 'AI Pitch Deck Generator',
        description: 'Create a compelling pitch deck with core idea, financial model, product details, competitive landscape, and team information.',
        category: 'Pitch Deck',
        duration: 30,
        isPopular: true
    });

    // Template 10: AI-Based Market Opportunity Analyzer
    const template10Id = await createTemplate({
        name: 'AI-Based Market Opportunity Analyzer',
        description: 'Analyze market opportunities with company identity, financial capacity, core competencies, strategic posture, and market evaluation.',
        category: 'Market Opportunity',
        duration: 25,
        isPopular: false
    });

    console.log('\nTemplate creation completed. Template fields need to be added manually through the developer interface.');
    console.log('The following templates were created:');
    console.log(`1. AI Business Idea Validator (ID: ${template1Id})`);
    console.log(`2. AI-Powered SWOT & PESTEL Builder (ID: ${template2Id})`);
    console.log(`3. Building the Marketing Plan (ID: ${template3Id})`);
    console.log(`4. Financial Performance Assessment (ID: ${template4Id})`);
    console.log(`5. Assessing Growth Readiness (ID: ${template5Id})`);
    console.log(`6. Gap Analysis (ID: ${template6Id})`);
    console.log(`7. AI Business Health Check (ID: ${template7Id})`);
    console.log(`8. Digital Maturity Assessment (ID: ${template8Id})`);
    console.log(`9. AI Pitch Deck Generator (ID: ${template9Id})`);
    console.log(`10. AI-Based Market Opportunity Analyzer (ID: ${template10Id})`);
}

// Run the script
main().catch(console.error);
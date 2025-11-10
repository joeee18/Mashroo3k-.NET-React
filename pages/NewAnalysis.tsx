import React, { useState, useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Check, Save } from 'lucide-react';

import Step1_BasicInfo from '../components/analysis/Step1_BasicInfo';
import Step2_Financials from '../components/analysis/Step2_Financials';
import Step3_Operations from '../components/analysis/Step3_Operations';
import Step4_MarketStrategy from '../components/analysis/Step4_MarketStrategy';
import Step5_IndustrySpecific from '../components/analysis/Step5_IndustrySpecific';
import ConfirmationModal from '../components/analysis/ConfirmationModal';
import { getTemplateById } from '../services/templateService';

const NewAnalysis: React.FC = () => {
    const { t } = useLanguage();
    const { currentStep, prevStep, nextStep, goToStep, isStepComplete, formData, selectedTemplate } = useAnalysis();
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [templateData, setTemplateData] = useState<{ name: string; description: string } | null>(null);
    const [loading, setLoading] = useState(true);

    // Template name to translation key mapping
    const templateNameToKey: Record<string, string> = {
        'AI Business Idea Validator': 'developer.templateBuilder.aiBusinessValidator',
        'AI-Powered SWOT & PESTEL Builder': 'developer.templateBuilder.aiSwotBuilder',
        'AI Pitch Deck Generator': 'developer.templateBuilder.aiPitchDeckGenerator',
        'Building the Marketing Plan': 'developer.templateBuilder.buildingMarketingPlan',
        'Financial Performance Assessment': 'developer.templateBuilder.financialPerformanceAssessment',
        'Assessing Growth Readiness': 'developer.templateBuilder.assessingGrowthReadiness',
        'Gap Analysis': 'developer.templateBuilder.gapAnalysis',
        'AI Business Health Check': 'developer.templateBuilder.aiBusinessHealthCheck',
        'Digital Maturity Assessment': 'developer.templateBuilder.digitalMaturityAssessment',
        'AI-Based Market Opportunity Analyzer': 'developer.templateBuilder.aiMarketOpportunityAnalyzer'
    };

    // Template description to translation key mapping
    const templateDescToKey: Record<string, string> = {
        'Validate your business idea with AI-powered analysis covering core concept, financial hypotheses, feasibility, market validation, and critical assumptions.': 'developer.templateBuilder.aiBusinessValidatorDesc',
        'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths, weaknesses, opportunities, threats, and external factors.': 'developer.templateBuilder.aiSwotBuilderDesc',
        'Create a professional investor pitch deck with market analysis, financial projections, and business model.': 'developer.templateBuilder.aiPitchDeckGeneratorDesc',
        'Develop a comprehensive marketing strategy covering target audience, marketing channels, pricing techniques, and content plans.': 'developer.templateBuilder.buildingMarketingPlanDesc',
        'Comprehensive financial performance analysis to identify strengths, weaknesses, and operational efficiency improvements.': 'developer.templateBuilder.financialPerformanceAssessmentDesc',
        'Evaluate your organization\'s readiness for expansion focusing on infrastructure, resources, and strategies needed for growth.': 'developer.templateBuilder.assessingGrowthReadinessDesc',
        'Identify gaps between current performance and desired goals across all areas of your business.': 'developer.templateBuilder.gapAnalysisDesc',
        'Comprehensive business health check covering financial, operational, marketing, and organizational aspects.': 'developer.templateBuilder.aiBusinessHealthCheckDesc',
        'Assess your organization\'s readiness for digital transformation and adoption of modern technologies.': 'developer.templateBuilder.digitalMaturityAssessmentDesc',
        'Analyze potential market opportunities focusing on trends, market segmentation, market size, and competition.': 'developer.templateBuilder.aiMarketOpportunityAnalyzerDesc'
    };

    // Move steps array inside the component
    const steps = [
        { number: 1, name: t('templateBuilder.basicInfo') },
        { number: 2, name: t('templateBuilder.financialInfo') },
        { number: 3, name: t('templateBuilder.operationalInfo') },
        { number: 4, name: t('templateBuilder.marketInfo') },
        { number: 5, name: t('templateBuilder.industryInfo') },
    ];

    useEffect(() => {
        const fetchTemplateData = async () => {
            if (selectedTemplate) {
                try {
                    const templateId = parseInt(selectedTemplate, 10);
                    if (!isNaN(templateId)) {
                        const template = await getTemplateById(templateId);
                        setTemplateData({
                            name: templateNameToKey[template.name] ? t(templateNameToKey[template.name]) : template.name,
                            description: templateDescToKey[template.description] ? t(templateDescToKey[template.description]) : template.description
                        });
                    } else {
                        throw new Error('Invalid template ID');
                    }
                } catch (error) {
                    console.error('Failed to fetch template data:', error);
                    // Fallback to generic values
                    setTemplateData({
                        name: t('newAnalysis.title'),
                        description: t('newAnalysis.description')
                    });
                }
            }
            setLoading(false);
        };

        fetchTemplateData();
    }, [selectedTemplate]);

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1_BasicInfo />;
            case 2: return <Step2_Financials />;
            case 3: return <Step3_Operations />;
            case 4: return <Step4_MarketStrategy />;
            case 5: return <Step5_IndustrySpecific />;
            default: return <Step1_BasicInfo />;
        }
    };

    const handleSaveDraft = () => {
        localStorage.setItem('analysis_draft', JSON.stringify({
            formData,
            currentStep,
            lastSaved: new Date().toISOString()
        }));
        alert(t('newAnalysis.draftSaved'));
    };

    const handleGenerate = () => {
        // A real app would have robust validation here
        const allStepsValid = steps.every(step => isStepComplete(step.number));
        if (!allStepsValid) {
            alert(t('newAnalysis.completeAllFields'));
            // Optional: navigate to the first incomplete step
            const firstIncomplete = steps.find(step => !isStepComplete(step.number));
            if (firstIncomplete) goToStep(firstIncomplete.number);
            return;
        }
        setShowConfirmation(true);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    const currentTemplateName = templateData?.name || 'Business Analysis';
    const currentTemplateDescription = templateData?.description || 'Comprehensive business analysis';

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <button onClick={() => navigate('/templates')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft size={16} /> {t('newAnalysis.back')}
                </button>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-primary">{currentTemplateName}</h1>
                    <p className="text-text-secondary mt-1">{currentTemplateDescription}</p>
                </div>

                {/* Sticky Progress Header */}
                <div className="sticky top-[70px] bg-gray-50 py-4 z-10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">{t('newAnalysis.progress')}: {currentStep * 20}%</span>
                        <span className="text-sm font-semibold text-gray-600">{t('newAnalysis.step')} {currentStep} {t('newAnalysis.of')} 5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary-green h-2.5 rounded-full transition-all duration-500" style={{ width: `${currentStep * 20}%` }}></div>
                    </div>

                    <div className="flex justify-between mt-4">
                        {steps.map(step => (
                            <div key={step.number} onClick={() => isStepComplete(step.number - 1) && goToStep(step.number)} className={`flex-1 flex items-center justify-center gap-2 py-2 border-b-4 transition-colors cursor-pointer ${currentStep === step.number ? 'border-primary-green' : isStepComplete(step.number) ? 'border-green-300' : 'border-gray-200'}`}>
                                {isStepComplete(step.number) && currentStep > step.number ? (
                                    <div className="w-6 h-6 rounded-full bg-primary-green flex items-center justify-center text-white"><Check size={16} /></div>
                                ) : (
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${currentStep === step.number ? 'bg-primary-green text-white' : 'bg-gray-200 text-gray-600'}`}>{step.number}</div>
                                )}
                                <span className={`font-medium ${currentStep === step.number ? 'text-primary-green' : 'text-gray-600'}`}>{step.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-b-lg shadow-md mt-4">
                    {renderStep()}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <button onClick={prevStep} disabled={currentStep === 1} className="h-11 px-6 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            &lt; {t('common.previous')}
                        </button>
                        <button onClick={handleSaveDraft} className="flex items-center gap-2 text-sm text-primary-green hover:underline">
                            <Save size={16} /> {t('newAnalysis.saveDraft')}
                        </button>
                        {currentStep < 5 ? (
                            <button onClick={nextStep} className="h-11 px-8 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover">
                                {t('common.next')} &gt;
                            </button>
                        ) : (
                            <button onClick={handleGenerate} className="h-11 px-8 bg-primary-green text-white font-semibold rounded-md hover:bg-primary-green-hover">
                                {t('newAnalysis.generateAnalysis')} &gt;
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {showConfirmation && <ConfirmationModal onCancel={() => setShowConfirmation(false)} />}
        </div>
    );
};

export default NewAnalysis;
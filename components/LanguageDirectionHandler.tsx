import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageDirectionHandler: React.FC = () => {
    const { language } = useLanguage();

    useEffect(() => {
        // Set the document direction based on the selected language
        if (language === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
        }
    }, [language]);

    return null;
};

export default LanguageDirectionHandler;
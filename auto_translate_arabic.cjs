const fs = require('fs');

// Load the Arabic translation file
const arTranslations = JSON.parse(fs.readFileSync('translations/ar.json', 'utf8'));

// Simple translation map for common terms (in a real implementation, you would use a translation API)
const translationMap = {
  "All template fields added successfully!": "تمت إضافة جميع حقول النموذج بنجاح!",
  "Company Name": "اسم الشركة",
  "text": "نص",
  "Company name for Gap Analysis": "اسم الشركة لتحليل الفجوات",
  "Industry": "الصناعة",
  "dropdown": "قائمة منسدلة",
  "Industry for Gap Analysis": "الصناعة لتحليل الفجوات",
  "Location": "الموقع",
  "Location for Gap Analysis": "الموقع لتحليل الفجوات",
  "Business Type": "نوع العمل",
  "Business type for Gap Analysis": "نوع العمل لتحليل الفجوات",
  "Current Annual Revenue": "الإيرادات السنوية الحالية",
  "Current annual revenue for Gap Analysis": "الإيرادات السنوية الحالية لتحليل الفجوات",
  "Current Net Profit": "صافي الربح الحالي",
  "Current net profit for Gap Analysis": "صافي الربح الحالي لتحليل الفجوات",
  "Current Number of Employees": "عدد الموظفين الحالي",
  "Current number of employees for Gap Analysis": "عدد الموظفين الحالي لتحليل الفجوات",
  "Description of Current Core Operations": "وصف العمليات الأساسية الحالية",
  "textarea": "منطقة نصية",
  "Description of current core operations for Gap Analysis": "وصف العمليات الأساسية الحالية لتحليل الفجوات",
  "Current Target Audience": "الجمهور المستهدف الحالي",
  "Current target audience for Gap Analysis": "الجمهور المستهدف الحالي لتحليل الفجوات",
  "Current Market Share (%)": "حصة السوق الحالية (٪)",
  "Current market share for Gap Analysis": "حصة السوق الحالية لتحليل الفجوات",
  "Target Annual Revenue (within 3 years)": "الإيرادات السنوية المستهدفة (خلال 3 سنوات)",
  "Target annual revenue for Gap Analysis": "الإيرادات السنوية المستهدفة لتحليل الفجوات",
  "Target Market Share (%)": "حصة السوق المستهدفة (٪)",
  "Target market share for Gap Analysis": "حصة السوق المستهدفة لتحليل الفجوات",
  "Description of Required Operational Improvements": "وصف التحسينات التشغيلية المطلوبة",
  "Operational improvements for Gap Analysis": "التحسينات التشغيلية لتحليل الفجوات",
  "Skills Required to Achieve Future Goals": "المهارات المطلوبة لتحقيق الأهداف المستقبلية",
  "Skills required for Gap Analysis": "المهارات المطلوبة لتحليل الفجوات",
  "Gap Analysis fields added successfully!": "تمت إضافة حقول تحليل الفجوات بنجاح!",
  "Company name for Business Health Check": "اسم الشركة لفحص صحة العمل",
  "Industry for Business Health Check": "الصناعة لفحص صحة العمل",
  "Annual Revenue": "الإيرادات السنوية",
  "Annual revenue for Business Health Check": "الإيرادات السنوية لفحص صحة العمل",
  "Net Profit": "صافي الربح",
  "Net profit for Business Health Check": "صافي الربح لفحص صحة العمل",
  "Number of Employees": "عدد الموظفين",
  "Number of employees for Business Health Check": "عدد الموظفين لفحص صحة العمل",
  "Average Order Cycle Time (Order to Delivery)": "متوسط وقت دورة الطلب (من الطلب إلى التسليم)",
  "Average order cycle time for Business Health Check": "متوسط وقت دورة الطلب لفحص صحة العمل",
  "Key Competitors": "المنافسون الرئيسيون",
  "Key competitors for Business Health Check": "المنافسون الرئيسيون لفحص صحة العمل",
  "Main Marketing Channels": "قنوات التسويق الرئيسية",
  "multiselect": "اختيار متعدد",
  "Main marketing channels for Business Health Check": "قنوات التسويق الرئيسية لفحص صحة العمل",
  "Operating Cash Flow (Last 12 Months)": "التدفق النقدي التشغيلي (آخر 12 شهرًا)",
  "Operating cash flow for Business Health Check": "التدفق النقدي التشغيلي لفحص صحة العمل",
  "Customer Retention Rate (% Annually)": "معدل الاحتفاظ بالعملاء (٪ سنويًا)",
  "slider": "شريط تمرير",
  "Customer retention rate for Business Health Check": "معدل الاحتفاظ بالعملاء لفحص صحة العمل",
  "Average Customer Satisfaction Score (CSAT) (out of 5)": "متوسط درجة رضا العملاء (CSAT) (من 5)",
  "Average CSAT for Business Health Check": "متوسط CSAT لفحص صحة العمل",
  "Employee Turnover Rate (% Annually)": "معدل دوران الموظفين (٪ سنويًا)",
  "Employee turnover rate for Business Health Check": "معدل دوران الموظفين لفحص صحة العمل",
  "AI Business Health Check fields added successfully!": "تمت إضافة حقول فحص صحة العمل بالذكاء الاصطناعي بنجاح!",
  "Company name for Digital Maturity Assessment": "اسم الشركة لتقييم النضج الرقمي",
  "Industry for Digital Maturity Assessment": "الصناعة لتقييم النضج الرقمي",
  "Website Link": "رابط الموقع الإلكتروني",
  "Website link for Digital Maturity Assessment": "رابط الموقع الإلكتروني لتقييم النضج الرقمي",
  "Annual budget for Digital Maturity Assessment": "الميزانية السنوية لتقييم النضج الرقمي",
  "Number of IT employees for Digital Maturity Assessment": "عدد موظفي تكنولوجيا المعلومات لتقييم النضج الرقمي",
  "Main business software for Digital Maturity Assessment": "البرامج التجارية الرئيسية لتقييم النضج الرقمي",
  "To what extent are your routine and repetitive tasks automated?": "إلى أي مدى تم أتمتة المهام الروتينية والمتكررة لديك؟",
  "Task automation level for Digital Maturity Assessment": "مستوى أتمتة المهام لتقييم النضج الرقمي",
  "How do your customers interact with you digitally?": "كيف يتفاعل عملاؤك معك رقميًا؟",
  "Customer digital interaction for Digital Maturity Assessment": "التفاعل الرقمي للعملاء لتقييم النضج الرقمي",
  "Do you use paid digital advertising?": "هل تستخدم الإعلانات الرقمية المدفوعة؟",
  "Paid digital advertising for Digital Maturity Assessment": "الإعلانات الرقمية المدفوعة لتقييم النضج الرقمي",
  "To what extent is digitalization part of your core business strategy?": "إلى أي مدى يشكل الرقمنة جزءًا من استراتيجيتك التجارية الأساسية؟",
  "Digitalization strategy for Digital Maturity Assessment": "استراتيجية الرقمنة لتقييم النضج الرقمي",
  "System integration for Digital Maturity Assessment": "تكامل النظام لتقييم النضج الرقمي",
  "Data analytics usage for Digital Maturity Assessment": "استخدام تحليلات البيانات لتقييم النضج الرقمي",
  "How much does your team possess the necessary digital skills?": "ما مدى امتلاك فريقك للمهارات الرقمية الضرورية؟",
  "Team digital skills for Digital Maturity Assessment": "مهارات الفريق الرقمية لتقييم النضج الرقمي",
  "Digital Maturity Assessment fields added successfully!": "تمت إضافة حقول تقييم النضج الرقمي بنجاح!",
  "Company Name and Tagline": "اسم الشركة والشعار",
  "Company name and tagline for Pitch Deck Generator": "اسم الشركة والشعار لمولد عرض تقديمي",
  "The Problem (Describe the pain point)": "المشكلة (صف نقطة الألم)",
  "Problem description for Pitch Deck Generator": "وصف المشكلة لمولد عرض تقديمي",
  "The Solution (How you solve the problem)": "الحل (كيف تحل المشكلة)",
  "Solution description for Pitch Deck Generator": "وصف الحل لمولد عرض تقديمي",
  "Business Model (How you make money)": "نموذج العمل (كيف تربح المال)",
  "Business model for Pitch Deck Generator": "نموذج العمل لمولد عرض تقديمي",
  "Revenue Projections (3 Years)": "التوقعات الإيرادية (3 سنوات)",
  "Revenue projections for Pitch Deck Generator": "التوقعات الإيرادية لمولد عرض تقديمي",
  "The Ask (Amount being sought)": "الطلب (المبلغ المطلوب)",
  "Funding ask for Pitch Deck Generator": "طلب التمويل لمولد عرض تقديمي",
  "The Product (Describe how it works)": "المنتج (صف كيف يعمل)",
  "Product description for Pitch Deck Generator": "وصف المنتج لمولد عرض تقديمي",
  "Progress Made So Far (Traction)": "التقدم المحرز حتى الآن (الزخم)",
  "Traction for Pitch Deck Generator": "الزخم لمولد عرض تقديمي",
  "Market Size (TAM, SAM, SOM)": "حجم السوق (TAM, SAM, SOM)",
  "Market size for Pitch Deck Generator": "حجم السوق لمولد عرض تقديمي",
  "Key Competitors and Your Competitive Advantage": "المنافسون الرئيسيون وميزة تنافسك",
  "Competitive advantage for Pitch Deck Generator": "الميزة التنافسية لمولد عرض تقديمي",
  "Founding Team (Names, Roles, and Experience)": "الفريق المؤسس (الأسماء والأدوار والخبرة)",
  "Founding team for Pitch Deck Generator": "الفريق المؤسس لمولد عرض تقديمي",
  "Key Advisors (If any)": "المستشارون الرئيسيون (إن وجدوا)",
  "Key advisors for Pitch Deck Generator": "المستشارون الرئيسيون لمولد عرض تقديمي",
  "AI Pitch Deck Generator fields added successfully!": "تمت إضافة حقول مولد عرض تقديمي بالذكاء الاصطناعي بنجاح!",
  "Company name for Market Opportunity Analyzer": "اسم الشركة لمهلّل فرص السوق",
  "Current Industry": "الصناعة الحالية",
  "Current industry for Market Opportunity Analyzer": "الصناعة الحالية لمهلّل فرص السوق",
  "Current annual revenue for Market Opportunity Analyzer": "الإيرادات السنوية الحالية لمهلّل فرص السوق",
  "Capital Available for New Investment Opportunities": "رأس المال المتاح لفرص الاستثمار الجديدة",
  "Capital available for Market Opportunity Analyzer": "رأس المال المتاح لمهلّل فرص السوق",
  "Key Team Skills and Competencies": "المهارات والكفاءات الرئيسية للفريق",
  "Key team skills for Market Opportunity Analyzer": "المهارات الرئيسية للفريق لمهلّل فرص السوق",
  "Key Technological or Physical Assets": "الأصول التكنولوجية أو المادية الرئيسية",
  "Main assets for Market Opportunity Analyzer": "الأصول الرئيسية لمهلّل فرص السوق",
  "Company": "الشركة",
  "Strategic vision for Market Opportunity Analyzer": "الرؤية الاستراتيجية لمهلّل فرص السوق",
  "Market opportunity description for Market Opportunity Analyzer": "وصف فرصة السوق لمهلّل فرص السوق",
  "Estimated Market Size (USD Annually)": "حجم السوق المقدر (بالدولار الأمريكي سنويًا)",
  "Market size for Market Opportunity Analyzer": "حجم السوق لمهلّل فرص السوق",
  "Expected Market Growth Rate (% Annually)": "معدل نمو السوق المتوقع (٪ سنويًا)",
  "Market growth rate for Market Opportunity Analyzer": "معدل نمو السوق لمهلّل فرص السوق",
  "Number of Direct Competitors": "عدد المنافسين المباشرين",
  "Number of competitors for Market Opportunity Analyzer": "عدد المنافسين لمهلّل فرص السوق",
  "What are the main barriers to entry in this market?": "ما هي الحواجز الرئيسية لدخول هذا السوق؟",
  "Barriers to entry for Market Opportunity Analyzer": "حواجز الدخول لمهلّل فرص السوق",
  "POST": "POST",
  "Market Opportunity": "فرصة السوق",
  "react": "react",
  "overview": "نظرة عامة",
  "api-keys": "مفاتيح API",
  "Promise": "Promise",
  "Name is required": "الاسم مطلوب",
  "Email is required": "البريد الإلكتروني مطلوب",
  "Password is required for new users": "كلمة المرور مطلوبة للمستخدمين الجدد",
  "Password must be at least 6 characters": "يجب أن تكون كلمة المرور على الأقل 6 أحرف",
  "Failed to save user": "فشل في حفظ المستخدم",
  "Add New User": "إضافة مستخدم جديد",
  "Enter full name": "أدخل الاسم الكامل",
  "email": "البريد الإلكتروني",
  "(leave blank to keep current)": "(اتركه فارغًا للاحتفاظ بالحالي)",
  "relative": "نسبي",
  "Leave blank to keep current": "اتركه فارغًا للاحتفاظ بالحالي",
  "Enter password": "أدخل كلمة المرور",
  "button": "زر",
  "submit": "إرسال",
  "Update User": "تحديث المستخدم",
  "Create User": "إنشاء مستخدم",
  "none": "لا شيء",
  "currentColor": "اللون الحالي",
  "round": "دائري",
  " d=": " d=",
  "token": "رمز",
  "latest_analysis_id": "latest_analysis_id",
  "Generation Failed": "فشل التوليد",
  "flex gap-4": "flex gap-4",
  "Try Again": "حاول مرة أخرى",
  "Ready to Generate Analysis?": "هل أنت مستعد لتوليد التحليل؟",
  "mb-8": "mb-8",
  "Financial Projections (5 years)": "التوقعات المالية (5 سنوات)",
  "Success Probability Score": "درجة احتمال النجاح",
  "Industry Benchmarks": "معايير الصناعة",
  "flex gap-3": "flex gap-3",
  "w-4 h-4": "w-4 h-4",
  "complete": "مكتمل",
  "loading": "جار التحميل",
  "pending": "قيد الانتظار",
  "flex gap-1": "flex gap-1",
  "analysis_draft": "analysis_draft",
  "Analysis Complete!": "اكتمل التحليل!",
  "mb-4": "mb-4",
  "space-y-2": "space-y-2",
  "checkbox": "مربع اختيار",
  "space-y-4": "space-y-4",
  "industrySpecific": "industrySpecific",
  "data-label": "data-label",
  "This field is required": "هذا الحقل مطلوب",
  "Dropdown": "قائمة منسدلة",
  "dir": "dir",
  "rtl": "rtl",
  "lang": "lang",
  "ltr": "ltr",
  "Overview": "نظرة عامة",
  "mb-6": "mb-6",
  "Manage your business analysis platform": "إدارة منصة تحليل أعمالك",
  "p-6": "p-6",
  "mousedown": "mousedown",
  "py-1": "py-1",
  "Open user menu": "فتح قائمة المستخدم",
  "sr-only": "sr-only",
  "pt-[70px]": "pt-[70px]",
  "info": "معلومات",
  "warning": "تحذير",
  "GET": "GET",
  "PUT": "PUT",
  "Invalid date": "تاريخ غير صالح",
  "Just now": "الآن",
  "en-US": "en-US",
  "short": "قصير",
  "numeric": "رقمي",
  "h-6 w-6": "h-6 w-6",
  "w-3 h-3": "w-3 h-3",
  "w-5 h-5": "w-5 h-5",
  "No notifications yet": "لا توجد إشعارات بعد",
  "flex-grow": "flex-grow",
  "Mark as read": "وضع علامة كمقروء",
  "Could not parse draft from local storage": "تعذر تحليل المسودة من التخزين المحلي",
  "= 1 && step": "= 1 && step",
  "useAnalysis must be used within an AnalysisProvider": "يجب استخدام useAnalysis داخل AnalysisProvider",
  "System Administrator": "مسؤول النظام",
  "John Doe": "جون دو",
  "No stored user session found": "لم يتم العثور على جلسة مستخدم مخزنة",
  "Failed to parse user from session storage": "فشل في تحليل المستخدم من تخزين الجلسة",
  "Navigating to admin panel": "التنقل إلى لوحة الإدارة",
  "Navigating to developer dashboard": "التنقل إلى لوحة تحكم المطور",
  "Navigating to dashboard": "التنقل إلى لوحة التحكم",
  "Logout successful": "تسجيل الخروج ناجح",
  "useAuth must be used within an AuthProvider": "يجب استخدام useAuth داخل AuthProvider",
  "language": "اللغة",
  " || savedLanguage === ": " || savedLanguage === ",
  "object": "كائن",
  "useLanguage must be used within a LanguageProvider": "يجب استخدام useLanguage داخل LanguageProvider",
  "root": "root",
  "Could not find root element to mount to": "تعذر العثور على عنصر root للتركيب عليه",
  "All": "الكل",
  "Found {Total} activity logs matching criteria": "تم العثور على {Total} سجل نشاط يطابق المعايير",
  "Returning {Count} logs for page {Page}": "إرجاع {Count} سجل لصفحة {Page}",
  "Fetching activity log statistics": "جلب إحصائيات سجل النشاط",
  "Critical": "حرج",
  "Warning": "تحذير",
  "clear": "مسح",
  "Deleted logs older than {daysToKeep} days": "تم حذف السجلات الأقدم من {daysToKeep} يوم",
  "Activity log with ID {Id} not found": "سجل النشاط بالمعرف {Id} غير موجود",
  "Activity log not found": "سجل النشاط غير موجود",
  "Activity log deleted successfully": "تم حذف سجل النشاط بنجاح",
  "General Market": "السوق العام",
  "User-Agent": "وكيل المستخدم",
  "Unknown": "غير معروف",
  "step2": "step2",
  "initialInvestment": "initialInvestment",
  "Signup": "التسجيل",
  "Invalid email or password": "بريد إلكتروني أو كلمة مرور غير صالحة",
  "yyyy-MM-dd": "yyyy-MM-dd",
  "Complete": "مكتمل",
  "Dev9090@": "Dev9090@",
  "Invalid developer credentials": "بيانات اعتماد المطور غير صالحة",
  "Developer User": "مستخدم مطور",
  "Database seeded successfully": "تم تهيئة قاعدة البيانات بنجاح",
  "Error occurred during manual seeding": "حدث خطأ أثناء التهيئة اليدوية",
  "Seeding failed": "فشلت التهيئة",
  "Database reset and seeded successfully": "تمت إعادة تعيين قاعدة البيانات وتهيئتها بنجاح",
  "Error occurred during reset and seeding": "حدث خطأ أثناء إعادة التعيين والتهيئة",
  "Reset failed": "فشل إعادة التعيين",
  "decimal(18,2)": "decimal(18,2)",
  "admin123": "admin123",
  "user123": "user123",
  "Name must be between 5 and 100 characters": "يجب أن يكون الاسم بين 5 و 100 حرف",
  "Description must be between 20 and 280 characters": "يجب أن يكون الوصف بين 20 و 280 حرفًا",
  "Duration must be between 1 and 120 minutes": "يجب أن تكون المدة بين 1 و 120 دقيقة",
  "int": "int",
  "nvarchar(100)": "nvarchar(100)",
  "nvarchar(280)": "nvarchar(280)",
  "nvarchar(max)": "nvarchar(max)",
  "bit": "bit",
  "datetime2": "datetime2",
  "PK_Templates": "PK_Templates",
  "nvarchar(450)": "nvarchar(450)",
  "PK_Users": "PK_Users",
  "nvarchar(1000)": "nvarchar(1000)",
  "PK_TemplateFields": "PK_TemplateFields",
  "FK_TemplateFields_Templates_TemplateId": "FK_TemplateFields_Templates_TemplateId",
  "PK_ActivityLogs": "PK_ActivityLogs",
  "FK_ActivityLogs_Users_UserId": "FK_ActivityLogs_Users_UserId",
  "PK_Analyses": "PK_Analyses",
  "FK_Analyses_Templates_TemplateId": "FK_Analyses_Templates_TemplateId",
  "FK_Analyses_Users_OwnerId": "FK_Analyses_Users_OwnerId",
  "PK_Notifications": "PK_Notifications",
  "FK_Notifications_Users_UserId": "FK_Notifications_Users_UserId",
  "IX_ActivityLogs_Action": "IX_ActivityLogs_Action",
  "Action": "الإجراء",
  "IX_ActivityLogs_CreatedAt": "IX_ActivityLogs_CreatedAt",
  "IX_ActivityLogs_Severity": "IX_ActivityLogs_Severity",
  "Severity": "الخطورة",
  "IX_ActivityLogs_UserId": "IX_ActivityLogs_UserId",
  "IX_Analyses_OwnerId": "IX_Analyses_OwnerId",
  "IX_Analyses_TemplateId": "IX_Analyses_TemplateId",
  "IX_Notifications_CreatedAt": "IX_Notifications_CreatedAt",
  "IX_Notifications_IsRead": "IX_Notifications_IsRead",
  "IX_Notifications_UserId": "IX_Notifications_UserId",
  "IX_TemplateFields_TemplateId_StageNumber_FieldOrder": "IX_TemplateFields_TemplateId_StageNumber_FieldOrder",
  "IX_Users_Email": "IX_Users_Email",
  "Email": "البريد الإلكتروني",
  "20251108003019_InitialCreateSQLServer": "20251108003019_InitialCreateSQLServer",
  "Details": "التفاصيل",
  "Content": "المحتوى",
  "Title": "العنوان",
  "Message": "الرسالة",
  "Type": "النوع",
  "Name": "الاسم",
  "Rationale": "الأساس المنطقي",
  "Owner": "المالك",
  "Template": "النموذج",
  "Info": "معلومات",
  "Stage number must be between 1 and 5": "يجب أن يكون رقم المرحلة بين 1 و 5",
  "Label must be between 1 and 100 characters": "يجب أن يكون التسمية بين 1 و 100 حرف",
  "Rationale must be between 50 and 1000 characters": "يجب أن يكون الأساس المنطقي بين 50 و 1000 حرف",
  "Masroo3k Business Intelligence Platform": "منصة مشاريع للاستخبارات التجارية",
  "already an object named": "كائن موجود بالفعل باسم",
  "Running in Development mode": "تشغيل في وضع التطوير",
  "Failed to write activity log": "فشل في كتابة سجل النشاط",
  "Login": "تسجيل الدخول",
  "User logged in successfully": "تم تسجيل دخول المستخدم بنجاح",
  "Failed login attempt": "محاولة تسجيل دخول فاشلة",
  "Logout": "تسجيل الخروج",
  "User logged out": "تم تسجيل خروج المستخدم",
  "Create": "إنشاء",
  "Created new {entityType}": "تم إنشاء {entityType} جديد",
  "Update": "تحديث",
  "Updated {entityType}": "تم تحديث {entityType}",
  "Deleted {entityType}": "تم حذف {entityType}",
  "Gemini API key not configured, using simulated analysis": "مفتاح API الخاص بـ Gemini غير مكون، باستخدام تحليل محاكٍ",
  "Error generating AI analysis, falling back to simulated data": "خطأ في إنشاء تحليل الذكاء الاصطناعي، العودة إلى البيانات المحاكاة",
  "None provided": "لم يتم تقديم أي شيء",
  "successProbability": "successProbability",
  "riskLevel": "riskLevel",
  "<Low|Medium|High|Critical>": "<منخفض|متوسط|مرتفع|حرج>",
  "projectedROI": "projectedROI",
  "recommendedInvestment": "recommendedInvestment",
  "overallScore": "overallScore",
  "keyFindings": "keyFindings",
  "<finding 1>": "<الاكتشاف 1>",
  "<finding 2>": "<الاكتشاف 2>",
  "<finding 3>": "<الاكتشاف 3>",
  "<finding 4>": "<الاكتشاف 4>",
  "<finding 5>": "<الاكتشاف 5>",
  "<finding 6>": "<الاكتشاف 6>",
  "executiveSummary": "executiveSummary",
  "<recommendation 1>": "<التوصية 1>",
  "<recommendation 2>": "<التوصية 2>",
  "<recommendation 3>": "<التوصية 3>",
  "<recommendation 4>": "<التوصية 4>",
  "candidates": "candidates",
  "content": "المحتوى",
  "parts": "الأجزاء",
  "No content in Gemini response": "لا يوجد محتوى في استجابة Gemini",
  "Failed to parse analysis response": "فشل في تحليل استجابة التحليل",
  "Error parsing Gemini response": "خطأ في تحليل استجابة Gemini",
  "Market analysis indicates moderate demand in the target segment": "يشير تحليل السوق إلى طلب معتدل في القطاع المستهدف",
  "Competitive landscape requires strategic differentiation": "المشهد التنافسي يتطلب تمييزًا استراتيجيًا",
  "Financial projections suggest steady growth potential": "تشير التوقعات المالية إلى إمكانية نمو مستقرة",
  "Operational challenges identified in scaling phase": "تم تحديد تحديات تشغيلية في مرحلة التوسع",
  "Customer acquisition strategy needs refinement": "تحتاج استراتيجية اكتساب العملاء إلى تحسين",
  "Technology infrastructure appears adequate for initial launch": "تبدو البنية التحتية للتكنولوجيا كافية للإطلاق الأولي",
  "Develop strong unique value proposition to stand out": "طور اقتراح قيمة فريد وقوي للتميز",
  "Establish clear financial milestones and KPIs": "أنشئ نقاط مرجعية مالية واضحة ومؤشرات أداء رئيسية",
  "Build strategic partnerships to accelerate growth": "ابنِ شراكات استراتيجية لتسريع النمو",
  "Unable to determine client IP address": "غير قادر على تحديد عنوان IP للعميل",
  "Error getting client IP address": "خطأ في الحصول على عنوان IP للعميل",
  "User Login": "تسجيل دخول المستخدم",
  "New Analysis Completed": "اكتمل تحليل جديد",
  "Analysis Complete": "اكتمل التحليل",
  "Failed to load stats": "فشل في تحميل الإحصائيات",
  "Total Users": "إجمالي المستخدمين",
  "System Uptime": "وقت تشغيل النظام",
  "text-sm": "text-sm",
  "searchTerm": "searchTerm",
  "action": "الإجراء",
  "severity": "الخطورة",
  "Are you sure you want to delete logs older than 90 days?": "هل أنت متأكد من رغبتك في حذف السجلات الأقدم من 90 يومًا؟",
  "critical": "حرج",
  "2-digit": "2-digit",
  "Admin Activity Logs": "سجلات نشاط الإدارة",
  "Track all administrative actions and system changes": "تتبع جميع الإجراءات الإدارية وتغييرات النظام",
  "flex gap-2": "flex gap-2",
  "10s": "10s",
  "30s": "30s",
  "60s": "60s",
  "Today": "اليوم",
  "Last 7 Days": "آخر 7 أيام",
  "Warnings": "التحذيرات",
  "Errors": "الأخطاء",
  "Filter logs by action type": "تصفية السجلات حسب نوع الإجراء",
  "All Actions": "جميع الإجراءات",
  "Filter logs by severity level": "تصفية السجلات حسب مستوى الخطورة",
  "All Severities": "جميع مستويات الخطورة",
  "No activity logs yet": "لا توجد سجلات نشاط بعد",
  "w-full": "w-full",
  "Date & Time": "التاريخ والوقت",
  "IP Address": "عنوان IP",
  "180px": "180px",
  "max-w-md": "max-w-md",
  "truncate": "اقتطاع",
  "Click to view details": "انقر لعرض التفاصيل",
  "Delete log": "حذف السجل",
  "Activity Log Details": "تفاصيل سجل النشاط",
  "Close details modal": "إغلاق نافذة التفاصيل",
  "w-6 h-6": "w-6 h-6",
  "M6 18L18 6M6 6l12 12": "M6 18L18 6M6 6l12 12",
  "Log ID": "معرف السجل",
  "Timestamp": "الطابع الزمني",
  "mt-1": "mt-1",
  "Entity Type": "نوع الكيان",
  "Entity ID": "معرف الكيان",
  "Technical Details": "التفاصيل التقنية",
  "space-y-3": "space-y-3",
  "User Agent": "وكيل المستخدم",
  "Additional Details": "تفاصيل إضافية",
  "System Configuration Content Here": "محتوى تكوين النظام هنا",
  "Template Management Content Here": "محتوى إدارة النماذج هنا",
  "all": "الكل",
  "Failed to load users": "فشل في تحميل المستخدمين",
  "User updated successfully!": "تم تحديث المستخدم بنجاح!",
  "User created successfully!": "تم إنشاء المستخدم بنجاح!",
  "${userName}": "${userName}",
  "User deleted successfully!": "تم حذف المستخدم بنجاح!",
  "Failed to delete user": "فشل في حذف المستخدم",
  "Filter users by role": "تصفية المستخدمين حسب الدور",
  "Filter users by status": "تصفية المستخدمين حسب الحالة",
  "p-4": "p-4",
  "Website Configuration Content Here": "محتوى تكوين الموقع الإلكتروني هنا",
  "Processing": "قيد المعالجة",
  "text-right": "text-right",
  "Invalid template ID": "معرف النموذج غير صالح",
  "Field created successfully!": "تم إنشاء الحقل بنجاح!",
  "space-y-6": "space-y-6",
  "isRequired": "isRequired",
  "mustBePositive": "mustBePositive",
  "mustBeBetween0And100": "mustBeBetween0And100",
  "mustBeValidUrl": "mustBeValidUrl",
  "opacity-25": "opacity-25",
  " cy=": " cy=",
  " r=": " r=",
  " stroke=": " stroke=",
  " strokeWidth=": " strokeWidth=",
  "opacity-75": "opacity-75",
  "disabled": "معطل",
  "Gemini API Key": "مفتاح API الخاص بـ Gemini",
  "AIzaSyCLCeMXElGa7qZoV2c3x0Xt2PXMQMWIS4E": "AIzaSyCLCeMXElGa7qZoV2c3x0Xt2PXMQMWIS4E",
  "Analytics Service Key": "مفتاح خدمة التحليلات",
  "sk_analytics_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX": "sk_analytics_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Backup Service Key": "مفتاح خدمة النسخ الاحتياطي",
  "sk_backup_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX": "sk_backup_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Never": "أبدًا",
  "Manage all API keys and service integrations": "إدارة جميع مفاتيح API وتكاملات الخدمات",
  "Create New API Key": "إنشاء مفتاح API جديد",
  "Enter key name": "أدخل اسم المفتاح",
  "bg-gray-50": "bg-gray-50",
  "col": "col",
  "px-6 py-4": "px-6 py-4",
  "Hide key": "إخفاء المفتاح",
  "Show key": "عرض المفتاح",
  "Copy to clipboard": "نسخ إلى الحافظة",
  "Disable key": "تعطيل المفتاح",
  "Enable key": "تمكين المفتاح",
  "Delete key": "حذف المفتاح",
  "API Key Security Best Practices": "أفضل ممارسات أمان مفاتيح API",
  "Rotate keys regularly and revoke unused keys": "قم بتدوير المفاتيح بانتظام وألغِ المفاتيح غير المستخدمة",
  "Use environment variables to store keys in production": "استخدم المتغيرات البيئية لتخزين المفاتيح في الإنتاج",
  "Monitor key usage and set up alerts for unusual activity": "راقب استخدام المفاتيح وأعد تنبيهات للنشاط غير العادي",
  "Failed to load templates": "فشل في تحميل النماذج",
  "completed": "مكتمل",
  "${backupName}": "${backupName}",
  "Monitor, backup, and manage your database": "راقب وانسخ وقم بإدارة قاعدة بياناتك",
  "Total Tables": "إجمالي الجداول",
  "Total Records": "إجمالي السجلات",
  "Database Size": "حجم قاعدة البيانات",
  "Last Backup": "آخر نسخ احتياطي",
  "tables": "الجداول",
  "backups": "النسخ الاحتياطية",
  "maintenance": "الصيانة",
  "Database Status": "حالة قاعدة البيانات",
  "Connection Status": "حالة الاتصال",
  "Connected": "متصل",
  "Database is running normally": "قاعدة البيانات تعمل بشكل طبيعي",
  "Performance": "الأداء",
  "Optimal": "الأمثل",
  "Database Tables": "جداول قاعدة البيانات",
  "Database Backups": "النسخ الاحتياطية لقاعدة البيانات",
  "Backup name": "اسم النسخة الاحتياطية",
  "mr-1": "mr-1",
  "Database Maintenance": "صيانة قاعدة البيانات",
  "Optimize Database": "تحسين قاعدة البيانات",
  "Reorganize database structure to improve performance": "أعد تنظيم بنية قاعدة البيانات لتحسين الأداء",
  "Clear Cache": "مسح ذاكرة التخزين المؤقتة",
  "Clear database cache to free up memory": "امسح ذاكرة التخزين المؤقتة لقاعدة البيانات لتحرير الذاكرة",
  "Danger Zone": "منطقة الخطر",
  "warn": "warn",
  "debug": "debug",
  "user-123": "user-123",
  "Template analysis request processed in 142ms": "تمت معالجة طلب تحليل النموذج في 142 مللي ثانية",
  "New template ": "نموذج جديد ",
  "admin-456": "admin-456",
  "Scheduled backup completed successfully": "اكتمل النسخ الاحتياطي المجدول بنجاح",
  "user-789": "user-789",
  "Failed to load logs": "فشل في تحميل السجلات",
  "Monitor system activity and troubleshoot issues": "راقب نشاط النظام وحل المشاكل",
  "Search logs": "البحث في السجلات",
  "levelFilter": "levelFilter",
  "Filter by log level": "تصفية حسب مستوى السجل",
  "All Levels": "جميع المستويات",
  "Debug": "التصحيح",
  "sourceFilter": "sourceFilter",
  "Filter by source": "تصفية حسب المصدر",
  "All Sources": "جميع المصادر",
  "No logs found": "لم يتم العثور على سجلات",
  "configuration": "configuration",
  "Development": "التطوير",
  "12 days, 4 hours, 32 minutes": "12 يومًا، 4 ساعات، 32 دقيقة",
  "VITE_API_URL": "VITE_API_URL",
  "VITE_GEMINI_API_KEY": "VITE_GEMINI_API_KEY",
  "VITE_ENABLE_DEVELOPER_MODE": "VITE_ENABLE_DEVELOPER_MODE",
  "true": "true",
  "NODE_ENV": "NODE_ENV",
  "development": "development",
  "PORT": "PORT",
  "Database Connection": "اتصال قاعدة البيانات",
  "API Service": "خدمة API",
  "Authentication Service": "خدمة المصادقة",
  "File Storage": "تخزين الملفات",
  "degraded": "متدهور",
  "Email Service": "خدمة البريد الإلكتروني",
  "AI Service": "خدمة الذكاء الاصطناعي",
  "down": "غير متوفر",
  "Version": "الإصدار",
  "Environment": "البيئة",
  "Uptime": "وقت التشغيل",
  "environment": "البيئة",
  "health": "الصحة",
  "security": "الأمان",
  "System Configuration": "تكوين النظام",
  "appName": "appName",
  "Mashroo3k Business Analysis": "تحليل أعمال مشاريع",
  "Enter application name": "أدخل اسم التطبيق",
  "defaultLanguage": "defaultLanguage",
  "Default language": "اللغة الافتراضية",
  "Arabic": "العربية",
  "Spanish": "الإسبانية",
  "French": "الفرنسية",
  "timezone": "timezone",
  "Timezone": "المنطقة الزمنية",
  "UTC": "UTC",
  "GMT+1": "GMT+1",
  "GMT+2": "GMT+2",
  "GMT+3": "GMT+3",
  "maintenanceMode": "maintenanceMode",
  "Enable maintenance mode for the application": "تمكين وضع الصيانة للتطبيق",
  "debugMode": "debugMode",
  "Enable debug logging for detailed system information": "تمكين تسجيل التصحيح للحصول على معلومات تفصيلية عن النظام",
  "autoBackup": "autoBackup",
  "Enable automatic backups of system data": "تمكين النسخ الاحتياطية التلقائية لبيانات النظام",
  "mt-6": "mt-6",
  "Environment Variables": "المتغيرات البيئية",
  "System Health Checks": "فحوصات صحة النظام",
  "Security Settings": "إعدادات الأمان",
  "Authentication": "المصادقة",
  "sessionTimeout": "sessionTimeout",
  "Enter session timeout in minutes": "أدخل مهلة الجلسة بالدقائق",
  "minLength": "minLength",
  "uppercase": "أحرف كبيرة",
  "API Security": "أمان API",
  "rateLimiting": "rateLimiting",
  "requestsPerMinute": "requestsPerMinute",
  "Enter requests per minute": "أدخل الطلبات في الدقيقة",
  "Security Audit": "مراجعة الأمان",
  "Failed to delete template": "فشل في حذف النموذج",
  "console": "console",
  "Console": "وحدة التحكم",
  "debugger": "debugger",
  "Debugger": "المصحح",
  "api-tester": "api-tester",
  "API Tester": "مختبر API",
  "Data Import": "استيراد البيانات",
  "Data Export": "تصدير البيانات",
  "input": "input",
  "help": "help",
  "version": "version",
  "Type ": "اكتب ",
  " for available commands": " للأوامر المتاحة",
  "Advanced tools for debugging and development": "أدوات متقدمة للتصحيح والتطوير",
  "mr-2": "mr-2",
  "Developer Console": "وحدة تحكم المطور",
  "flex mt-2": "flex mt-2",
  "Console input": "إدخال وحدة التحكم",
  "Debug Controls": "عناصر تحكم التصحيح",
  "Breakpoints": "نقاط التوقف",
  "Disabled": "معطل",
  "Debug Output": "إخراج التصحيح",
  "httpMethod": "httpMethod",
  "HTTP Method": "طريقة HTTP",
  "PATCH": "PATCH",
  "endpointUrl": "endpointUrl",
  "Enter API endpoint": "أدخل نقطة نهاية API",
  "Endpoint URL": "عنوان URL لنقطة النهاية",
  "headers": "headers",
  "Request headers": "رؤوس الطلب",
  "requestBody": "requestBody",
  "New Template": "نموذج جديد",
  "Request body": "نص الطلب",
  "Response": "الاستجابة",
  "ml-4": "ml-4",
  "ml-8": "ml-8",
  "ml-12": "ml-12",
  "ml-16": "ml-16",
  "name": "name",
  "Business Analysis": "تحليل الأعمال",
  "Comprehensive business analysis template": "نموذج تحليل أعمال شامل",
  "Click to upload": "انقر للتحميل",
  "file": "file",
  "hidden": "hidden",
  "Import data file": "استيراد ملف البيانات",
  "Import Settings": "إعدادات الاستيراد",
  "dataFormat": "dataFormat",
  "Data format": "تنسيق البيانات",
  "CSV": "CSV",
  "JSON": "JSON",
  "XML": "XML",
  "overwrite": "overwrite",
  "Overwrite existing data": "الكتابة فوق البيانات الموجودة",
  "validate": "validate",
  "Validate data before import": "التحقق من صحة البيانات قبل الاستيراد",
  "Export Options": "خيارات التصدير",
  "exportUsers": "exportUsers",
  "Export users": "تصدير المستخدمين",
  "exportTemplates": "exportTemplates",
  "Export templates": "تصدير النماذج",
  "exportAnalyses": "exportAnalyses",
  "Export analyses": "تصدير التحاليل",
  "exportFormat": "exportFormat",
  "Export format": "تنسيق التصدير",
  "Excel": "Excel",
  "Export Settings": "إعدادات التصدير",
  "date": "date",
  "Start date": "تاريخ البدء",
  "End date": "تاريخ الانتهاء",
  "compress": "compress",
  "Compress files": "ضغط الملفات",
  "includeMetadata": "includeMetadata",
  "Include metadata": "تضمين البيانات الوصفية",
  "Manage all users, roles, and permissions": "إدارة جميع المستخدمين والأدوار والأذونات",
  "Failed to load categories": "فشل في تحميل الفئات",
  "Failed to load template fields": "فشل في تحميل حقول النموذج",
  "Failed to load template": "فشل في تحميل النموذج",
  "fields to save": "الحقول المطلوب حفظها",
  "string": "string",
  "temp_": "temp_",
  "Failed to save field": "فشل في حفظ الحقل",
  "Failed to save template": "فشل في حفظ النموذج",
  "isPopular": "isPopular",
  "flex-1": "flex-1",
  " className=": " className=",
  "jspdf": "jspdf",
  "html2canvas": "html2canvas",
  "<div class=": "<div class=",
  "absolute": "مطلق",
  "-9999px": "-9999px",
  "210mm": "210mm",
  "20px": "20px",
  "white": "أبيض",
  "PNG": "PNG",
  "<svg xmlns=": "<svg xmlns=",
  " width=": " width=",
  " height=": " height=",
  " viewBox=": " viewBox=",
  " fill=": " fill=",
  "><path d=": "><path d=",
  " y1=": " y1=",
  " x2=": " x2=",
  " y2=": " y2=",
  "Download analysis report as PDF": "تنزيل تقرير التحليل كملف PDF",
  "userId": "userId",
  "userRole": "userRole",
  "><line x1=": "><line x1=",
  "Comprehensive business analysis": "تحليل أعمال شامل",
  "Failed to load notifications": "فشل في تحميل الإشعارات",
  "opacity-60": "opacity-60",
  "Yesterday": "أمس",
  "Stay updated with your latest alerts and messages": "ابقَ على اطلاع بأحدث تنبيهاتك ورسائلك",
  "When you have notifications, they'll appear here": "عندما يكون لديك إشعارات، ستظهر هنا",
  "Delete notification": "حذف الإشعار",
  "Email is invalid": "البريد الإلكتروني غير صالح",
  "Current password is required to set a new password": "كلمة المرور الحالية مطلوبة لتعيين كلمة مرور جديدة",
  "New password must be at least 6 characters": "يجب أن تكون كلمة المرور الجديدة على الأقل 6 أحرف",
  "Passwords do not match": "كلمات المرور غير متطابقة",
  "Profile updated successfully!": "تم تحديث الملف الشخصي بنجاح!",
  "Manage your account settings and preferences": "إدارة إعدادات حسابك وتفضيلاتك",
  "Enter your name": "أدخل اسمك",
  "Enter your email": "أدخل بريدك الإلكتروني",
  "pt-2": "pt-2",
  "currentPassword": "currentPassword",
  "Enter current password": "أدخل كلمة المرور الحالية",
  "newPassword": "newPassword",
  "confirmPassword": "confirmPassword",
  "recharts": "recharts",
  "Financial Projections": "التوقعات المالية",
  "Benchmarks": "المعايير",
  "#28a745": "#28a745",
  "#0066cc": "#0066cc",
  "#ffc107": "#ffc107",
  "#dc3545": "#dc3545",
  "#6f42c1": "#6f42c1",
  "bg-red-100": "bg-red-100",
  "Failed to load report": "فشل في تحميل التقرير",
  "unknown": "غير معروف",
  "Market Risk": "مخاطر السوق",
  "Financial Risk": "المخاطر المالية",
  "Operational Risk": "المخاطر التشغيلية",
  "Regulatory Risk": "المخاطر التنظيمية",
  "Strategy": "الاستراتيجية",
  "Finance": "المالية",
  "Return on Investment": "العائد على الاستثمار",
  "Market Risk Level": "مستوى مخاطر السوق",
  "space-y-16": "space-y-16",
  "space-y-8": "space-y-8",
  "Probability of achieving business goals": "احتمالية تحقيق أهداف العمل",
  "ROI Projection": "توقع العائد على الاستثمار",
  "Expected return on investment": "العائد المتوقع على الاستثمار",
  "Required capital investment": "رأس المال المطلوب للاستثمار",
  "#e0e0e0": "#e0e0e0",
  "year": "السنة",
  "#fff": "#fff",
  "1px solid #ccc": "1px solid #ccc",
  "8px": "8px",
  "monotone": "أحادي اللون",
  "revenue": "revenue",
  "Revenue": "الإيرادات",
  "expenses": "expenses",
  "Expenses": "المصاريف",
  "profit": "profit",
  "Profit": "الربح",
  "Financial Breakdown": "التحليل المالي",
  "Year": "السنة",
  "ROI": "العائد على الاستثمار",
  "Revenue Growth Chart": "مخطط نمو الإيرادات",
  "Profit Trend": "اتجاه الربح",
  "Risk Analysis Overview": "نظرة عامة على تحليل المخاطر",
  "risk": "risk",
  "Risk Assessment Matrix": "مصفوفة تقييم المخاطر",
  "💡 Mitigation Strategy": "💡 استراتيجية التخفيف",
  "Strategic Recommendations": "التوصيات الاستراتيجية",
  "Impact Score": "درجة التأثير",
  "mt-4": "mt-4",
  "Industry Performance Benchmarks": "معايير أداء الصناعة",
  "Your Business": "عملك",
  "Your Value": "قيمتك",
  "Industry Avg": "متوسط الصناعة",
  "Top Performers": "أفضل الأداء",
  "Overall Performance Summary": "ملخص الأداء العام",
  "end": "end",
  "yourValue": "yourValue",
  "industryAverage": "industryAverage",
  "#6c757d": "#6c757d",
  "Industry Average": "متوسط الصناعة",
  "topPerformers": "topPerformers",
  "Analysis not found": "التحليل غير موجود",
  "Back to Analyses": "العودة إلى التحاليل",
  "Export PDF": "تصدير PDF",
  "Share": "مشاركة",
  "Start New Analysis": "بدء تحليل جديد",
  "Schedule Consultation": "جدولة استشارة",
  "fullName": "fullName",
  "Food & Beverage": "الطعام والشراب",
  "Technology": "التكنولوجيا",
  "Health & Fitness": "الصحة واللياقة البدنية",
  "Readiness": "الاستعداد",
  "API base URL is not configured": "عنوان URL الأساسي لـ API غير مكون",
  "Draft": "مسودة",
  "DEBUG": "DEBUG",
  "INFO": "INFO",
  "WARN": "WARN",
  "path": "path",
  "vite": "vite"
};

// Function to recursively traverse and translate Arabic values
function translateArabicValues(obj) {
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        // Recursively process nested objects
        result[key] = translateArabicValues(obj[key]);
      } else if (typeof obj[key] === 'string' && obj[key].startsWith('__TRANSLATE__: ')) {
        // Extract the English text to translate
        const englishText = obj[key].substring(15); // Remove "__TRANSLATE__: " prefix
        
        // Look up translation in our map, or use a fallback
        if (translationMap.hasOwnProperty(englishText)) {
          result[key] = translationMap[englishText];
        } else {
          // Fallback: Just use the English text if no translation is found
          console.log('No translation found for: ' + englishText);
          result[key] = englishText; // Keep English as fallback
        }
      } else {
        // Keep non-translation values as they are
        result[key] = obj[key];
      }
    }
  }
  
  return result;
}

// Translate the Arabic translations
const translatedArTranslations = translateArabicValues(arTranslations);

// Write the translated file back
fs.writeFileSync('translations/ar.json', JSON.stringify(translatedArTranslations, null, 2), 'utf8');

console.log('Arabic translations updated successfully!');
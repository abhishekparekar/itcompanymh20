// ============================================================
// iCoded Automation Pvt. Ltd. — Site-Wide Data Constants
// ============================================================

export const COMPANY = {
  name: 'iCoded Automation Pvt. Ltd.',
  shortName: 'iCoded',
  tagline: 'Transforming Business Ideas into Powerful Digital Solutions.',
  website: 'https://icoded.in',
  email: 'hello@icoded.in',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  address: 'iCoded Automation Pvt. Ltd., Tech Park, Coimbatore, Tamil Nadu - 641001',
  founded: '2019',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125323.19787348783!2d76.91271479551085!3d11.004555861788037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1720341000000',
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services', hasMegaMenu: true },
  { label: 'Products', path: '/products' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES = [
  { icon: 'FaGlobe',          title: 'Website Development',       desc: 'Pixel-perfect, lightning-fast websites that convert visitors into customers.', color: '#0A66C2' },
  { icon: 'FaShoppingCart',   title: 'E-Commerce Development',    desc: 'Full-featured online stores with secure payments and seamless UX.',           color: '#7C3AED' },
  { icon: 'FaAndroid',        title: 'Android App Development',   desc: 'Scalable, high-performance Android applications for all industries.',         color: '#16A34A' },
  { icon: 'FaApple',          title: 'iOS App Development',       desc: 'Premium iOS experiences that delight users and drive engagement.',             color: '#0EA5E9' },
  { icon: 'FaCode',           title: 'Custom Software',           desc: 'Tailor-made enterprise software built around your exact business workflows.',  color: '#F59E0B' },
  { icon: 'FaChartBar',       title: 'ERP Solutions',             desc: 'End-to-end ERP systems to unify operations, finance, and supply chain.',      color: '#EF4444' },
  { icon: 'FaHandshake',      title: 'CRM Systems',               desc: 'Smart CRM to manage leads, relationships, and accelerate sales growth.',       color: '#8B5CF6' },
  { icon: 'FaUsers',          title: 'HRMS',                      desc: 'Complete HR management from recruitment to payroll, all in one platform.',    color: '#06B6D4' },
  { icon: 'FaGraduationCap',  title: 'Learning Management System',desc: 'Feature-rich LMS with live classes, assessments, and progress tracking.',     color: '#F97316' },
  { icon: 'FaBoxes',          title: 'Inventory Management',      desc: 'Real-time inventory tracking across warehouses, branches, and stores.',        color: '#10B981' },
  { icon: 'FaCashRegister',   title: 'POS Software',              desc: 'Intuitive point-of-sale systems for retail, restaurants, and hospitality.',    color: '#EC4899' },
  { icon: 'FaFileInvoice',    title: 'Billing Software',          desc: 'Fast, accurate billing with GST compliance and automated reporting.',          color: '#6366F1' },
  { icon: 'FaIndustry',       title: 'Manufacturing Software',    desc: 'Production planning, quality control, and OEE dashboards in one system.',     color: '#78716C' },
  { icon: 'FaHospital',       title: 'Hospital Management',       desc: 'Integrated HMS covering patient records, lab, pharmacy, and billing.',         color: '#DC2626' },
  { icon: 'FaSchool',         title: 'School Management',         desc: 'Comprehensive school ERP for academics, fees, and parent communication.',     color: '#059669' },
  { icon: 'FaTruck',          title: 'Milk Distribution Software',desc: 'Route-based milk distribution with customer tracking and delivery reporting.',  color: '#0284C7' },
  { icon: 'FaCloud',          title: 'Cloud Solutions',           desc: 'AWS, Azure, and GCP-based infrastructure, migration, and DevOps services.',   color: '#0EA5E9' },
  { icon: 'FaRobot',          title: 'Business Automation',       desc: 'AI-driven RPA and workflow automation to eliminate repetitive tasks.',         color: '#7C3AED' },
  { icon: 'FaPlug',           title: 'API Integration',           desc: 'Seamless third-party API integration to unify your software ecosystem.',       color: '#F59E0B' },
  { icon: 'FaHeadset',        title: 'Support & Maintenance',     desc: '24×7 dedicated support and maintenance to keep your software running perfectly.',color: '#14B8A6' },
];

export const PRODUCTS = [
  {
    name: 'HRMS Pro',
    tagline: 'Complete Human Resource Management',
    features: ['Employee Profiles', 'Payroll & TDS', 'Attendance & Leave', 'Performance Reviews'],
    color: '#0A66C2',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    name: 'EduLearn LMS',
    tagline: 'Powerful Learning Management System',
    features: ['Live & Recorded Classes', 'Assessments', 'Certificates', 'Analytics Dashboard'],
    color: '#7C3AED',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    name: 'SalesCRM',
    tagline: 'Smart CRM for Growing Businesses',
    features: ['Lead Management', 'Pipeline Tracking', 'Email Automation', 'Reports & KPIs'],
    color: '#16A34A',
    gradient: 'from-green-600 to-emerald-400',
  },
  {
    name: 'EnterprisERP',
    tagline: 'Unified Enterprise Resource Planning',
    features: ['Finance & Accounting', 'Supply Chain', 'Production Planning', 'Multi-Branch'],
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    name: 'MilkRoute',
    tagline: 'Dairy Distribution Management',
    features: ['Route Planning', 'Customer Billing', 'Collection Reports', 'Mobile App'],
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-400',
  },
  {
    name: 'PayrollX',
    tagline: 'Automated Payroll & Compliance',
    features: ['Salary Processing', 'GST & TDS', 'PF & ESI', 'Payslip Portal'],
    color: '#EC4899',
    gradient: 'from-pink-600 to-rose-400',
  },
];

export const INDUSTRIES = [
  { icon: 'FaGraduationCap', label: 'Education',       color: '#0A66C2' },
  { icon: 'FaHospital',      label: 'Healthcare',      color: '#EF4444' },
  { icon: 'FaIndustry',      label: 'Manufacturing',   color: '#78716C' },
  { icon: 'FaUniversity',    label: 'Finance',         color: '#F59E0B' },
  { icon: 'FaShoppingBag',   label: 'Retail',          color: '#10B981' },
  { icon: 'FaUtensils',      label: 'Restaurant',      color: '#F97316' },
  { icon: 'FaHome',          label: 'Real Estate',     color: '#8B5CF6' },
  { icon: 'FaHardHat',       label: 'Construction',    color: '#D97706' },
  { icon: 'FaSeedling',      label: 'Agriculture',     color: '#16A34A' },
  { icon: 'FaLandmark',      label: 'Government',      color: '#0E7490' },
  { icon: 'FaTruck',         label: 'Logistics',       color: '#7C3AED' },
  { icon: 'FaBus',           label: 'Transportation',  color: '#DB2777' },
];

export const TECHNOLOGIES = [
  { name: 'React',       icon: 'FaReact',      color: '#61DAFB' },
  { name: 'Next.js',     icon: 'SiNextdotjs',  color: '#000000' },
  { name: 'Node.js',     icon: 'FaNodeJs',     color: '#339933' },
  { name: 'Laravel',     icon: 'FaLaravel',    color: '#FF2D20' },
  { name: 'PHP',         icon: 'FaPhp',        color: '#777BB4' },
  { name: 'Python',      icon: 'FaPython',     color: '#3776AB' },
  { name: 'Flutter',     icon: 'SiFlutter',    color: '#02569B' },
  { name: 'Firebase',    icon: 'SiFirebase',   color: '#FFCA28' },
  { name: 'MongoDB',     icon: 'SiMongodb',    color: '#47A248' },
  { name: 'MySQL',       icon: 'SiMysql',      color: '#4479A1' },
  { name: 'AWS',         icon: 'FaAws',        color: '#FF9900' },
  { name: 'Docker',      icon: 'FaDocker',     color: '#2496ED' },
  { name: 'Android',     icon: 'FaAndroid',    color: '#3DDC84' },
  { name: 'Java',        icon: 'FaJava',       color: '#007396' },
  { name: 'Git',         icon: 'FaGitAlt',     color: '#F05032' },
  { name: 'Linux',       icon: 'FaLinux',      color: '#FCC624' },
];

export const WHY_US = [
  {
    icon: 'FaUserCheck',
    title: 'Experienced Engineers',
    desc: '5+ years average experience across our engineering team. Architects, not just coders.',
    color: '#0A66C2',
  },
  {
    icon: 'FaMicrochip',
    title: 'Modern Technologies',
    desc: 'We build with React, Flutter, Node.js, AWS, and the latest tech that scales.',
    color: '#7C3AED',
  },
  {
    icon: 'FaBolt',
    title: 'Agile Process',
    desc: 'Sprint-based delivery with weekly demos so you always see real progress.',
    color: '#F59E0B',
  },
  {
    icon: 'FaExpand',
    title: 'Scalable Solutions',
    desc: 'Architecture built to grow from 100 to 1 million users without rewrites.',
    color: '#10B981',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Enterprise Security',
    desc: 'OWASP compliance, data encryption, and regular security audits included.',
    color: '#EF4444',
  },
  {
    icon: 'FaRupeeSign',
    title: 'Affordable Pricing',
    desc: 'Startup-friendly pricing with enterprise-grade quality — the best ROI.',
    color: '#EC4899',
  },
  {
    icon: 'FaRocket',
    title: 'Fast Delivery',
    desc: 'MVP in 4 weeks. Full product in 3 months. We ship fast without cutting corners.',
    color: '#06B6D4',
  },
  {
    icon: 'FaHeadset',
    title: '24×7 Support',
    desc: 'Round-the-clock monitoring, incident response, and dedicated account manager.',
    color: '#8B5CF6',
  },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery',   desc: 'Deep-dive consultation to understand your business goals, users, and technical requirements.',      icon: 'FaSearch' },
  { step: '02', title: 'Research',    desc: 'Market analysis, competitor benchmarking, and technical feasibility assessment.',                    icon: 'FaFlask' },
  { step: '03', title: 'UI/UX Design',desc: 'Wireframes, interactive prototypes, and pixel-perfect Figma designs reviewed with you.',             icon: 'FaPencilRuler' },
  { step: '04', title: 'Development', desc: 'Clean, documented, test-driven code built in 2-week sprints with daily progress updates.',           icon: 'FaCode' },
  { step: '05', title: 'Testing',     desc: 'Manual QA, automated tests, performance profiling, and security audit before release.',              icon: 'FaBug' },
  { step: '06', title: 'Deployment',  desc: 'Zero-downtime CI/CD deployment to AWS, Azure, or your preferred cloud infrastructure.',              icon: 'FaRocket' },
  { step: '07', title: 'Support',     desc: '3 months free post-launch support, SLA-backed maintenance, and ongoing feature development.',        icon: 'FaHeadset' },
];

export const STATS = [
  { value: 100,  suffix: '+', label: 'Projects Delivered',  icon: 'FaProjectDiagram' },
  { value: 50,   suffix: '+', label: 'Happy Clients',       icon: 'FaSmile' },
  { value: 5,    suffix: '+', label: 'Years Experience',    icon: 'FaCalendarAlt' },
  { value: 99,   suffix: '%', label: 'Client Satisfaction', icon: 'FaStar' },
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, RetailNexus Pvt. Ltd.',
    content: 'iCoded built our entire ERP from scratch. The quality, speed, and post-launch support have been exceptional. Our operations are 3× more efficient now.',
    rating: 5,
    avatar: 'RK',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    name: 'Priya Shankar',
    role: 'CTO, EduVerse Technologies',
    content: 'Our LMS platform built by iCoded handles 50,000+ students without a single hiccup. The UI is beautiful and teachers love it.',
    rating: 5,
    avatar: 'PS',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    name: 'Mohammed Faiz',
    role: 'Founder, QuickDeliver Logistics',
    content: 'From concept to launch in 6 weeks. iCoded\'s team is incredibly fast and professional. Our delivery tracking app is now our biggest competitive advantage.',
    rating: 5,
    avatar: 'MF',
    gradient: 'from-green-600 to-teal-500',
  },
  {
    name: 'Anitha Rajan',
    role: 'Director, HealthFirst Hospitals',
    content: 'The HMS iCoded developed has completely transformed our patient management. Appointment booking, billing, and pharmacy — all integrated perfectly.',
    rating: 5,
    avatar: 'AR',
    gradient: 'from-rose-600 to-orange-500',
  },
  {
    name: 'Suresh Naidu',
    role: 'MD, Lakshmi Dairy Farms',
    content: 'The MilkRoute software is a game-changer for us. Route optimization alone saves us ₹40,000 per month. Couldn\'t be happier with the results.',
    rating: 5,
    avatar: 'SN',
    gradient: 'from-amber-500 to-yellow-400',
  },
];

export const FAQS = [
  {
    question: 'How long does it take to build a custom software?',
    answer: 'Timelines vary by complexity. A standard web app takes 6–10 weeks. Enterprise ERP/CRM projects typically take 3–5 months. We always provide a detailed timeline after the discovery call.',
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We work across the full stack: React, Next.js, Node.js, Laravel, Flutter for mobile, AWS/Azure/GCP for cloud, and MySQL/MongoDB/PostgreSQL for databases.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes! Every project comes with 3 months of free post-launch support. We also offer flexible AMC (Annual Maintenance Contracts) for ongoing support, updates, and monitoring.',
  },
  {
    question: 'Can you work with our existing codebase or infrastructure?',
    answer: 'Absolutely. We regularly take over and modernize legacy codebases. We\'ll audit your current system, identify pain points, and propose a phased migration strategy.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'We use Slack or Microsoft Teams for daily communication, Jira for task tracking, and host weekly video calls to demonstrate progress. You\'re never in the dark.',
  },
  {
    question: 'Do you sign an NDA before starting the project?',
    answer: 'Yes, we sign a comprehensive NDA before any business discussion. Your idea and all project details are 100% confidential.',
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer both Fixed Price (for well-defined projects) and Time & Material models. After the discovery call, we provide a detailed quote with no hidden charges.',
  },
];

export const BLOGS = [
  {
    title: '10 Signs Your Business Needs Custom Software in 2025',
    excerpt: 'Off-the-shelf tools have limits. Discover the telltale signs that it\'s time to invest in custom software built for your exact workflow.',
    category: 'Business',
    date: 'June 15, 2025',
    readTime: '5 min read',
    color: '#0A66C2',
  },
  {
    title: 'How AI Automation is Cutting Operational Costs by 40%',
    excerpt: 'Real-world case studies on how Indian SMEs are using business automation tools to reduce costs and accelerate growth.',
    category: 'Automation',
    date: 'June 8, 2025',
    readTime: '7 min read',
    color: '#7C3AED',
  },
  {
    title: 'React Native vs Flutter: Which to Choose in 2025?',
    excerpt: 'An unbiased technical comparison of the two leading cross-platform mobile frameworks to help you make the right investment.',
    category: 'Technology',
    date: 'May 30, 2025',
    readTime: '6 min read',
    color: '#10B981',
  },
];

export const TRUST_LOGOS = [
  'TechCorp', 'Innovate Inc', 'ScaleUP', 'DataVision', 'CloudNest',
  'HealthFirst', 'EduVerse', 'RetailNexus', 'ManufactPro', 'FinEdge',
  'SwiftLog', 'AgroTech', 'BuildSmart', 'PharmaPlus', 'LegalEase',
];

export const PORTFOLIO_PROJECTS = [
  { title: 'RetailNexus ERP',       category: 'ERP',        tech: ['React', 'Node.js', 'MySQL'],    color: 'from-blue-600 to-cyan-500' },
  { title: 'EduVerse LMS',          category: 'SaaS',       tech: ['Next.js', 'Firebase'],           color: 'from-purple-600 to-pink-500' },
  { title: 'QuickDeliver App',      category: 'Mobile App', tech: ['Flutter', 'Firebase'],           color: 'from-green-600 to-teal-500' },
  { title: 'HealthFirst HMS',       category: 'Dashboard',  tech: ['React', 'Laravel', 'MySQL'],     color: 'from-rose-600 to-orange-500' },
  { title: 'MilkRoute Distribution',category: 'ERP',        tech: ['React', 'Node.js'],              color: 'from-amber-500 to-yellow-400' },
  { title: 'Lakshmi E-Commerce',    category: 'Website',    tech: ['Next.js', 'MongoDB'],            color: 'from-sky-500 to-blue-400' },
];

// EmailJS Configuration (replace with your actual credentials)
export const EMAILJS = {
  serviceId:  'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey:  'YOUR_PUBLIC_KEY',
};

// sectionsConfig.js
import { AboutSection } from './AboutSection.js';
import { NewsSection } from './NewsSection.js';
import { AdmissionSection } from './AdmissionSection.js';
import { FaqSection } from './FaqSection.js';
import { CurriculumSection } from './CurriculumSection.js';
import { TeachersSection } from './TeachersSection.js';
import { ChildObservationSection } from './ChildObservationSection.js';
import { StudentDevelopmentSection } from './StudentDevelopmentSection.js';

export const sections = [
  {
    id: 'about',
    component: AboutSection,
    componentName: 'AboutSection',
    title: '認識同心',
    path: '#about',
    backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true, // Indicates if it's a <section> tag
    className: 'section py-5'
  },
  {
    id: 'news',
    component: NewsSection,
    componentName: 'NewsSection',
    title: '最新消息',
    path: '#news',
    backgroundImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true,
    className: 'section py-5'
  },
  {
    id: 'admission',
    component: AdmissionSection,
    componentName: 'AdmissionSection',
    title: '申請入學',
    path: '#admission',
    backgroundImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true,
    className: 'section py-5'
  },
  {
    id: 'faq',
    component: FaqSection,
    componentName: 'FaqSection',
    title: '常見問題',
    path: '#faq',
    backgroundImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true,
    className: 'section py-5'
  },
  {
    id: 'curriculum',
    component: CurriculumSection,
    componentName: 'CurriculumSection',
    title: '課程安排',
    path: '#curriculum',
    backgroundImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true,
    className: 'section'
  },
  {
    id: 'student-development-section',
    component: StudentDevelopmentSection,
    componentName: 'StudentDevelopmentSection',
    title: '學生發展圖像',
    path: '#student-development-section',
    isSectionTag: false, // This is a div
    className: 'container subsection',
    style: { 'margin-top': '60px' }
  },
  {
    id: 'teachers',
    component: TeachersSection,
    componentName: 'TeachersSection',
    title: '教師團隊',
    path: '#teachers',
    backgroundImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true,
    className: 'section'
  },
  {
    id: 'child-observation',
    component: ChildObservationSection,
    componentName: 'ChildObservationSection',
    title: '兒童觀察',
    path: '#child-observation',
    backgroundImage: 'https://images.unsplash.com/photo-1523050620-735220702903?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    isSectionTag: true,
    className: 'section'
  },
];

const { ref, onMounted, onUnmounted } = Vue;

// Import all components
import { FaqSection, faqData } from './FaqSection.js';
import { CurriculumSection } from './CurriculumSection.js';
import { curriculumData } from './curriculumData.js';
import { TeachersSection } from './TeachersSection.js';
import { teachersData } from './teachersData.js';

import { FooterSection } from './FooterSection.js';

import { NewsSection } from './NewsSection.js';
import { newsData } from './newsData.js';
import { AdmissionSection } from './AdmissionSection.js';

import { NavBar } from './NavBar.js';
import { HomeSection } from './HomeSection.js';
import { homeData } from './homeData.js';
import { curriculumTableData } from './curriculumTableData.js';

export const RootApp = {
  components: {
    FaqSection,
    CurriculumSection,
    TeachersSection,
    FooterSection,
    NewsSection,
    AdmissionSection,
    NavBar,
    HomeSection
  },
  setup() {
    const activeTheme = ref('isabelle'); // Reactive state for the active theme

    const showThemeSwitcher = ref(true); // Initially visible

    const toggleThemeSwitcher = () => {
      showThemeSwitcher.value = !showThemeSwitcher.value;
    };

    const switchTheme = (theme) => {
      activeTheme.value = theme;
      document.body.classList.remove('theme-isabelle', 'theme-material', 'theme-neumorphism', 'theme-dark', 'theme-minimalist', 'theme-watercolor');
      document.body.classList.add(`theme-${theme}`);
    };

    // Initial theme application

    const smoothScroll = async (event) => {
      event.preventDefault();
      const href = event.currentTarget.getAttribute('href');
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close the mobile menu (Bootstrap collapse)
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
          bsCollapse.hide();
        }
      }
    };

    // Navbar Scroll Effect
    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            }
        }
    };

    // Parallax scrolling for hero background
    const handleParallaxScroll = () => {
        const heroSection = document.querySelector('.hero[data-parallax="scroll"]');
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            // Adjust the parallax speed as needed (e.5 for slower movement)
            heroSection.style.backgroundPositionY = `${-scrollPosition * 0.5}px`;
        }
    };

    // Manual scrollspy implementation
    const handleScrollSpy = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const scrollPosition = window.scrollY + 150; // Offset for fixed navbar
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    onMounted(() => {
      // Initial theme application
      document.body.classList.add(`theme-${activeTheme.value}`);

      // Initialize manual scrollspy after components are mounted
      setTimeout(() => {
        handleScrollSpy(); // Initial call to set active link
      }, 500);

      // Intersection Observer for fade-in elements
      const fadeElements = document.querySelectorAll('.fade-in');

      const observerOptions = {
          root: null, // Use the viewport as the root
          rootMargin: '0px',
          threshold: 0.1 // Trigger when 10% of the element is visible
      };

      const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target); // Stop observing once visible
              }
          });
      }, observerOptions);

      fadeElements.forEach(element => {
          observer.observe(element);
      });

      // Add scroll event listeners (keep existing ones)
      window.addEventListener('scroll', handleNavbarScroll);
      window.addEventListener('scroll', handleParallaxScroll);
      window.addEventListener('scroll', handleScrollSpy);
    });

    onUnmounted(() => {
      // Clean up scroll event listeners when component is unmounted
      window.removeEventListener('scroll', handleNavbarScroll);
      window.removeEventListener('scroll', handleParallaxScroll);
      window.removeEventListener('scroll', handleScrollSpy);
    });

    return {
      activeTheme,
      switchTheme,
      showThemeSwitcher,
      toggleThemeSwitcher,
      smoothScroll,
      faqData, // Expose FAQ data to the template
      newsData, // Expose News data to the template
      // admissionData, // Expose Admission data to the template
      curriculumData, // Expose Curriculum data to the template
      homeData,
      curriculumTableData,
      teachersData // Expose Teachers data to the template
    };
  },
  template: `
    <!-- 導航欄 -->
    <NavBar :smoothScroll="smoothScroll" :showThemeSwitcher="showThemeSwitcher" :toggleThemeSwitcher="toggleThemeSwitcher" />
    <!-- 風格切換器 -->
    <div :class="['theme-switcher', { 'hidden': !showThemeSwitcher }]" >
    <h3>選擇設計風格</h3>
    <div class="theme-options">
    <button :class="['btn', 'btn-outline-primary', {'active': activeTheme === 'isabelle'}]" @click="switchTheme('isabelle')" data-theme="isabelle">Isabelle Simler</button>
    <button :class="['btn', 'btn-outline-primary', {'active': activeTheme === 'material'}]" @click="switchTheme('material')" data-theme="material">Material Design</button>
    <button :class="['btn', 'btn-outline-primary', {'active': activeTheme === 'neumorphism'}]" @click="switchTheme('neumorphism')" data-theme="neumorphism">Neumorphism</button>
    <button :class="['btn', 'btn-outline-primary', {'active': activeTheme === 'dark'}]" @click="switchTheme('dark')" data-theme="dark">Dark Mode</button>
    <button :class="['btn', 'btn-outline-primary', {'active': activeTheme === 'minimalist'}]" @click="switchTheme('minimalist')" data-theme="minimalist">Minimalist</button>
    <button :class="['btn', 'btn-outline-primary', {'active': activeTheme === 'watercolor'}]" @click="switchTheme('watercolor')" data-theme="watercolor">Water Color</button>
    </div>
    </div>
    <!-- 主橫幅 -->
    <section class="hero" id="home" data-parallax="scroll">
    <div class="hero-content text-center">
    <h1>同心華德福實驗教育機構</h1>
    <p class="lead">從幼兒園到高中，您是否也在找尋教育孩子們的不同路徑？邀請您，成為同心的夥伴！</p>
    <a class="btn btn-primary btn-lg" href="#about">認識我們</a>
    </div>
    <div class="scroll-indicator">
    <i class="fas fa-chevron-down"></i>
    </div>
    </section>
    <home-section :videos="homeData" />
    
    <!-- 最新消息 -->
    <section class="section py-5" id="news" style="background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');">
    <news-section :newsItems="newsData" />
    </section>
    <!-- 申請入學 -->
    <section class="section py-5" id="admission" style="background-image: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');">
    <admission-section/>
    </section>
    <!-- 常見問題 -->
    <section class="section py-5" id="faq" style="background-image: url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');">
    <faq-section :faqs="faqData" />
    </section>
    <!-- 課程安排 -->
    <section class="section" id="curriculum" style="background-image: url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');">
    <curriculum-section :curriculumData="curriculumData" :curriculumTableData="curriculumTableData" />
    </section>

    
    <!-- 教師團隊 -->
    <section class="section" id="teachers" style="background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');">
    <teachers-section :teachersData="teachersData" />
    </section>
    
    <!-- 頁腳 -->
    <footer id="footer">
    <footer-section />
    </footer>


    <!-- Modal -->
    <div id="development-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h3 id="modal-title"></h3>
            <div id="modal-body">
            </div>
        </div>
    </div>
  `
};
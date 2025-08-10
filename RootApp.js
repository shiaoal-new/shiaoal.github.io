const { ref, onMounted, onUnmounted, reactive, computed, nextTick } = Vue;

// Import sections configuration
import { sections } from './sectionsConfig.js';
import { NavBar } from './NavBar.js';
import { FooterSection } from './FooterSection.js';
import { faqData } from './FaqSection.js'; // faqData is still needed for FaqSection prop

export const RootApp = {
  components: {
    NavBar,
    FooterSection,
    ...sections.reduce((acc, section) => {
      acc[section.componentName] = section.component;
      return acc;
    }, {}),
  },
  setup() {
    const activeTheme = ref('isabelle'); // Reactive state for the active theme

    // Reactive object for lazy loading sections
    const sectionLoadedState = reactive({});

    const getSectionStyle = computed(() => (section) => {
      const style = {};
      if (section.backgroundImage) {
        style.backgroundImage = `url('${section.backgroundImage}')`;
      }
      if (section.style) {
        Object.assign(style, section.style);
      }
      return style;
    });

    const switchTheme = (theme) => {
      activeTheme.value = theme;
      document.body.classList.remove('theme-isabelle', 'theme-material', 'theme-neumorphism', 'theme-dark', 'theme-minimalist', 'theme-watercolor');
      document.body.classList.add(`theme-${theme}`);
    };

    const smoothScroll = async (event) => {
      event.preventDefault();
      const href = event.currentTarget.getAttribute('href');
      const targetId = href.substring(1);
      let targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const placeholder = document.getElementById(targetId + '-placeholder');
        if (placeholder) {
          placeholder.scrollIntoView({ behavior: 'auto', block: 'start' });

          const observer = new MutationObserver((mutationsList, observer) => {
            for(const mutation of mutationsList) {
              if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                  if (node.id === targetId) {
                    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    observer.disconnect();
                    return;
                  }
                }
              }
            }
          });

          observer.observe(placeholder.parentNode, { childList: true, subtree: true });
        }
      }

      // Close the mobile menu (Bootstrap collapse)
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
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

    onMounted(() => {
      // Initial theme application
      document.body.classList.add(`theme-${activeTheme.value}`);

      // Intersection Observer for fade-in elements - will be created and used dynamically
      const fadeInObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  observer.unobserve(entry.target); // Stop observing once visible
              }
          });
      }, { root: null, rootMargin: '0px', threshold: 0.01 });

      // Intersection Observer for lazy loading sections
      const sectionObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const sectionId = entry.target.id.replace('-placeholder', '');
                  sectionLoadedState[sectionId] = true;
                  observer.unobserve(entry.target);

                  nextTick(() => {
                      const elementToFadeIn = document.getElementById(sectionId);
                      if (elementToFadeIn && elementToFadeIn.classList.contains('fade-in')) {
                          fadeInObserver.observe(elementToFadeIn);
                      }
                  });
              }
          });
      }, { root: null, rootMargin: '0px', threshold: 0.01 });

      // Observe each section placeholder and initialize loaded state
      sections.forEach(section => {
          sectionLoadedState[section.id] = false; // Initialize to false
          const placeholder = document.getElementById(section.id + '-placeholder');
          if (placeholder) {
            sectionObserver.observe(placeholder);
          }
      });

      // Add scroll event listeners (keep existing ones)
      window.addEventListener('scroll', handleNavbarScroll);
      window.addEventListener('scroll', handleParallaxScroll);
    });

    onUnmounted(() => {
      // Clean up scroll event listeners when component is unmounted
      window.removeEventListener('scroll', handleNavbarScroll);
      window.removeEventListener('scroll', handleParallaxScroll);
    });

    return {
      activeTheme,
      switchTheme,
      smoothScroll,
      faqData, // Expose FAQ data to the template
      sectionLoadedState,
      sections, // Expose sections to the template for v-for
      getSectionStyle
    };
  },
  template: `
    <!-- 導航欄 -->
    <nav-bar :smoothScroll="smoothScroll" />
    <!-- 風格切換器 -->
    <div class="theme-switcher">
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

    <template v-for="section in sections" :key="section.id">
      <div :id="section.id + '-placeholder'" class="section-placeholder">
        <component
          :is="section.componentName"
          v-if="sectionLoadedState[section.id]"
          :id="section.id"
          :class="section.className + (section.isSectionTag ? ' fade-in' : '')"
          :style="getSectionStyle(section)"
          :faqs="section.id === 'faq' ? faqData : undefined"
        />
      </div>
    </template>

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
// 風格切換功能
        const themeButtons = document.querySelectorAll('.theme-btn');
        const body = document.body;
        let holisticDevelopmentChart;

        function updateChartColors() {
            if (!holisticDevelopmentChart) return;
            const computedStyle = getComputedStyle(body);
            const primaryColor = computedStyle.getPropertyValue('--primary-color').trim();
            const secondaryColor = computedStyle.getPropertyValue('--secondary-color').trim();
            const textColor = computedStyle.getPropertyValue('--text-color').trim();

            holisticDevelopmentChart.data.datasets[0].borderColor = primaryColor;
            holisticDevelopmentChart.data.datasets[0].backgroundColor = secondaryColor + '80'; // Add transparency
            holisticDevelopmentChart.options.scales.r.pointLabels.color = textColor;
            holisticDevelopmentChart.options.scales.r.grid.color = textColor + '40';
            holisticDevelopmentChart.options.scales.r.angleLines.color = textColor + '40';
            holisticDevelopmentChart.update();
        }
        
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                
                // 移除所有主題類
                body.classList.remove('theme-isabelle', 'theme-material', 'theme-neumorphism', 'theme-dark', 'theme-minimalist', 'theme-watercolor');
                
                // 添加新主題類
                body.classList.add(`theme-${theme}`);
                
                // 更新活動按鈕狀態
                themeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // 更新圖表顏色
                updateChartColors();
            });
        });
        
        // 漢堡菜單切換
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Submenu toggle for mobile
        const hasSubmenuItems = document.querySelectorAll('.nav-links li.has-submenu');

        hasSubmenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Only toggle submenu on mobile (when navLinks is active)
                if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
                    this.classList.toggle('active'); // Toggle a class to show/hide submenu
                }
            });
        });
        
        
        
        
        
        // 滾動動畫
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const checkFade = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };
        
        // 初始檢查
        checkFade();
        
        // 滾動時檢查
        window.addEventListener('scroll', checkFade);
        
        // 導航欄滾動效果
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            }
        });


// 學生發展圖像 Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('development-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const developmentCards = document.querySelectorAll('.development-card');

    developmentCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const description = card.querySelector('.development-card-description').innerHTML;
            modalTitle.innerText = title;
            modalBody.innerHTML = description;
            modal.style.display = 'block';
        });
    });

    const faqCards = document.querySelectorAll('.faq-card');

    faqCards.forEach(clickedCard => {
        const clickedFaqQuestion = clickedCard.querySelector('.faq-question');
        const clickedFaqAnswer = clickedCard.querySelector('.faq-card-answer');

        clickedFaqQuestion.addEventListener('click', () => {
            // Close all other FAQ items
            faqCards.forEach(otherCard => {
                if (otherCard !== clickedCard) {
                    const otherFaqQuestion = otherCard.querySelector('.faq-question');
                    const otherFaqAnswer = otherCard.querySelector('.faq-card-answer');
                    if (otherFaqQuestion.classList.contains('active')) {
                        otherFaqQuestion.classList.remove('active');
                        otherFaqAnswer.style.maxHeight = null;
                        otherFaqAnswer.classList.remove('active');
                    }
                }
            });

            // Toggle the clicked FAQ item
            clickedFaqQuestion.classList.toggle('active');
            if (clickedFaqQuestion.classList.contains('active')) {
                clickedFaqAnswer.style.maxHeight = clickedFaqAnswer.scrollHeight + "px";
                clickedFaqAnswer.classList.add('active');
            } else {
                clickedFaqAnswer.style.maxHeight = null;
                clickedFaqAnswer.classList.remove('active');
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => { // Changed selector
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Delay closing the mobile menu slightly
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 500); // Adjust delay as needed
            }
        });
    });
});

// Parallax scrolling for hero background
document.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero[data-parallax="scroll"]');
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        // Adjust the parallax speed as needed (e.g., 0.5 for slower movement)
        heroSection.style.backgroundPositionY = `${-scrollPosition * 0.5}px`;
    }
});

// Dynamic content loading
async function loadSectionContent(sectionId, url) {
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) {
        console.error(`Section with ID ${sectionId} not found.`);
        return;
    }

    // Check if content is already loaded
    if (sectionElement.dataset.loaded) {
        console.log(`Content for ${sectionId} already loaded.`);
        return;
    }

    // Determine the correct placeholder element
    let contentPlaceholder;
    if (sectionId === 'faq') {
        contentPlaceholder = document.getElementById('faq-content-placeholder');
    } else if (sectionId === 'student-development-section') {
        contentPlaceholder = document.getElementById('student-development-content-placeholder');
    } else {
        // Fallback for other sections if they are added later without specific placeholders
        contentPlaceholder = sectionElement.querySelector('.container');
    }

    if (!contentPlaceholder) {
        console.error(`Content placeholder for ${sectionId} not found.`);
        return;
    }

    // Display loading message
    contentPlaceholder.innerHTML = `<p>Loading content...</p>`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();

        contentPlaceholder.innerHTML = content;
        sectionElement.dataset.loaded = 'true'; // Mark as loaded

        // Explicitly add 'visible' class to newly loaded fade-in elements
        const newFadeElements = contentPlaceholder.querySelectorAll('.fade-in');
        newFadeElements.forEach(el => el.classList.add('visible'));

        // Re-initialize any scripts or event listeners within the loaded content
        if (sectionId === 'faq') {
            initializeFaqAccordions();
        }
        if (sectionId === 'student-development-section') {
            initializeDevelopmentCards();
        }
    } catch (error) {
        console.error(`Could not load content for ${sectionId}:`, error);
        contentPlaceholder.innerHTML = `<p>Failed to load content for this section. Please try again later.</p>`;
    }
}

// Re-initialize FAQ accordions after content is loaded
function initializeFaqAccordions() {
    const faqCards = document.querySelectorAll('#faq .faq-card');
    faqCards.forEach(clickedCard => {
        const clickedFaqQuestion = clickedCard.querySelector('.faq-question');
        const clickedFaqAnswer = clickedCard.querySelector('.faq-card-answer');

        clickedFaqQuestion.addEventListener('click', () => {
            faqCards.forEach(otherCard => {
                if (otherCard !== clickedCard) {
                    const otherFaqQuestion = otherCard.querySelector('.faq-question');
                    const otherFaqAnswer = otherCard.querySelector('.faq-card-answer');
                    if (otherFaqQuestion.classList.contains('active')) {
                        otherFaqQuestion.classList.remove('active');
                        otherFaqAnswer.style.maxHeight = null;
                        otherFaqAnswer.classList.remove('active');
                    }
                }
            });

            clickedFaqQuestion.classList.toggle('active');
            if (clickedFaqQuestion.classList.contains('active')) {
                clickedFaqAnswer.style.maxHeight = clickedFaqAnswer.scrollHeight + "px";
                clickedFaqAnswer.classList.add('active');
            } else {
                clickedFaqAnswer.style.maxHeight = null;
                clickedFaqAnswer.classList.remove('active');
            }
        });
    });
}

// Re-initialize development cards modal after content is loaded
function initializeDevelopmentCards() {
    const modal = document.getElementById('development-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    const developmentCards = document.querySelectorAll('#student-development-section .development-card');

    developmentCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const description = card.querySelector('.development-card-description').innerHTML;
            modalTitle.innerText = title;
            modalBody.innerHTML = description;
            modal.style.display = 'block';
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}


// Modify existing smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', async function (e) { // Added async
            e.preventDefault();

            const href = this.getAttribute('href');
            const targetId = href.substring(1); // Remove '#'
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const dataSrc = targetSection.getAttribute('data-src');
                if (dataSrc && !targetSection.dataset.loaded) {
                    await loadSectionContent(targetId, dataSrc);
                }
                
                targetSection.scrollIntoView({ behavior: 'smooth' });

                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 500);
            }
        });
    });

    // Initial load for sections that might be visible on page load (e.g., if linked directly)
    const initialSectionsToLoad = [];//'faq', 'student-development-section'];
    initialSectionsToLoad.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.getAttribute('data-src') && !section.dataset.loaded) {
            // Only load if it's in the viewport or very close
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                loadSectionContent(id, section.getAttribute('data-src'));
            }
        }
    });
});

// Chart.js for student development (if applicable)
function createHolisticDevelopmentChart() {
    const ctx = document.getElementById('holisticDevelopmentChart');
    if (ctx) {
        holisticDevelopmentChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['認知發展', '情感發展', '意志發展', '社會發展', '精神發展'],
                datasets: [{
                    label: '學生發展圖像',
                    data: [4, 5, 4, 5, 3], // Example data
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(75, 192, 192)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5,
                        ticks: {
                            display: false // Hide the numbers on the scale
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Hide the legend
                    }
                }
            }
        });
        updateChartColors(); // Apply current theme colors
    }
}

// Call this function after the student-development-content.html is loaded
// createHolisticDevelopmentChart(); // This will be called by initializeDevelopmentCards if needed

// Initial content load for sections that are immediately visible on page load
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToObserve = document.querySelectorAll('section[data-src], div.subsection[data-src]');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -100px 0px', // Load content when section is 100px from bottom of viewport
        threshold: 0 // Trigger as soon as any part of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionElement = entry.target;
                const sectionId = sectionElement.id;
                const dataSrc = sectionElement.getAttribute('data-src');

                console.log(`Section ${sectionId} is intersecting. Loading content...`); // Added console.log

                if (dataSrc && !sectionElement.dataset.loaded) {
                    loadSectionContent(sectionId, dataSrc);
                }
                // Optionally, stop observing once content is loaded
                // observer.unobserve(sectionElement);
            }
        });
    }, observerOptions);

    sectionsToObserve.forEach(section => {
        sectionObserver.observe(section);
    });
});

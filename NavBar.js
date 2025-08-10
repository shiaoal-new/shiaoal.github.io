const { ref, computed } = Vue;
import { sections } from './sectionsConfig.js';

export const NavBar = {
  props: ['smoothScroll'],
  setup(props) {
    const menuItems = computed(() => {
      const items = [
        { text: '首頁', href: '#home' },
      ];

      // Add sections to menu, excluding 'student-development-section' and 'curriculum' for now
      sections.forEach(section => {
        if (section.id !== 'student-development-section' && section.id !== 'curriculum') {
          items.push({ text: section.title, href: section.path });
        }
      });

      // Add the '課程安排' dropdown
      const curriculumSection = sections.find(s => s.id === 'curriculum');
      const studentDevelopmentSection = sections.find(s => s.id === 'student-development-section');

      if (curriculumSection && studentDevelopmentSection) {
        items.push({
          text: '課程安排',
          dropdown: [
            { text: curriculumSection.title, href: curriculumSection.path },
            { text: studentDevelopmentSection.title, href: studentDevelopmentSection.path }
          ]
        });
      }

      return items;
    });

    return {
      menuItems,
      smoothScroll: props.smoothScroll // Pass smoothScroll from parent
    };
  },
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand logo" href="#">同心華德福</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-for="(item, index) in menuItems" :key="index" :class="{'dropdown': item.dropdown}">
              <a v-if="!item.dropdown" class="nav-link" :href="item.href" @click="smoothScroll">{{ item.text }}</a>
              <a v-else class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ item.text }}</a>
              <ul v-if="item.dropdown" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li v-for="(subItem, subIndex) in item.dropdown" :key="subIndex">
                  <a class="dropdown-item" :href="subItem.href" @click="smoothScroll">{{ subItem.text }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
};
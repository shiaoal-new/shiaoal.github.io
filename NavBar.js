const { ref } = Vue;

export const NavBar = {
  props: ['smoothScroll'],
  setup(props) {
    const menuItems = ref([
      { text: '首頁', href: '#home' },
      { text: '最新消息', href: '#news' },
      { text: '申請入學', href: '#admission' },
      { text: '常見問題', href: '#faq' },
      {
        text: '課程安排',
        dropdown: [
          { text: '課程安排', href: '#curriculum' },
          { text: '學生發展圖像', href: '#student-development-section' }
        ]
      },
      { text: '教師團隊', href: '#teachers' }
    ]);

    return {
      menuItems,
      smoothScroll: props.smoothScroll // Pass smoothScroll from parent
    };
  },
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">同心華德福</a>
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
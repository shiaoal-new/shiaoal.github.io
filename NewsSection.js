export const NewsSection = {
  props: ['newsItems'],
  template: `
    <div class="container">
      <div class="section-title fade-in">
        <h2>消息與公告</h2>
        <p>掌握同心華德福的最新動態與重要公告</p>
      </div>
      <div class="news-list fade-in">
        <div class="news-item" v-for="(item, index) in newsItems" :key="index">
          <div class="news-date">
            <i class="fas fa-bullhorn"></i>
            <span>{{ item.title.includes('徵人') || item.title.includes('人才招募') ? '徵才' : '重要' }}</span>
          </div>
          <div class="news-content">
            <h3>{{ item.title }}</h3>
            <div v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  `
};
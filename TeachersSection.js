export const TeachersSection = {
  props: ['teachersData'],
  template: `
    <div class="container">
      <div class="section-title fade-in">
        <h2>教師團隊</h2>
        <p>同心華德福的專業教育團隊</p>
      </div>

      <!-- 領導團隊 -->
      <div class="teacher-category fade-in">
        <h3 class="category-title">
          <i class="fas fa-crown"></i>
          領導團隊
        </h3>
        <div class="teachers-grid">
          <div v-for="(teacher, index) in teachersData.leadership" :key="index" class="teacher-card detailed">
            <div class="teacher-header">
              <div class="teacher-img">
                <img v-if="teacher.photo" :src="teacher.photo" :alt="teacher.name" />
                <i v-else :class="teacher.icon"></i>
              </div>
              <div class="teacher-basic">
                <h4>{{ teacher.name }}</h4>
                <p class="position">{{ teacher.position }}</p>
              </div>
            </div>
            <div class="teacher-details">
              <div class="credentials">
                <h5>學經歷：</h5>
                <ul>
                  <li v-for="(credential, credIndex) in teacher.credentials" :key="credIndex">
                    {{ credential }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 專任教師群 -->
      <div class="teacher-category fade-in">
        <h3 class="category-title">
          <i class="fas fa-chalkboard-teacher"></i>
          專任教師群
        </h3>
        <div class="teachers-grid">
          <div v-for="(teacher, index) in teachersData.fullTimeTeachers" :key="index" class="teacher-card detailed">
            <div class="teacher-header">
              <div class="teacher-img">
                <img v-if="teacher.photo" :src="teacher.photo" :alt="teacher.name" />
                <i v-else :class="teacher.icon"></i>
              </div>
              <div class="teacher-basic">
                <h4>{{ teacher.name }}</h4>
                <p class="position">{{ teacher.position }}</p>
              </div>
            </div>
            <div class="teacher-details">
              <div v-if="teacher.motto" class="motto">
                <p>"{{ teacher.motto }}"</p>
              </div>
              <div v-if="teacher.credentials && teacher.credentials.length > 0" class="credentials">
                <h5>學經歷：</h5>
                <ul>
                  <li v-for="(credential, credIndex) in teacher.credentials" :key="credIndex">
                    {{ credential }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 兼任教師群 -->
      <div class="teacher-category fade-in">
        <h3 class="category-title">
          <i class="fas fa-users"></i>
          兼任教師群
        </h3>
        <div class="teachers-grid compact">
          <div v-for="(teacher, index) in teachersData.partTimeTeachers" :key="index" class="teacher-card compact">
            <div class="teacher-img">
              <i :class="teacher.icon"></i>
            </div>
            <div class="teacher-info">
              <h4>{{ teacher.name }}</h4>
              <p>{{ teacher.subject }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
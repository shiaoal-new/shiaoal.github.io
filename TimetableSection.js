export const TimetableSection = {
  props: ['timetableData'],
  data() {
    return {
      activeGrade: this.timetableData[0]?.grade || '',
      activeDay: '一',
      weekdays: ['一', '二', '三', '四', '五']
    };
  },
  methods: {
    handleGradeChange(event) {
      this.activeGrade = event.target.value;
    },
    setActiveDay(day) {
      this.activeDay = day;
    }
  },
  computed: {
    activeGradeData() {
      return this.timetableData.find(g => g.grade === this.activeGrade);
    },
    activeDayIndex() {
      return this.weekdays.indexOf(this.activeDay);
    }
  },
  template: `
    <div class="container" id="timetable-section">
      <div class="section-title fade-in">
        <h2>全校課表</h2>
        <p>各年級的課程時間表</p>
      </div>

      <!-- Grade Dropdown -->
      <div class="timetable-controls fade-in">
        <select @change="handleGradeChange" class="grade-select">
          <option v-for="grade in timetableData" :key="grade.grade" :value="grade.grade" :selected="activeGrade === grade.grade">
            {{ grade.grade }}
          </option>
        </select>
      </div>

      <!-- Day Tabs -->
      <ul class="nav nav-tabs justify-content-center fade-in">
        <li class="nav-item" v-for="day in weekdays" :key="day">
          <a class="nav-link" :class="{ active: activeDay === day }" @click.prevent="setActiveDay(day)" href="#">
            星期{{ day }}
          </a>
        </li>
      </ul>

      <!-- Timetable Content -->
      <div class="timetable-content fade-in">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>時間</th>
                <th>分鐘</th>
                <th>課程</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in activeGradeData.schedule" :key="row.time">
                <td>{{ row.time }}</td>
                <td>{{ row.duration }}</td>
                <td v-html="row.sessions[activeDayIndex]"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
};
export const TimetableSection = {
  props: ['timetableData'],
  data() {
    return {
      activeGrade: this.timetableData[0]?.grade || ''
    };
  },
  methods: {
    handleGradeChange(event) {
      this.activeGrade = event.target.value;
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

      <!-- Timetable Content -->
      <div class="timetable-content fade-in">
        <div v-for="grade in timetableData" :key="grade.grade" v-show="activeGrade === grade.grade">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th v-for="header in grade.headers" :key="header">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in grade.schedule" :key="row.time">
                  <td>{{ row.am_pm }}</td>
                  <td>{{ row.time }}</td>
                  <td>{{ row.duration }}</td>
                  <td v-for="session in row.sessions" v-html="session"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
};
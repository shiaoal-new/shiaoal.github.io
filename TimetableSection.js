export const TimetableSection = {
  props: ['timetableData'],
  template: `
    <div class="container" id="timetable-section">
      <div class="section-title fade-in">
        <h2>全校課表</h2>
        <p>各年級的課程時間表</p>
      </div>
      <div v-for="grade in timetableData" :key="grade.grade" class="fade-in">
        <h3>{{ grade.grade }}</h3>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
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
  `
};
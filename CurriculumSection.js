export const CurriculumSection = {
  template: `
    <div class="container">
      <div class="section-title">
        <h2>課程安排</h2>
        <p>同心華德福的生活節奏與課程特色</p>
      </div>
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-book-open"></i>
          </div>
          <h3>週期循環主課程</h3>
          <p>包括語文、數學、自然科學、社會（歷史、地理）等科目。</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-palette"></i>
          </div>
          <h3>副課程</h3>
          <p>手工、藝術、外語、寫生、農藝、泥塑、木工、音樂、體育活動等。由專業教師帶領，於每週或隔週固定時段上課，豐富孩子的學習體驗。</p>
        </div>
      </div>
      <h3 style="text-align: center; margin: 40px 0 20px; color: var(--primary-color);">各年級上下課作息時間表</h3>
      <div class="table-container" style="overflow-x: auto;">
        <table class="schedule-table">
          <thead>
            <tr>
              <th><i class="fas fa-clock"></i> 星期</th>
              <th>一年級</th>
              <th>二年級</th>
              <th>三年級</th>
              <th>四年級</th>
              <th>五年級</th>
              <th>六年級</th>
              <th>七到九年級</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>星期一</td>
              <td>8:10-14:00</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-16:00</td>
            </tr>
            <tr>
              <td>星期二</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-16:00</td>
            </tr>
            <tr>
              <td>星期三</td>
              <td>8:10-14:00</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-16:00</td>
            </tr>
            <tr>
              <td>星期四</td>
              <td>8:10-14:00</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>-</td>
            </tr>
            <tr>
              <td>星期五</td>
              <td>8:10-14:00</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>8:10-15:40</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};
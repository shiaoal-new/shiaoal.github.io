import { CurriculumTableResponsive } from './CurriculumTableResponsive.js';
import { StudentDevelopmentSection } from './StudentDevelopmentSection.js';

export const CurriculumSection = {
  components: { CurriculumTableResponsive, StudentDevelopmentSection },
  props: ['curriculumData', 'curriculumTableData'],
  template: `
    <div class="container">
      <div class="section-title fade-in">
        <h2>課程安排</h2>
        <p>同心華德福的生活節奏與課程特色</p>
      </div>
      <curriculum-table-responsive :curriculumData="curriculumTableData" />
      <!-- 學生發展圖像 -->
      <div id="student-development-section" class="container subsection" style="margin-top: 60px;">
          <student-development-section />
      </div>
      <div class="curriculum-spirit fade-in" v-html="curriculumData.curriculumSpirit"></div>
    </div>
  `
};

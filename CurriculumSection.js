import { CurriculumTableResponsive } from './CurriculumTableResponsive.js';

export const CurriculumSection = {
  components: { CurriculumTableResponsive },
  props: ['curriculumData', 'curriculumTableData'],
  template: `
    <div class="container">
      <div class="section-title fade-in">
        <h2>課程安排</h2>
        <p>同心華德福的生活節奏與課程特色</p>
      </div>
      <curriculum-table-responsive :curriculumData="curriculumTableData" />
      <div class="curriculum-spirit fade-in" v-html="curriculumData.curriculumSpirit"></div>
    </div>
  `
};

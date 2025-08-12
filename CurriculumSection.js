export const CurriculumSection = {
  props: ['curriculumData'],
  template: `
    <div class="container">
      <div class="section-title fade-in">
        <h2>課程安排</h2>
        <p>同心華德福的生活節奏與課程特色</p>
      </div>
      <div class="curriculum-planning fade-in" v-html="curriculumData.curriculumPlanning"></div>
      <div class="curriculum-spirit fade-in" v-html="curriculumData.curriculumSpirit"></div>
    </div>
  `
};
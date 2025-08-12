const { ref, watch, nextTick, computed } = Vue;

export const CurriculumTableResponsive = {
  props: ['curriculumData'],
  setup(props) {
    const selectedLearningArea = ref(null);
    const selectedSubItem = ref(null);

    // Computed property to get sub-items for the selected learning area
    const currentSubItems = computed(() => {
      if (selectedLearningArea.value !== null) {
        return props.curriculumData[selectedLearningArea.value]?.subItems || [];
      }
      return [];
    });

    // Watch for changes in selectedLearningArea to reset selectedSubItem
    watch(selectedLearningArea, (newVal) => {
      selectedSubItem.value = null;
    });

    // Initialize selectedLearningArea to the first item if curriculumData exists
    // This ensures a default selection when the component mounts
    if (props.curriculumData && props.curriculumData.length > 0) {
      selectedLearningArea.value = 0;
    }

    return {
      selectedLearningArea,
      selectedSubItem,
      currentSubItems,
      curriculumData: props.curriculumData // Expose curriculumData to the template
    };
  },
  template: `
    <div class="curriculum-responsive">
      <div class="curriculum-controls">
        <select v-model="selectedLearningArea" class="learning-area-select">
          <option :value="null" disabled>選擇學習領域</option>
          <option v-for="(area, index) in curriculumData" :key="index" :value="index">
            {{ area.learningArea }}
          </option>
        </select>

        <select v-model="selectedSubItem" class="sub-item-select" :disabled="!currentSubItems.length">
          <option :value="null" disabled>選擇子項目</option>
          <option v-for="(subItem, index) in currentSubItems" :key="index" :value="index">
            {{ subItem.subItemName || '綜合' }}
          </option>
        </select>
      </div>

      <div v-if="selectedLearningArea !== null && selectedSubItem !== null" class="selected-content">
        <div class="grade-content-wrapper">
          <div v-for="(grades, gradeName) in currentSubItems[selectedSubItem].grades" :key="gradeName" class="grade-content">
            <h5>{{ gradeName }}</h5>
            <ul>
              <li v-for="(item, itemIndex) in grades" :key="itemIndex">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="placeholder-message">
        請選擇學習領域和子項目以查看詳細內容。
      </div>
    </div>
  `
};
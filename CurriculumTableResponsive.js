const { ref, watch, nextTick, onBeforeUpdate, onMounted } = Vue;

export const CurriculumTableResponsive = {
  props: ['curriculumData'],
  setup(props) {
    const activeLearningArea = ref(null);
    const activeSubItem = ref(null);
    const learningAreaRefs = ref(new Map());
    const subItemRefs = ref(new Map());

    // Ensure refs are reset before each update
    onBeforeUpdate(() => {
      learningAreaRefs.value.clear();
      subItemRefs.value.clear();
    });

    const toggleLearningArea = (index) => {
      activeLearningArea.value = activeLearningArea.value === index ? null : index;
      activeSubItem.value = null; // Close sub-items when a new learning area is opened
    };

    const toggleSubItem = (uniqueKey) => {
      activeSubItem.value = activeSubItem.value === uniqueKey ? null : uniqueKey;
    };

    onMounted(() => {
      // Explicitly set max-height to 0px for all collapsible content on mount
      // This ensures they are closed initially, overriding any potential CSS issues
      nextTick(() => {
        learningAreaRefs.value.forEach(el => {
          if (el) el.style.maxHeight = '0px';
        });
        subItemRefs.value.forEach(el => {
          if (el) el.style.maxHeight = '0px';
        });
      });
    });

    watch(activeLearningArea, (newVal, oldVal) => {
      nextTick(() => {
        if (oldVal !== null && learningAreaRefs.value.has(oldVal)) {
          learningAreaRefs.value.get(oldVal).style.maxHeight = '0px';
        }
        if (newVal !== null && learningAreaRefs.value.has(newVal)) {
          learningAreaRefs.value.get(newVal).style.maxHeight = '9999px'; // Set to a very large value
        }
      });
    });

    watch(activeSubItem, (newVal, oldVal) => {
      nextTick(() => {
        if (oldVal !== null && subItemRefs.value.has(oldVal)) {
          subItemRefs.value.get(oldVal).style.maxHeight = '0px';
        }
        if (newVal !== null && subItemRefs.value.has(newVal)) {
          subItemRefs.value.get(newVal).style.maxHeight = '9999px'; // Set to a very large value
        }
      });
    });

    return {
      activeLearningArea,
      activeSubItem,
      toggleLearningArea,
      toggleSubItem,
      learningAreaRefs,
      subItemRefs
    };
  },
  template: `
    <div class="curriculum-responsive">
      <div v-for="(area, areaIndex) in curriculumData" :key="areaIndex" class="learning-area-card">
        <div class="learning-area-header" @click="toggleLearningArea(areaIndex)">
          <h3>{{ area.learningArea }}</h3>
          <i :class="['fas', activeLearningArea === areaIndex ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
        </div>
        <div class="learning-area-content" :class="{'active': activeLearningArea === areaIndex}" :ref="el => { if (el) learningAreaRefs.set(areaIndex, el) }">
          <div v-for="(subItem, subIndex) in area.subItems" :key="areaIndex + '-' + subIndex" class="sub-item-card">
            <div class="sub-item-header" @click="toggleSubItem(areaIndex + '-' + subIndex)">
              <h4>{{ subItem.subItemName || '綜合' }}</h4>
              <i :class="['fas', activeSubItem === (areaIndex + '-' + subIndex) ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </div>
            <div class="sub-item-content" :class="{'active': activeSubItem === (areaIndex + '-' + subIndex)}" :ref="el => { if (el) subItemRefs.set(areaIndex + '-' + subIndex, el) }">
              <div v-for="(grades, gradeName) in subItem.grades" :key="gradeName" class="grade-content">
                <h5>{{ gradeName }}</h5>
                <ul>
                  <li v-for="(item, itemIndex) in grades" :key="itemIndex">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

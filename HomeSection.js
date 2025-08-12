const { ref } = Vue;

export const HomeSection = {
  props: ['videos'],
  setup(props) {
    const videoStates = ref(props.videos.map(video => ({ ...video, showPlayer: false })));

    return {
      videoStates
    };
  },
  template: `
    <section class="section py-5" id="home-videos">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="video in videoStates" :key="video.videoId">
            <div class="card h-100 video-card">
              <div class="card-body text-center">
                <div class="feature-icon mb-3">
                  <i :class="video.icon"></i>
                </div>
                <h5 class="card-title">{{ video.title }}</h5>
                <p class="card-text">{{ video.description }}</p>
                <div class="video-thumbnail-container" v-if="!video.showPlayer">
                  <img :src="'https://img.youtube.com/vi/' + video.videoId + '/hqdefault.jpg'" alt="Video Thumbnail" class="video-thumbnail" @click="video.showPlayer = true">
                  <div class="play-button" @click="video.showPlayer = true">
                    <i class="fas fa-play-circle"></i>
                  </div>
                </div>
                <div class="video-container" v-if="video.showPlayer">
                  <iframe :src="'https://www.youtube.com/embed/' + video.videoId + '?autoplay=1'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};

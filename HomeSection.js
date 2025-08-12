export const HomeSection = {
  props: ['videos'],
  template: `
    <section class="section py-5" id="home-videos">
      <div class="container">
        
        <div class="row">
          <div class="col-md-4 mb-4 flip-card" v-for="video in videos" :key="video.videoId">
            <div class="card h-100 flip-card-inner">
              <div class="flip-card-front">
                <div class="card-body text-center">
                  <div class="feature-icon mb-3">
                    <i :class="video.icon"></i>
                  </div>
                  <h5 class="card-title">{{ video.title }}</h5>
                  <p class="card-text">{{ video.description }}</p>
                </div>
              </div>
              <div class="flip-card-back">
                <div class="video-container">
                  <iframe :src="'https://www.youtube.com/embed/' + video.videoId" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};
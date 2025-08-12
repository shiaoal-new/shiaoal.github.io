export const HomeSection = {
  props: ['videos'],
  template: `
    <section class="section py-5" id="home-videos">
      <div class="container">
        <div class="section-title fade-in">
          <h2>影音專區</h2>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="video in videos" :key="video.videoId">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ video.title }}</h5>
                <div class="video-container">
                  <iframe :src="'https://www.youtube.com/embed/' + video.videoId" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p class="card-text">{{ video.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};
import Logger from '../../utils/logger.js';

class AboutController {
  static #instance = null;

  static #TEAM = [
    {
      name: 'Gordon Ramsay',
      role: 'Head Chef',
      image:
        'https://tse1.explicit.bing.net/th/id/OIP.xSytpxu8ZLcNP0VmBboDiwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      socials: [
        { p: 'facebook', u: 'https://www.facebook.com/gordonramsay/' },
        { p: 'instagram', u: 'https://www.instagram.com/gordongram/' },
      ],
    },
    {
      name: 'Christine Ha',
      role: 'Sous Chef',
      image:
        'https://files.nc.gov/dncr/Christine_Ha_crop.jpg?VersionId=GlNyONUhfxIa3pR1tQr8aSKn2.6mL6Gn',
      socials: [
        { p: 'facebook', u: 'https://www.facebook.com/theblindcook/' },
        { p: 'instagram', u: 'https://www.instagram.com/theblindcook/' },
      ],
    },
    {
      name: 'Marcus Samuelsson',
      role: 'Pastry Chef',
      image:
        'https://th.bing.com/th/id/R.d0f8ac5a94ce5bc1296b03654deb99c8?rik=F%2fRQu91qf0kemg&pid=ImgRaw&r=0',
      socials: [
        { p: 'facebook', u: 'https://www.facebook.com/MarcusCooks/' },
        { p: 'instagram', u: 'https://www.instagram.com/marcuscooks/' },
      ],
    },
  ];

  constructor() {
    if (AboutController.#instance) return AboutController.#instance;
    AboutController.#instance = this;
  }

  init() {
    const container = document.getElementById('team-members');
    if (container) {
      container.innerHTML = AboutController.#TEAM
        .map(
          (m) => `
        <div class="col-md-6 col-lg-4">
          <div class="team-card">
            <img src="${m.image}" alt="${m.name}" class="team-img" />
            <div class="team-info">
              <h3 class="team-name">${m.name}</h3>
              <p class="team-role mb-3">${m.role}</p>
              <div class="d-flex justify-content-center gap-2">
                ${m.socials
                  .map(
                    (s) => `
                  <a href="${s.u}" class="btn btn-sm btn-outline-primary rounded-circle p-2 lh-1">
                    <i data-lucide="${s.p}" style="width: 16px; height: 16px"></i>
                  </a>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      `,
        )
        .join('');
    }
    Logger.info('AboutController initialized');
  }
}

export default AboutController;

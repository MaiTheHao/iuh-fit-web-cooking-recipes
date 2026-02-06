import Logger from '../../utils/logger.js';

class AboutController {
  static #instance = null;

  static #TEAM_MEMBERS = [
    {
      id: 1,
      name: 'Gordon Ramsay',
      role: 'Head Chef',
      image:
        'https://tse1.explicit.bing.net/th/id/OIP.xSytpxu8ZLcNP0VmBboDiwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      socials: [
        { platform: 'facebook', url: 'https://www.facebook.com/gordonramsay/' },
        { platform: 'instagram', url: 'https://www.instagram.com/gordongram/' },
      ],
    },
    {
      id: 2,
      name: 'Christine Ha',
      role: 'Sous Chef',
      image:
        'https://files.nc.gov/dncr/Christine_Ha_crop.jpg?VersionId=GlNyONUhfxIa3pR1tQr8aSKn2.6mL6Gn',
      socials: [
        { platform: 'facebook', url: 'https://www.facebook.com/theblindcook/' },
        { platform: 'instagram', url: 'https://www.instagram.com/theblindcook/' },
      ],
    },
    {
      id: 3,
      name: 'Marcus Samuelsson',
      role: 'Pastry Chef',
      image:
        'https://th.bing.com/th/id/R.d0f8ac5a94ce5bc1296b03654deb99c8?rik=F%2fRQu91qf0kemg&pid=ImgRaw&r=0',
      socials: [
        { platform: 'facebook', url: 'https://www.facebook.com/MarcusCooks/' },
        { platform: 'instagram', url: 'https://www.instagram.com/marcuscooks/' },
      ],
    },
  ];

  constructor() {
    if (AboutController.#instance) {
      return AboutController.#instance;
    }
    AboutController.#instance = this;
  }

  init() {
    this.renderTeamMembers();
    Logger.info('AboutController initialized');
  }

  renderTeamMembers() {
    const teamContainer = document.getElementById('team-members');
    if (!teamContainer) return;

    teamContainer.innerHTML = '';

    AboutController.#TEAM_MEMBERS.forEach((member) => {
      const socialsHtml = member.socials
        .map(
          (social) => `
        <a href="${social.url}" class="btn btn-sm btn-outline-primary rounded-circle p-2 lh-1">
          <i data-lucide="${social.platform}" style="width: 16px; height: 16px"></i>
        </a>
      `,
        )
        .join('');

      const memberHtml = `
        <div class="col-md-6 col-lg-4">
          <div class="team-card">
            <img src="${member.image}" alt="${member.name}" class="team-img" />
            <div class="team-info">
              <h3 class="team-name">${member.name}</h3>
              <p class="team-role mb-3">${member.role}</p>
              <div class="d-flex justify-content-center gap-2">
                ${socialsHtml}
              </div>
            </div>
          </div>
        </div>
      `;

      teamContainer.innerHTML += memberHtml;
    });

    Logger.info(`Team members rendered: ${AboutController.#TEAM_MEMBERS.length} members`);
  }
}

export default AboutController;

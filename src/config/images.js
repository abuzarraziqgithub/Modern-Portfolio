/**
 * Central image manifest — sections reference images by role, never by raw
 * filename. All files live in /public/images. `objectPosition` hints are used
 * to keep subjects framed nicely across breakpoints; the `mobile` value
 * overrides on narrow screens.
 */
export const IMAGES = {
  hero: {
    src: '/images/hero-stardust-path.jpeg',
    alt: 'Silhouette walking along a garden path under a vast starfield at dusk',
    fetchpriority: 'high',
    objectPosition: { default: '50% 42%', mobile: '50% 38%' },
  },
  about: {
    src: '/images/about-sunset-trees.jpeg',
    alt: 'Inverted film-grain sunset glowing through trees in warm and cool tones',
    objectPosition: { default: '50% 50%', mobile: '50% 55%' },
  },
  stack: {
    src: '/images/stack-roses-teal.jpeg',
    alt: 'Pink roses silhouetted against a teal evening sky with a slim crescent moon',
    objectPosition: { default: '50% 45%', mobile: '50% 50%' },
  },
  learning: {
    src: '/images/learning-astronaut-flowers.jpeg',
    alt: 'Astronaut resting in a pink wildflower field beneath a soft sky',
    objectPosition: { default: '50% 40%', mobile: '50% 42%' },
  },
  projects: {
    src: '/images/projects-jet-trail.jpeg',
    alt: 'A bold jet trail cutting through a saturated red and blue gradient sky',
    objectPosition: { default: '50% 35%', mobile: '50% 30%' },
  },
  contact: {
    src: '/images/cta-moon-blossoms.jpeg',
    alt: 'A pale moon hanging behind pink blossoms against a near-black sky',
    objectPosition: { default: '50% 30%', mobile: '50% 35%' },
  },
  cosmic: {
    src: '/images/hero-cosmic-horse.jpeg',
    alt: 'Cosmic dust in the shape of a galloping horse against dark navy and gold',
    objectPosition: { default: '50% 50%', mobile: '50% 50%' },
  },
};

/**
 * The "Beyond Code" mood gallery — dreamiest images with a few-word label each.
 */
export const GALLERY = [
  {
    label: 'Gaming & wonder',
    src: '/images/beyond-dissolving-figure.jpeg',
    alt: 'A painterly figure dissolving into flowers against a blue sky',
  },
  {
    label: 'Prayer & stillness',
    src: '/images/cta-moon-blossoms.jpeg',
    alt: 'A pale moon hanging behind pink blossoms against a near-black sky',
  },
  {
    label: 'Rebirth & quiet growth',
    src: '/images/beyond-rebirth.jpeg',
    alt: 'A flower-covered skeleton against a pastel dawn sky, growth from stillness',
  },
  {
    label: 'Podcasts',
    src: '/images/beyond-mist-sunset.jpeg',
    alt: 'Magenta and teal misty mountain sunset seen through blossoms',
  },
  {
    label: 'A tidy room = a tidy mind',
    src: '/images/beyond-dream-meadow.jpeg',
    alt: 'Pillows resting in a wildflower meadow under a peach sky with butterflies',
  },
  {
    label: 'Movies that move me',
    src: '/images/beyond-moonlit-field.jpeg',
    alt: 'A figure in an impressionist flower field under moonlight',
  },
  {
    label: 'Rain on bougainvillea',
    src: '/images/beyond-rain-roses.jpeg',
    alt: 'Raindrops on bougainvillea at night, blue and violet, quietly detailed',
  },
  {
    label: 'Reading & reflections',
    src: '/images/hero-cosmic-horse.jpeg',
    alt: 'Cosmic dust forming a galloping horse across a dark navy and gold sky',
  },
];
import { ArticleProps } from '../types/article';
import { CategoryProps } from '../types/category';
import { StatusEnum } from '../types/enums/status.enum';

// Mock Categories
export const MOCK_CATEGORIES: CategoryProps[] = [
  {
    _id: '1',
    name_en: 'Programming',
    name_kh: 'កម្មវិធី',
    status: StatusEnum.ACTIVE,
    ordering: 1,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '2',
    name_en: 'Hollywood',
    name_kh: 'ហូលីវូដ',
    status: StatusEnum.ACTIVE,
    ordering: 2,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '3',
    name_en: 'Food',
    name_kh: 'អាហារ',
    status: StatusEnum.ACTIVE,
    ordering: 3,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '4',
    name_en: 'Future',
    name_kh: 'អនាគត',
    status: StatusEnum.ACTIVE,
    ordering: 4,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '5',
    name_en: 'Cooking',
    name_kh: 'ធ្វើម្ហូប',
    status: StatusEnum.ACTIVE,
    ordering: 5,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '6',
    name_en: 'Tech',
    name_kh: 'បច្ចេកវិទ្យា',
    status: StatusEnum.ACTIVE,
    ordering: 6,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '7',
    name_en: 'Travel',
    name_kh: 'ការធ្វើដំណើរ',
    status: StatusEnum.ACTIVE,
    ordering: 7,
    _active: true,
    _deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    __v: 0,
  },
];

// Mock Articles
export const MOCK_ARTICLES: ArticleProps[] = [
  {
    _id: '659bdb9e77c9a9717f3b5e7c',
    blog_id:
      'Species-A-Flavorful-Dive-into-the-Biodiversity-BuffetlySYR0Z23fxJLWtJZ',
    title: 'I am laughing 😂 Work & Daily Life Humor Memes',
    des: '😂 Work & Daily Life Humor Memes that touch on procrastination, awkward social interactions, the challenges of adulting ("Adulting is a soup and I am a fork"). Lighthearted views on activities like go',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1589652717406-1c69efaf1ff8?w=800',
    content: [
      'Welcome to the world of "Species" where biodiversity takes center stag',
    ],
    tags: ['humor', 'life', 'memes'],
    author: {
      _id: '659bdacd77c9a9717f3b5e7a',
      name: 'meas reaksa',
      avatar: 'https://ui-avatars.com/api/?name=Meas+Reaksa&backgrond=random',
    },
    activity: {
      total_likes: 0,
      total_comments: 16,
      total_reads: 55,
      total_parent_comments: 1,
    },
    category: MOCK_CATEGORIES[0],
    published_at: '2024-01-08T11:25:18.857+00:00',
    publishedAt: '2024-01-08T11:25:18.857+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
  {
    _id: '659bdb9e77c9a9717f3b5e7d',
    blog_id: 'Meme-Culture-Social-Media',
    title: 'teseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeter',
    des: 'Quotes are memorable words from speeches or texts, often used for inspiration, wisdom, or to make a point, with famous examples including Maya Angelou\'s "people will never forget how you made them fee',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800',
    content: ['Meme culture has taken over social media...'],
    tags: ['meme', 'culture', 'social'],
    author: {
      _id: '659bdacd77c9a9717f3b5e7a',
      name: 'meas reaksa',
      avatar: 'https://ui-avatars.com/api/?name=Meas+Reaksa&background=random',
    },
    activity: {
      total_likes: 1,
      total_comments: 8,
      total_reads: 42,
      total_parent_comments: 0,
    },
    category: MOCK_CATEGORIES[0],
    published_at: '2024-01-08T11:25:18.857+00:00',
    publishedAt: '2024-01-08T11:25:18.857+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
  {
    _id: '659bdb9e77c9a9717f3b5e7e',
    blog_id: 'Divine-Punish-Religious-Philosophy',
    title: 'Devine Punish',
    des: 'how a god punishes the person who blames intentionally for their selfishness. One person is blaming me intentionally that I am having illegal relationship. She is blaming me for her selfishness',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800',
    content: ['Exploring the concept of divine punishment...'],
    tags: ['philosophy', 'religion', 'ethics'],
    author: {
      _id: '659bdacd77c9a9717f3b5e7b',
      name: 'vaayu jithu',
      avatar: 'https://ui-avatars.com/api/?name=Vaayu+Jithu&background=random',
    },
    activity: {
      total_likes: 1,
      total_comments: 5,
      total_reads: 28,
      total_parent_comments: 0,
    },
    category: MOCK_CATEGORIES[3],
    published_at: '2024-07-20T10:30:00.000+00:00',
    publishedAt: '2024-07-20T10:30:00.000+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
  {
    _id: '659bdb9e77c9a9717f3b5e7f',
    blog_id: 'Tech-Trends-Future-Technology',
    title: 'Tech Trends Shaping Our Future: A Closer Look at the Evolving...',
    des: 'An in-depth analysis of emerging technologies that are revolutionizing our world, from AI to quantum computing',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    content: ['Technology is evolving at an unprecedented pace...'],
    tags: ['technology', 'AI', 'future'],
    author: {
      _id: '658e6be17d937011c4e872958',
      name: 'jhon',
      avatar: 'https://ui-avatars.com/api/?name=Jhon&background=random',
    },
    activity: {
      total_likes: 15,
      total_comments: 23,
      total_reads: 156,
      total_parent_comments: 5,
    },
    category: MOCK_CATEGORIES[5],
    published_at: '2025-01-09T08:00:00.000+00:00',
    publishedAt: '2025-01-09T08:00:00.000+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
  {
    _id: '659bdb9e77c9a9717f3b5e80',
    blog_id: 'Mohali-Birds-Park-Wildlife',
    title: 'Mohali birds park',
    des: 'Discover the amazing variety of birds at Mohali Birds Park, a sanctuary for bird lovers and nature enthusiasts',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800',
    content: ['Mohali Birds Park is a haven for bird watchers...'],
    tags: ['wildlife', 'birds', 'nature'],
    author: {
      _id: '659bdacd77c9a9717f3b5e7c',
      name: 'harsh kaushal',
      avatar:
        'https://ui-avatars.com/api/?name=Harsh+Kaushal&background=random',
    },
    activity: {
      total_likes: 8,
      total_comments: 12,
      total_reads: 89,
      total_parent_comments: 2,
    },
    category: MOCK_CATEGORIES[6],
    published_at: '2025-02-09T14:20:00.000+00:00',
    publishedAt: '2025-02-09T14:20:00.000+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
  {
    _id: '659bdb9e77c9a9717f3b5e81',
    blog_id: 'Culinary-Odyssey-Food-Culture',
    title: 'A Culinary Odyssey: Exploring the World Through Food',
    des: 'Join us on a gastronomic journey across continents as we explore diverse cuisines and their cultural significance',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    content: ['Food is more than sustenance...'],
    tags: ['food', 'culture', 'travel'],
    author: {
      _id: '659bdacd77c9a9717f3b5e7d',
      name: 'maya',
      avatar: 'https://ui-avatars.com/api/?name=Maya&background=random',
    },
    activity: {
      total_likes: 22,
      total_comments: 18,
      total_reads: 134,
      total_parent_comments: 4,
    },
    category: MOCK_CATEGORIES[2],
    published_at: '2025-01-08T16:45:00.000+00:00',
    publishedAt: '2025-01-08T16:45:00.000+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
  {
    _id: '659bdb9e77c9a9717f3b5e82',
    blog_id: 'Species-Biodiversity-Buffet',
    title: 'Species : A Flavorful Dive into the Biodiversity Buffet',
    des: 'Exploring the incredible diversity of life on Earth and why biodiversity matters for our future',
    banner:
      'http://res.cloudinary.com/dhznzfwj5/image/upload/v1704712937/berwlhrsd',
    thumbnail:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    content: ['Biodiversity is the foundation of ecosystem services...'],
    tags: ['biodiversity', 'nature', 'conservation'],
    author: {
      _id: '659bdacd77c9a9717f3b5e7d',
      name: 'maya',
      avatar: 'https://ui-avatars.com/api/?name=Maya&background=random',
    },
    activity: {
      total_likes: 12,
      total_comments: 9,
      total_reads: 67,
      total_parent_comments: 1,
    },
    category: MOCK_CATEGORIES[3],
    published_at: '2025-01-08T12:30:00.000+00:00',
    publishedAt: '2025-01-08T12:30:00.000+00:00',
    draft: false,
    comments: [],
    __v: 0,
  },
];

// Trending Articles (subset of popular articles)
export const TRENDING_ARTICLES = [
  MOCK_ARTICLES[3], // Tech Trends
  MOCK_ARTICLES[4], // Mohali birds park
  MOCK_ARTICLES[5], // Culinary Odyssey
  MOCK_ARTICLES[6], // Species Biodiversity
];

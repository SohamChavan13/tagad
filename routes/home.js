import express from 'express';

const router = express.Router();

// Homepage
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Tagad Platforms - Innovative Software Technology Solutions',
    currentPage: 'home',
    metaDescription: 'Transform your business with cutting-edge software solutions. E-commerce, mobile apps, ERP, and digital marketing services.',
    services: [
      {
        name: 'E-Commerce Development',
        description: 'Powerful online stores with seamless user experience',
        icon: 'shopping-cart',
        color: 'cyan'
      },
      {
        name: 'Business Websites',
        description: 'Professional websites that drive results',
        icon: 'globe',
        color: 'purple'
      },
      {
        name: 'Mobile App Development',
        description: 'Native iOS & Android applications',
        icon: 'smartphone',
        color: 'orange'
      },
      {
        name: 'Business Software',
        description: 'Custom software solutions for your needs',
        icon: 'code',
        color: 'blue'
      },
      {
        name: 'Digital Marketing',
        description: 'Social media & content marketing strategies',
        icon: 'trending-up',
        color: 'green'
      },
      {
        name: 'ERP Solutions',
        description: 'Enterprise resource planning systems',
        icon: 'layers',
        color: 'red'
      }
    ]
  });
});

// Services page
router.get('/services', (req, res) => {
  res.render('services', {
    title: 'Our Services | Tagad Platforms',
    currentPage: 'services',
    metaDescription: 'Comprehensive software development and digital marketing services for modern businesses.'
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us | Tagad Platforms',
    currentPage: 'about',
    metaDescription: 'Learn about Tagad Platforms LLP - your trusted partner in digital transformation and software innovation.'
  });
});

// Portfolio page
router.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    title: 'Portfolio | Tagad Platforms',
    currentPage: 'portfolio',
    metaDescription: 'Explore our successful projects and client success stories in software development and digital solutions.'
  });
});

export default router;
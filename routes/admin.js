import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Admin authentication middleware
const requireAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

// Admin login page
router.get('/login', (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('admin/login', {
    title: 'Admin Login | Tagad Platforms',
    error: req.query.error
  });
});

// Handle admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/admin/login?error=1');
  }
});

// Admin dashboard
router.get('/', requireAuth, async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
    
    // Get monthly stats
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthlyContacts = await Contact.countDocuments({
      createdAt: { $gte: currentMonth }
    });

    res.render('admin/dashboard', {
      title: 'Admin Dashboard | Tagad Platforms',
      stats: {
        total: totalContacts,
        new: newContacts,
        monthly: monthlyContacts
      },
      recentContacts
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.render('admin/dashboard', {
      title: 'Admin Dashboard | Tagad Platforms',
      stats: { total: 0, new: 0, monthly: 0 },
      recentContacts: []
    });
  }
});

// Admin contacts list
router.get('/contacts', requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalContacts = await Contact.countDocuments();
    const totalPages = Math.ceil(totalContacts / limit);

    res.render('admin/contacts', {
      title: 'Manage Contacts | Admin',
      contacts,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.render('admin/contacts', {
      title: 'Manage Contacts | Admin',
      contacts: [],
      currentPage: 1,
      totalPages: 1
    });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

export default router;
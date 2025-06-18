import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// API endpoint to get a single contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to update contact status
router.patch('/contacts/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority, notes } = req.body;
    
    const updateData = { updatedAt: Date.now() };
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    
    const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const statusStats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const serviceStats = await Contact.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      total: totalContacts,
      byStatus: statusStats,
      byService: serviceStats
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
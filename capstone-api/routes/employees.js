const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.get('/', async (req, res) => {
  const list = await Employee.find({});
  res.json(list);
});
router.get('/:id', async (req, res) => {
  const e = await Employee.findById(req.params.id);
  if (!e) return res.status(404).json({error:'Not found'});
  res.json(e);
});
router.post('/', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.status(201).json(emp);
});
router.put('/:id', async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if (!emp) return res.status(404).json({error:'Not found'});
  res.json(emp);
});
router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({success:true});
});

module.exports = router;

const express = require('express');
const router = express.Router();
const FileStorage = require('../services/FileStorage');

/* POST /analytics/performance */
router.post('/performance', async function (req, res) {
  const payload = req.body;
  try {
    let data;
    try {
      data = await FileStorage.readJsonFile(`performance-analytics.json`);
    } catch (e) {
      data = [];
    }

    data.push({timestamp: Date.now(), data: payload});
    await FileStorage.writeFile('performance-analytics.json', data);
    await res.json({success: true});
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

/* GET /analytics/performance */
router.get('/performance', async function (req, res) {
  try {
    const data = await FileStorage.readJsonFile('performance-analytics.json');
    await res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

/* POST /analytics/user */
router.post('/user', async function (req, res) {
  const payload = req.body;
  try {
    let data;
    try {
      data = await FileStorage.readJsonFile('user-analytics.json');
    } catch (e) {
      data = [];
    }

    data.push({timestamp: Date.now(), data: payload});
    await FileStorage.writeFile('user-analytics.json', data);
    await res.json({success: true})
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

/* GET /analytics/user */
router.get('/user', async function (req, res) {
  try {
    const data = await FileStorage.readJsonFile('user-analytics.json');
    await res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal error');
  }
});

module.exports = router;

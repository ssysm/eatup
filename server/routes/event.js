const express = require('express');
const router = express.Router();
const { fetchEvent,createEvent,joinEvent,listEvent,listEventByUser,removeEvent } = require('../actions/event');

router.get('/id/:id',fetchEvent);

router.get('/get/:limit',listEvent);

router.get('/user/:uid',listEventByUser);

router.post('/create',createEvent);

router.patch('/join/:id',joinEvent);

router.patch('/delete',removeEvent);


module.exports = router;
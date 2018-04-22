const express = require('express');
const router = express.Router();

const fs = require('fs');

/* GET home page. */
router.post('/', function (req, res, next) {
    let githubEvent = req.get('X-GitHub-Event');

    switch (githubEvent) {
        case 'push':
            let repository = req.body['repository'];
            fs.readFile('deployment.config.json', (err, data) => {
                console.log(repository['full_name']);
                console.log(data);
                res.end();
            });
            break;
    }
});

module.exports = router;

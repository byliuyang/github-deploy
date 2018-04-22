const express = require('express');
const router = express.Router();

const fs = require('fs');
const exec = require('child_process').exec;

/* GET home page. */
router.post('/', function (req, res, next) {
    let githubEvent = req.get('X-GitHub-Event');

    switch (githubEvent) {
        case 'push':
            let repository = req.body['repository'];
            fs.readFile('deployment.config.json', 'utf8', (err, json) => {
                let repoFullName = repository['full_name'];
                let deploymentConfig = JSON.parse(json);

                deploymentConfig.filter(config => config['repo_full_name'] === repoFullName)
                    .forEach(config => {
                       let repoLocalDir = config['repo_local_dir'];
                       exec('git pull', {
                           cwd: repoLocalDir
                       }, (error, stdout, stderr) => {
                           console.log(stdout);
                       });
                    });
                res.end();
            });
            break;
    }
});

module.exports = router;

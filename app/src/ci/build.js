const detector = require('detect-next-version');
const gitCommitsSince = require('git-commits-since');

const packageJson = require('../../package.json')

async function lastVersion() {
    const commits = await gitCommitsSince({cwd: '.'})
    const [result] = await detector(commits.rawCommits, { name: 'app', packageJson: function () {
            return packageJson
        }
    });
    console.log(result.increment)
}

(async ()=>{
    await lastVersion();
})();

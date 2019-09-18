var startUl = '<ul>'
var endUl = '</ul>'

function showCommits() {
  var commits = JSON.parse(this.responseText);

  var ulElement = function(commit) {
    if (commit.author) {
      return `<li><strong>${commit.author.login}</strong> - ${commit.commit.message}</li>`
    }
  }

  var commitsList  = startUl + commits.map(function(commit) {
    return ulElement(commit)
  }).join('') + endUl

  document.getElementById('commits').innerHTML = commitsList;
}

function getCommits(el) {
  var name = el.dataset.repo;
  var req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/eyaltoledano/' + name + '/commits');
  req.send();
}

function showRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  var repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  var req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/eyaltoledano/repos');
  req.send();
}

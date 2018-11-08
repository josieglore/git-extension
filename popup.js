
const addButton = document.getElementById("add-repo");
let currentTab = {}
let count = 1;
let storedRepos = [];

chrome.storage.sync.get(['storedRepos'], function(result) {
  console.log(result)
  // console.log(result['storedRepos'])
  // console.log([])
  // console.log(result['storedRepos'].length)
  // console.log(result['storedRepos'] != [])
  if (result['storedRepos'].length !== 0) {
    storedRepos = result['storedRepos']
//    console.log(`Stored repos include ${result['storedRepos'][0]['url']}`)
    console.log(result)

    let linksHTML = ''
    storedRepos.forEach(entry => {
      linksHTML += `<a href=# onclick=jumpToLink()'${entry.url}'>${entry.name}</a><br>`
    })
    document.getElementById("links-container").innerHTML = linksHTML
  }
});

function jumpToLink(url) {
  chrome.tabs.update(currentTab.id, {url: url})
}

function incrementAndGrab() {
  chrome.tabs.getSelected(null,function(tab) {
    currentTab = tab
    const repoLink = tab.url;
    const repoName = repoLink.substr(repoLink.lastIndexOf("/")+1)
    const repoNumber = document.getElementById("repository-increment");

    if ( storedRepos === [] || storedRepos.reduce( (acc, c,i, a) => {
        console.log(c.name, repoName)
        return acc || c.name === repoName
    }, false) === false) {
      storedRepos.push({'name': repoName, 'url': repoLink});
      repoNumber.innerHTML = count++;
      chrome.storage.sync.set({storedRepos: storedRepos});
      console.log(storedRepos)
    }
  });
}

addButton.addEventListener("click", incrementAndGrab);

// addButton.addEventListener("click", incrementRepos);
// chrome.storage.sync.get(['storedRepos'], function(result) {
//   console.log(`Stored repos include ${result['storedRepos'][0]['url']}`)
//   console.log(result)
// });

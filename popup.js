
document.addEventListener("DOMContentLoaded", function() {
const addButton = document.getElementById('add-repo-button');
const addRepoText = document.getElementById('add-repo');
const clearRepos = document.getElementById('clear');
const undo = document.getElementById('undo');
const undoIcon = document.getElementById('undo-icon');
// const alertModal = document.getElementById('meme-modal')
// const memeImg = document.getElementById('meme');

let currentTab = {}
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

    displayRepoLinks()


  }
});

function displayRepoLinks() {
  let linksHTML = ''
  storedRepos.forEach(entry => {
    // linksHTML += `<a href=# onclick=jumpToLink('${entry.url}')>${entry.name}</a><br>`
    linksHTML += `<a href='${entry.url}' target="_blank" style="text-decoration: none; color: #072758; line-height: 2">${entry.name}</a><br>`
  })
  document.getElementById("links-container").innerHTML = linksHTML  
}

//onclick=jumpToLink()

function jumpToLink(url) {
//  chrome.tabs.update(currentTab.id, {url: url})
  // chrome.tabs.create({url: url})
  console.log('hi');
}

function incrementAndGrab() {
  chrome.tabs.getSelected(null,function(tab) {
    currentTab = tab
    const repoLink = tab.url;
    const repoName = repoLink.substr(repoLink.lastIndexOf("/")+1)

    if ( storedRepos === [] || storedRepos.reduce( (acc, c,i, a) => {
        console.log(c.name, repoName)
        return acc || c.name === repoName
    }, false) === false) {
      storedRepos.push({'name': repoName, 'url': repoLink});
      chrome.storage.sync.set({storedRepos: storedRepos});
      console.log(storedRepos)
      alertModal.style.display = 'block';
    }
    displayRepoLinks();
  });
}
function clear() {
  chrome.storage.sync.set({storedRepos: []});
  displayRepoLinks();
}
function undoAction() {
  storedRepos.pop();
  chrome.storage.sync.set({storedRepos: storedRepos});
  displayRepoLinks();
}

addButton.addEventListener("click", incrementAndGrab);
addRepoText.addEventListener("click", incrementAndGrab);
clearRepos.addEventListener("click", clear);
undo.addEventListener("click", undoAction);
undoIcon.addEventListener("click", undoAction);
})
// addButton.addEventListener("click", incrementRepos);
// chrome.storage.sync.get(['storedRepos'], function(result) {
//   console.log(`Stored repos include ${result['storedRepos'][0]['url']}`)
//   console.log(result)
// });
// const memeImages = [
//   'aliens.jpg',
//   'cant_merge_that.jpg',
//   'cant_merge_this_hammer.jpg',
//   'git_conflicts_git_conflicts_everywhere.jpg',
//   'git_push_force_2.png',
//   'git_push_force.jpg',
//   'git_push_go_home.jpg',
//   'i_also_like_living_dangerously.jpg',
//   'i_did_not_create_git_to_make_you_smile.jpg',
//   // 'i_dont_always_test_my_code.jpg',
//   'i_heard_you_like_git.jpg',
//   'i_will_revert_you.png',
//   'i_would_like_to_merge_with_you.png',
//   'if_you_deploy_on_a_friday.jpg',
//   'merge_conflicts.jpg',
//   'one_does_not_simply.jpg',
//   'only_1_conflict.jpg',
//   'you-dont-have-to-write-tests-if-you-dont-commit-any-code.jpg'
// ];

// memeImg.src =`https://tonyhudgins.github.io/git-extension/images/${memeImages[Math.floor(Math.random()*17)]}`;

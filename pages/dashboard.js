// Sptofiy request link + access token passed back end
const spotifyURL = 'https://api.spotify.com/v1';
let spotifyToken = document.cookie.split('=')[1];
let testId = '5me0Irg2ANcsgc93uaYrpb'

// data
let newReleases;
let newReleasesLimit = 0;

// components
const successSection = document.querySelector('.success')
const newReleasesSection = document.querySelector('.new-releases')

// Buttons
const newReleasesButton = document.getElementById('get-releases')
const consoleButton = document.getElementById('console')

// Get inital 50 albums on load.
    window.addEventListener('load', () => {
        getNewReleases(spotifyToken)
    })


newReleasesButton.addEventListener('click',(e) => {
    e.preventDefault; 
   hideSuccess()
   showNewReleases()
   newReleases.items.forEach((data) => createCard(data))
})




// Toggle components Displays
function showSuccess() {
    successSection.style.display="flex"
}

function hideSuccess() {
    successSection.style.display="none"
}

function showNewReleases() {
    newReleasesSection.style.display="flex"
}

function hideNewReleases() {
    newReleasesSection.style.display="none"
}

// For testing only
consoleButton.addEventListener('click',(e) => {
    e.preventDefault;
    console.log( getNewReleases(spotifyToken))
})




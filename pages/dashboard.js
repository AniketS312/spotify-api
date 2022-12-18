// Sptofiy request link + access token passed back end
const spotifyURL = 'https://api.spotify.com/v1';
let spotifyToken = document.cookie.split('=')[1];

// data
let newReleases;
let newReleasesLimit = 0;

// components
const successSection = document.querySelector('.success')
const newReleasesSection = document.querySelector('.new-releases')

// Buttons
const newReleasesButton = document.getElementById('get-releases')
const consoleButton = document.getElementById('console')

// Get inital 50 albums and display them. Raise releases limit for offset attribute on URL for later use
newReleasesButton.addEventListener('click',(e) => {
    e.preventDefault; 
    getNewReleases(spotifyToken)
})






// Toggle components Displays
function showSuccess() {
    successSection.style.display="flex"
}

function hideSuccess() {
    successSection.style.display="none"
}

// For testing only
consoleButton.addEventListener('click',(e) => {
    e.preventDefault;
    console.log(newReleases, )
})



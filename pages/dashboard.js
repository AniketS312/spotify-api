// Sptofiy request link + access token passed back end
const spotifyURL = 'https://api.spotify.com/v1';
let spotifyToken = document.cookie.split('=')[1];
let testId = "4M2Mf4pmARKGVT9MLCe3HA"
let testGenre = 'electronic';

// data
let newReleases;
let genreSearch;

// components
const successSection = document.querySelector('.success')
const newReleasesSection = document.querySelector('.new-releases')
const genreComponents = document.querySelector('.genres')

// Buttons
const newReleasesButton = document.querySelectorAll('#get-releases')
const consoleButton = document.getElementById('console')

// Get inital 50 albums on load.
    window.addEventListener('load', () => {
        getNewReleases(spotifyToken)
    })

// Display 50 new releases fetched from above
newReleasesButton.forEach(e => e.addEventListener('click',(e) => {
    e.preventDefault; 
    clearNewReleasesSection()
    hideSuccess()
    hideGenre()
    showNewReleases()
    newReleases.items.forEach((data) => createCard(data))
})
);

const addAlbumToLibrary = async(element) => {
    let albumId = element.target.getAttribute('data-albumid')
    let inLibrary;
    await checkAlbumStatus(spotifyToken, albumId)
    .then(data => {
        if(data === false) {
                confirmAddAlbum(spotifyToken, albumId)
                console.log('adding')
            } else if (data === true) {
                console.log('Already in Library')
            }
    })
    // console.log(inLibrary)
    // if(inLibrary === false) {
    //     console.log('adding')
    // } else if (inLibrary === true) {
    //     console.log('Already in Library')
    // }

    // console.log(alreadyInLibaray)
}

// Toggle components Displays & clear content functions
function clearNewReleasesSection() {
    newReleasesSection.innerHTML = ''
};
function clearGenres() {
    genreComponents.innerHTML = ''
};

function showSuccess() {
    successSection.style.display="flex"
};

function hideSuccess() {
    successSection.style.display="none"
};

function showNewReleases() {
    newReleasesSection.style.display="flex"
};

function hideNewReleases() {
    newReleasesSection.style.display="none"
};
function showGenre() {
    genreComponents.style.display="flex"
};
function hideGenre() {
    genreComponents.style.display="none"
};

// For testing only
consoleButton.addEventListener('click',(e) => {
    e.preventDefault;
    console.log(newReleases)
//    addAlbum(spotifyToken, testId)
})




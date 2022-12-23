
// Spotify request link + access token passed back end
const spotifyURL = 'https://api.spotify.com/v1';
let spotifyToken = document.cookie.split('=')[1];
let testId = "4M2Mf4pmARKGVT9MLCe3HA"
let testGenre = 'electronic';

// data
let newReleases;
let genreSearchResults;

// components
const dashboardComponent = document.querySelector('.dashboard')
const successSection = document.querySelector('.success')
const newReleasesSection = document.querySelector('.new-releases')
const inputComponent = document.getElementById('genres')
// Buttons
const newReleasesButton = document.querySelectorAll('#get-releases')
const consoleButton = document.getElementById('console')

// Get inital 50 albums on load and set menu Iems
    window.addEventListener('load', () => {
        // Sets newReleases variable declared above
        getNewReleases(spotifyToken)
        addGenresToInput(menuItems)
    })

    inputComponent.addEventListener('change', async function(element) {
        const genreValue = element.target.value
        hideSuccess()
        clearNewReleasesSection()   
        showNewReleases()     
        await searchGenre(spotifyToken, genreValue)
        genreSearchResults.tracks.items.forEach((data) => createCard(data.album, newReleasesSection))    
    })

// Display 50 new releases fetched from above
newReleasesButton.forEach(e => e.addEventListener('click',(e) => {
    const newSearch = true;
    e.preventDefault; 
    clearNewReleasesSection()
    hideSuccess()
    showNewReleases()
    newReleases.items.forEach((data) => createCard(data, newReleasesSection, newSearch))
}));

// Checks to see if album is already in library and than either adds it or makes user aware that album is already in library
const addAlbumToLibrary = async(element) => {
    let albumId = element.target.getAttribute('data-albumid')
    await checkAlbumStatus(spotifyToken, albumId)
    .then(data => {
        if(data === false) {
                confirmAddAlbum(spotifyToken, albumId)
                createModal('Album added to your library')
                deleteModal()
            } else if (data === true) {
                createModal('Album already appears to be in your Library')
                deleteModal()
            }
    })};

// Toggle components Displays & clear content functions
function clearNewReleasesSection() {
    newReleasesSection.innerHTML = ''
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


// For testing only
consoleButton.addEventListener('click',(e) => {
    e.preventDefault;
    console.log(spotifyToken)
    // getGenres(spotifyToken)
    // searchGenre(spotifyToken,'rap')
})




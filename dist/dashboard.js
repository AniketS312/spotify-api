
// Spotify request link + access token passed back end
const spotifyURL = 'https://api.spotify.com/v1';
let spotifyToken = document.cookie.split('=')[1];
let testId = "4M2Mf4pmARKGVT9MLCe3HA"
let testGenre = 'electronic';

// data
let newReleases;
let additionalAlbums;
let genreSearchResults;
let nextloadMoreLink = "";
let loadMoreTypeIsNewReleases = true;

// components
const dashboardComponent = document.querySelector('.dashboard')
const successSection = document.querySelector('.success')
const newReleasesSection = document.querySelector('.new-releases')
const inputComponent = document.getElementById('genres')
const loadMoreSection = document.querySelector('.load-more')

// Buttons
const newReleasesButton = document.getElementById('get-releases')
const consoleButton = document.getElementById('console')
const loadMoreButton = document.getElementById('load-more-button')

// Get inital 50 albums on load and set menu Iems
window.addEventListener('load', () => {
    // Sets newReleases variable declared above
    getNewReleases(spotifyToken)
    addGenresToInput(menuItems)
    hideloadMoreSection()
})

// Search for Genres from Select Input
inputComponent.addEventListener('change', async function(element) {
    const genreValue = element.target.value
    loadMoreTypeIsNewReleases = false;
    hideSuccess()
    await getAlbumsByGenres(spotifyToken, genreValue)
    loadMorelink()
    clearNewReleasesSection()   
    showNewReleases()     
    genreSearchResults.forEach((data) => createCard(data.album, newReleasesSection))    
})

// Display 50 new releases fetched from above
newReleasesButton.addEventListener('click',(e) => {
    e.preventDefault; 
    clearNewReleasesSection()
    hideSuccess()
    nextloadMoreLink = newReleases.next
    newReleases.items.forEach((data) => createCard(data, newReleasesSection))
    showNewReleases()
    loadMorelink()
});

// Display 50 more new releases

loadMoreButton.addEventListener('click', async function(e) {
    e.preventDefault;
    if(loadMoreTypeIsNewReleases) {
        await getNewReleasesWithOffset(spotifyToken, nextloadMoreLink)
        additionalAlbums.items.forEach((data) => createCard(data, newReleasesSection))

    } else {
        await getAlbumsByGenresWithOffset(spotifyToken, nextloadMoreLink)
        // FIND A WAY TO FILTER ADDTIONAL ALBUMS
        additionalAlbums.items.forEach((data) => createCard(data.album, newReleasesSection))
    }
   loadMorelink()
})

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

function showloadMoreSection() {
    loadMoreSection.style.display = 'flex'
}

function hideloadMoreSection() {
    loadMoreSection.style.display = 'none'
}

function loadMorelink() {
    if(nextloadMoreLink === '' || nextloadMoreLink === null) {
        hideloadMoreSection()
    } else {
        showloadMoreSection()
    }
}

// For testing only
// consoleButton.addEventListener('click',(e) => {
//     e.preventDefault;
//     getNewReleasesTwo(spotifyToken)

//     if(nextloadMoreLink) {
//         showloadMoreSection()
//     } else {
//         hideloadMoreSection()
//     }

    // Add below code to dashboard.html
    // <a class="button" id="console">Console.log</a>
// })




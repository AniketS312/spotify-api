
// Gets new Releases - Unfiltered - CURRENTLY USED
const getNewReleases = async (token) => {
        const result = await fetch(`${spotifyURL}/search?q=tag%3Anew&type=album&limit=50`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token },
        })
        const data = await result.json();
        newReleases = await data.albums;
        nextloadMoreLink = data.albums.next  

}

// Gets new Releases - Current Spotify way
const getNewReleasesTwo = async (token) => {
    const result = await fetch(`${spotifyURL}/browse/new-releases?limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
        });
    
    const data = await result.json();
    newReleases = await data.albums;
    return data;
}

// Get new releases with offset to memic load more - Can only be done once
const getNewReleasesWithOffset = async (token, link) => {
    const result = await fetch(`${link}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
        });
    const data = await result.json();
    additionalAlbums = data.albums
    nextloadMoreLink = data.albums.next
    return data;
}

//  Search Albums by Genres - 

const getAlbumsByGenres = async(token, genre) => {
    const result = await fetch(`${spotifyURL}/search?q=genre%3A${genre}&type=track&limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    genreSearchResults = data.tracks.items
    console.log(data)
    return nextloadMoreLink = data.tracks.next    
}

const getAlbumsByGenresWithOffset = async(token, link) => {
    const result = await fetch(`${link}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    additionalAlbums = data.tracks
    return nextloadMoreLink = data.tracks.next    
}



// Fetch genre by artist - done as a second part of the new releases call
const fetchArtistGenre = async (token, artistId) => {
    const result = await fetch(`${spotifyURL}/artists/${artistId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    const genre = await data.genres
    return genre;
};


// Check to see if album is already in your library
const checkAlbumStatus = async(token, albumId) => {
    const result = await fetch(`${spotifyURL}/me/albums/contains?ids=${albumId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    inLibrary = data[0]
    return inLibrary
}

// Add album into your library --- PUT REQUEST
const confirmAddAlbum = async(token, albumId) => {
    const result = await fetch(`${spotifyURL}/me/albums?ids=${albumId}`, {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result;
    return data
}



// Internal use of getting valid Categories

const getCategories = async(token) => {
    const result = await fetch(`${spotifyURL}/browse/categories?limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    return console.log(data.categories)
}

// Internal use of getting valid genres
const getGenres = async(token) => {
    const result = await fetch(`${spotifyURL}/recommendations/available-genre-seeds`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    return console.log(data)
}

// Get Tracks by Genres - Alternative route to getting albums
const getTracksByGenres = async(token, genre) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=genre%3A${genre}&type=track&limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    return genreSearchResults = data.tracks.items
}




// Another way to get new releases - unorganized by day, unflitered in genre. Although more results.. it lacks any oranization. 


// Another way to get genres - testing out which way is better
// const getAlbumsByGenresTwo = async(token, genre) => {
//     const result = await fetch(`${spotifyURL}/recommendations?limit=100&seed_genres=${genre}`, {
//         method: 'GET',
//         headers: { 'Authorization': 'Bearer ' + token }
//     });
//     const data = await result.json();
//     return genreSearchResults = data.tracks
// }


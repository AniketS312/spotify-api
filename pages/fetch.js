
// Gets new Releases
const getNewReleases = async (token) => {
    const result = await fetch(`${spotifyURL}/browse/new-releases?limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
        });
    const data = await result.json();
    newReleases = await data.albums;
    return data;
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
    console.log(data)
    return data
}

// Search for genres
const searchGenre = async(token, genre) => {
    const result = await fetch(`${spotifyURL}/search?q=${genre}&type=track&limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    return genreSearchResults = data
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
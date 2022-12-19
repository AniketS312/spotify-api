
// Gets new Releases
const getNewReleases = async (token) => {
    const result = await fetch(`${spotifyURL}/browse/new-releases?limit=50`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
        Query: {
            'limit': 50
        }
        });
    const data = await result.json();
    newReleases = await data.albums;
    newReleasesLimit += await data.albums.limit
    return data;
}

const fetchArtistGenre = async (token, artistId) => {
    const result = await fetch(`${spotifyURL}/artists/${artistId}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();
    const genre = await data.genres
    return genre;
};
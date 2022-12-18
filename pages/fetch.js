
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
    newReleases =  data.albums;
    newReleasesLimit+= data.albums.limit
    return data;
}
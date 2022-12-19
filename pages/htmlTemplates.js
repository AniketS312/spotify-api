async function createCard(data) {
    // Await Genre from artist fetch as genre does not exist on new releases
    let genre = await fetchArtistGenre(spotifyToken, data.artists[0].id)
    // Create Main card component
    const albumCard = document.createElement('div');
    albumCard.classList.add('new-releases__album-card');
    albumCard.id = data.uri.split(':')[2]
    // Create Image component
    const image = document.createElement('img')
    image.height = 250;
    image.width = 250;
    image.src= data.images[0].url
    image.alt=`${data.name}`
    albumCard.appendChild(image);

    // Crate description component
    const descriptionComponent = document.createElement('div');
    descriptionComponent.classList.add('new-releases__album-card--description')
    albumCard.appendChild(descriptionComponent)

    // Create album info div
    const albumInfo = document.createElement('div');
    albumInfo.classList.add('album-info')
    const albumTitle = document.createElement('h2');
    const newTitle = data.name.split('').splice(0, 10).join('');
    albumTitle.innerText = `${newTitle}...`
    albumInfo.appendChild(albumTitle)
    const albumType = document.createElement('span');
    albumType.innerText= `${genre[0] === undefined ? '': genre[0]}${genre[1] === undefined ? '': '/'}${genre[1] === undefined? '': genre[1]}`
    albumInfo.appendChild(albumType)
    albumCard.appendChild(albumInfo);

    // Create Album Meta
    const albumMeta = document.createElement('div');
    albumMeta.classList.add('album-meta')
    const albumTime = document.createElement('time')
    albumTime.innerText = data.release_date
    albumMeta.appendChild(albumTime)

    const toAlbum = document.createElement('a')
    toAlbum.href= data.external_urls.spotify;
    toAlbum.setAttribute('target', '_blank')
    toAlbum.innerText = data.album_type === 'album' ? "To Album" : "To Single";
    albumMeta.appendChild(toAlbum)

    albumCard.appendChild(albumMeta);

    newReleasesSection.appendChild(albumCard)
}


// ----get album title
//  const newTestArray =  testArray.split('').splice(0, 10).join('')
// console.log(newTestArray+'...')
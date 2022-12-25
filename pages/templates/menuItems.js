const menuItems = [
    'alt-rock', 
    'alternative',
    'chicago-house', 
    'comedy', 
    'dance',
    'dancehall',
    'deep-house',
    'drum-and-bass',
    'edm',
    'electronic',
    'hard-rock',
    'heavy-metal',
    'hip-hop',
    'house',
    'indie',
    'metal',
    // 'new-release',
    'rock',
    'techno',
    'trip-hop',
    'work-out',
    'world-music'
]

const addGenresToInput = async function (items) {
    let transformedArray = [];
    await items.forEach(item => {
        if(item.includes('-') === true ) {
            const newItem = item.split('-')
            let joinedWord = [];
            newItem.forEach(element => {
                let output = element.split('')
                const capitalLetter = output[0].toUpperCase()
                const remainingChars = output.splice(1).join('')
                // console.log(capitalLetter.concat(remainingChars))
                joinedWord.push(capitalLetter.concat(remainingChars))
            })
            transformedArray.push(joinedWord.join(' '))

        } else {
            let output = item.split('')
            const capitalLetter = output[0].toUpperCase()
            const remainingChars = output.splice(1).join('')
            const transformedWord = capitalLetter + remainingChars
            transformedArray.push(transformedWord)
        }
    })
{/* <option value="volvo">volve</option> */}
    await transformedArray.forEach(function(element, index) {
        const optionElement = document.createElement('option')
        optionElement.value = items[index]
        optionElement.innerText = element
        inputComponent.appendChild(optionElement)
    })
}
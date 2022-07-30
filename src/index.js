document.addEventListener('DOMContentLoaded', () => {
    getPictures();
    getBreeds();
    dropdown.addEventListener('change', () => {
        if (dropdown.value === " ") {
            getBreeds();
        }
        else {
            removeAllChildren(dogBreeder);
            dropdownHandler()
        }
    })
});

const dogCatcher = document.getElementById('dog-image-container')
const dogBreeder = document.getElementById('dog-breeds')
const dropdown = document.getElementById('breed-dropdown')
let brds = []
function getPictures() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(images => {
        const imgs = images.message
        imgs.forEach(renderPictures);
    })
    
}
function renderPictures(dog) {
    let img = document.createElement('img')
    img.src = dog
    dogCatcher.append(img)
}

function getBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(breeds => {
        brds = Object.keys(breeds.message)
        brds.forEach(renderBreeds);
        console.log(breeds.message)
    })
}
function renderBreeds(breed) {
    let li = document.createElement('li')
    li.innerText = breed
    li.addEventListener('click', colorChange)
    dogBreeder.append(li)
}
function colorChange(e) {
   if (e.target.style.color === 'orange') {
        e.target.style.color = 'black'    
   }
   else {e.target.style.color = 'orange'}
}
function dropdownHandler() {
    const letter = dropdown.value
    let newBreeds = brds.filter(breed => breed.startsWith(letter))
    newBreeds.forEach(renderBreeds)
    
}
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
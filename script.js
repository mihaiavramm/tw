const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

// fetch the movies list
function getmovies() {
    fetch('http://localhost:3000/movies')
        .then(function (response) {
            // Trasform server response to get the movies
            response.json().then(function (movies) {
                appendmoviesToDOM(movies);
            });
        });
};

// post movies
function postMovie() {
    // creat post object
    const postObject = {
        name: formName.value,
        img: formUrl.value
    }
    // post dog
    fetch('http://localhost:3000/movies', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new movies list
        getmovies();
        // Reset Form
        resetForm();
    });
}

// delete dog
function deleteMovie(id) {
    // delete dog
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new movies list
        getmovies();
    });
}

// update dog
function updateMovie(id) {
    // creat put object
    const putObject = {
        name: formName.value,
        img: formUrl.value
    }
    // update dog
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new movies list
        getmovies();

        // change button event from update to add
        addButton.disabled = false;

        // remove all event from update button
        clearUpdateButtonEvents();

        // Reset Form
        resetForm();
    });
}

// copy edited dog information to form and add event listener on update button
function editMovie(movie) {
    // copy dog information to form
    formName.value = movie.name;
    formUrl.value = movie.img;
    
    // disable add button
    addButton.disabled = true;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateMovie(movie.id)
    });

}

// Create and append img and name DOM tags
function appendmoviesToDOM(movies) {
    // remove dog list if exist
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for (let i = 0; i < movies.length; i++) {
        // create image obj
        let img = document.createElement('img');
        img.src = movies[i].img;
        // create name obj
        let name = document.createElement('span');
        name.innerText = movies[i].name;

        // create button and event for edit and delete
        let editButton = document.createElement('button')
        // add event on btn and pass dog id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        editButton.addEventListener('click', function () {
            editMovie(movies[i])
        });
        editButton.innerText = 'Edit';
        let deleteButton = document.createElement('button')
        // add event on btn and pass dog object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        deleteButton.addEventListener('click', function () {
            deleteMovie(movies[i].id)
        });
        deleteButton.innerText = 'Delete';
        // create a container for img and name
        let container = document.createElement('div');
        // append elements to container
        container.appendChild(img);
        container.appendChild(name);
        container.appendChild(editButton);
        container.appendChild(deleteButton);

        // append container to DOM (list div)
        list.appendChild(container);
    }
}

// reset form
function resetForm() {
    formName.value = '';
    formUrl.value = '';
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
// add event listener on add button
addButton.addEventListener('click', postMovie);

// get movies
getmovies();
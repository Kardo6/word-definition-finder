const words = document.querySelector('.words');
const button = document.querySelector('.form__submit');
const searchBar = document.querySelector('.form__search');
const yourWord = document.querySelector('.your-word');
const loading = document.querySelector('.loading');

getWordDefinitions('Dedicated');

loading.textContent = 'Your Definition Is Loading.';

let loadingProcessTimer = setInterval(loadingTimer, 500);

async function getWordDefinitions(word) {
    try {
        const request = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const response = await request.json();

        loadingProcessBar('off');

        let allDefinitions = response[0].meanings[0].definitions;
        allDefinitions.forEach(get => {
            createNewDefinition(get.definition);
        });
    } catch (error) {
        createNewDefinition('There is no definition of this word!', error);
    }
}

function createNewDefinition(definition) {
    const li = document.createElement('li');
    li.textContent = definition;
    words.appendChild(li);
}

function loadingProcessBar(process) {
    if (process === 'off') {
        clearInterval(loadingProcessTimer);
        loading.textContent = '';
        return;
    } else if (process === 'on') {
        loading.textContent = 'Your Definition Is Loading.';
        loadingProcessTimer = setInterval(loadingTimer, 500);
        return;
    }
}

function loadingTimer() {
    loading.textContent += '.';

    if (loading.textContent.split('').filter(c => c === '.').length === 4) {
        loading.textContent = 'Your Definition Is Loading.';
    }
}

button.addEventListener('click', function (e) {
    e.preventDefault();

    const word = searchBar.value;
    if (word != '') {
        loadingProcessBar('on');
        yourWord.textContent = word;

        words.innerHTML = '';

        getWordDefinitions(word);
    }
});
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountrie = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountrie.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY))

function searchCountries(e) {
    e.preventDefault()
      const searchValue = inputCountrie.value;
    let oneStringSearchValue = searchValue.trim();

    if (oneStringSearchValue === '' ) {
        removeHTML();
        Notiflix.Notify.info('Please enter a name.');
    return
    }
    fetchCountries(oneStringSearchValue)
    .then(renderCountry)
    .catch(ifFetchError);
}


function renderCountry(countries) {
 const inputValueLength = Object.keys(countries).length;
    removeHTML();
    for (const country of countries) {

        const { flags, name, capital, population, languages } = country;

        const elementSymbols = `<li class = 'country-item'> <a class = 'country-flag' href = '${flags.svg}'>
        <img src = '${flags.svg}' alt = '${name.official}' width = '30' > </a>
        <h2 class="country-name">  ${name.official}</h2>
        </li>`;
        
        const elementInfo = `<p class="counry-capital"> <b>Capital:</b> <i>${capital}</i></p>
        <p class="counry-population"><b>Population:</b> <i>${population}</i></p>
        <p class="counry-laguages"><b>Languages:</b> <i>${Object.values(languages)}</i></p>`;

        if (inputValueLength > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            return;
        }
         checkSizeForRender(inputValueLength, elementSymbols, elementInfo);
    }
}

function checkSizeForRender(inputValueLength, elementSymbols, elementInfo) {

    if (inputValueLength <= 1) {
            countryList.insertAdjacentHTML('beforeend', elementSymbols);
            countryInfo.insertAdjacentHTML('beforeend', elementInfo);
        }
        else {
            countryList.insertAdjacentHTML('beforeend', elementSymbols);
        }
}

function ifFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function removeHTML () {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}


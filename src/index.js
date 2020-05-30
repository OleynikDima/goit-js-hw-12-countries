
import './styles.css';
import fetchCountries from './fetchCountries.js';
import tmpInfo from './temp-info.hbs';


import {error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

  


const Handlebars = require("handlebars");
const _ = require('lodash');

const input = document.querySelector('#input-js');
input.addEventListener('input', _.debounce(onSearchCountries,500));

const outout = document.querySelector('#output_all-js');
const listCoutres = document.querySelector('.list-js');



function onSearchCountries(event){
    event.preventDefault()
    const inputCount = event.target.value;
    
    if (inputCount.length !== 0){
//to do fetch
        fetchCountries(inputCount)
        .then(search => showNameCountries(search))
        //  fetchCountries(inputCount)
        // .then(search => console.log(search)
        // )ß

    }else{

// //if input empty delete all 
        input.removeEventListener('input',onSearchCountries);
        listCoutres.innerHTML = null;
        outout.innerHTML = null;
    };
};




function showNameCountries(items){
//смотрим сколько массивово у нас есть и перебирпем их 
    let countries = items.map(item => item);

    switch(true){
        case items.length > 10:
            console.log('more tuch ');
            const myAlert = error({
                text: "Too many matches found. Please enter a more specific query!",
                delay: 1500
              });
            listCoutres.innerHTML = null;
            outout.innerHTML = null;
            break;
        case items.length > 2 && items.length < 10:
            console.log('2-10');
            createShowListCountries(countries.splice(0,10));
            outout.innerHTML = null;
            break;
        case items.length === 1:
             console.log('1');
             createBoxInfoCountries(...countries);
             listCoutres.innerHTML = null;
             break;
    }

};


// Create List
function createShowListCountries(countries){
    const name  = countries.map((element) => createTempLi(element)).join('');  
    listCoutres.innerHTML = name
};

// Create Li and add to List
function createTempLi(item){
    return `<li class="name-countr__list">${item.name}</li>`
};

// This info Countries
function createBoxInfoCountries(counter){
    const boxDiv = tmpInfo(counter)
    outout.innerHTML = boxDiv;
};
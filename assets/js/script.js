// container for search modal
var breweryContainerEl = document.getElementById("brewery-container")

// locationSearchModal
const locationSearchModalTarget = document.getElementById("locationSearchModal");

// options with default values
const optionsLocSearchMod = {
    placement: 'center-center',
    backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    }
};

const locationSearchModal = new Modal(locationSearchModalTarget, optionsLocSearchMod);

// script to dismiss locationSearchError
const locationSearchError = document.getElementById('locationSearchError');

// options object
const optionsLocErr = {
    triggerEl: document.getElementById('triggerElement'),
    transition: 'transition-opacity',
    duration: 1000,
    timing: 'ease-out',
};

const dismissLocErr = new Dismiss(locationSearchError, optionsLocErr);

var modalExit = function () {
    locationSearchModal.hide()
};

document.getElementById("locBtn").addEventListener("click", modalExit);

// display list of breweries in modal
var displayBreweries = function (breweries) {
    
    // clear old content
    breweryContainerEl.textContent = "";


    // loop over breweries
    for (var i = 0; i < breweries.length; i++) {

        // create container for each brewery
        var breweryEl = document.createElement("div");

        // create header for brewery
        var header = document.createElement("h4");
        header.textContent = breweries[i].name;

        // create address for brewery
        var address = document.createElement("p");
        address.innerHTML = breweries[i].street + "<br>" + breweries[i].city + " " + breweries[i].state + ", " + breweries[i].postal_code;
        // var positionAddress = address;
        // console.log(positionAddress);

        //function display directions (attached to event listener on direction buttons)
        // var directions = document.querySelector(".address")
        // directions => positionstack fetch
        // HD code here

    
        

        

        // type of brewery
        var type = document.createElement("p");
        type.textContent = breweries[i].brewery_type

        // create link for website
        var website = document.createElement("a");
        website.setAttribute("href", breweries[i].website_url);
        website.setAttribute("target", "_blank")
        website.textContent = breweries[i].website_url;

        // create button element to send to journal
        var button = document.createElement("button");
        button.innerHTML = "Click here to add";

        // create button button to go to directions
        var direction = document.createElement("button");
        direction.innerHTML = "Click here for directions";
        // add function to go to new URL for directions
        $(direction).click(function(){
            window.open('http://google.com');
            });



        breweryEl.appendChild(header);
        breweryEl.appendChild(type);
        breweryEl.appendChild(address);
        breweryEl.appendChild(website);
        breweryEl.appendChild(button);
        breweryEl.appendChild(direction);

        breweryContainerEl.appendChild(breweryEl)
    };
};

// search for breweries in a city and state
$("#location-search").submit(function (event) {

    // prevent refresh
    event.preventDefault();

    // get info from form

    var city = ($("#city").val());

    var state = ($("#state").val());

    // convert city to proper format
    city = city.replace(" ", "_");
    city = city.toLowerCase();

    // generate api url
    var apiURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;

    // make request
    fetch(apiURL).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {

                // if data = null, return error
                if (data.length === 0) {
                    $("#locationSearchError").show();
                }
                // else log data
                else {
                    locationSearchModal.show();
                    displayBreweries(data);
                    console.log(data);
                }
            });
        };
    })

        // response fails
        .catch(function (error) {
            alert("Unable to connect to the database");
        });
});


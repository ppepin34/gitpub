// container for search modal
var breweryContainerEl = document.getElementById("brewery-container");
var journalContainerEl = document.getElementById("journalContainer");

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

//
var locModalExit = function () {
    locationSearchModal.hide()
};

// create Journal entry
var createJournal = function(brewery) {

    // create list item
    var journalEl = document.createElement("li");

    // create header
    var journalHeader = document.createElement("h3");
    journalHeader.textContent = brewery;

    // create date
    var date = document.createElement("span");
    date.textContent = "Enter a Date";

    // create journal content
    var journalContent = document.createElement("p");
    journalContent.textContent = "Tell us what you think about " + brewery;

    // append children to li
    journalEl.appendChild(journalHeader);
    journalEl.appendChild(date);
    journalEl.appendChild(journalContent)

    // append journal entry to container
    journalContainerEl.appendChild(journalEl)

    locationSearchModal.hide();
}
// display list of breweries in modal
var displayBreweries = function (breweries) {

    // clear old content
    breweryContainerEl.textContent = "";


    // loop over breweries
    for (var i = 0; i < breweries.length; i++) {

        // create container for each brewery
        var breweryEl = document.createElement("li");

        // create header for brewery
        var header = document.createElement("h4");
        header.textContent = breweries[i].name;

        // create address for brewery
        var address = document.createElement("p");
        address.innerHTML = breweries[i].street + "<br>" + breweries[i].city + " " + breweries[i].state + ", " + breweries[i].postal_code;
        address.classList.add("address");

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
        button.classList.add("breweryBtn")

        // create button button to go to directions
        var direction = document.createElement("button");
        direction.innerHTML = "Click here for directions";
        direction.classList.add("directionBtn")

        // pass directions
        document.querySelectorAll('.directionBtn').forEach(item => {
        console.log})
 

        // append to modal
        breweryEl.appendChild(header);
        breweryEl.appendChild(type);
        breweryEl.appendChild(address);
        breweryEl.appendChild(website);
        breweryEl.appendChild(button);
        breweryEl.appendChild(direction);

        breweryContainerEl.appendChild(breweryEl)
    };

    $(".breweryBtn").click(function(e){
        var breweryThis = e.target.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
        createJournal(breweryThis);
  });
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


// event listenr for location search modal journal entries
document.getElementsByClassName(".address")

// event listener for location search modal exit button
document.getElementById("locBtn").addEventListener("click", locModalExit);
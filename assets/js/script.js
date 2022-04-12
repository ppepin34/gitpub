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

var modalExit = function() {
    locationSearchModal.hide()
}; 

document.getElementById("locBtn").addEventListener("click", modalExit);

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
                    console.log(data)
                    locationSearchModal.show();
                }
            });
        };
    })

        // response fails
        .catch(function (error) {
            alert("Unable to connect to the database");
        });
});
// container for search modal
var breweryContainerEl = document.getElementById("brewery-container");

// container for journal
var journalContainerEl = document.getElementById("journalContainer");

// array for saved journal entries
var journalEntries = [];

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

// save journal entries
var saveJournals = function () {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
};

// create Journal entry from newly selected brewery
var createJournal = function (brewery) {

    // create list item
    var journalEl = document.createElement("li");
    journalEl.classList = ("flex flex-col bg-white rounded-md border-2 p2 m-2");

    // create header
    var journalHeader = document.createElement("h3");
    journalHeader.textContent = brewery;
    journalHeader.classList = ("px-2 text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white");

    // create date
    var date = document.createElement("span");
    date.textContent = "Enter a Date";
    date.classList = ("date px-2");

    // create journal content
    var journalContent = document.createElement("p");
    journalContent.classList = ("px-2");
    journalContent.textContent = "Tell us what you think about " + brewery;

    // create delete button
    var journalDelete = document.createElement("button");
    journalDelete.classList = ("deleteBtn btn inline-block m-4 px-4 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center");
    journalDelete.textContent = ("Delete this Entry");

    // append children to li
    journalEl.appendChild(journalHeader);
    journalEl.appendChild(date);
    journalEl.appendChild(journalContent);
    journalEl.appendChild(journalDelete);

    // append journal entry to container
    journalContainerEl.appendChild(journalEl);

    var arrayObject = {
        brewery: brewery,
        date: date.textContent,
        journal: journalContent.textContent
    };

    journalEntries.push(arrayObject);

    saveJournals();

    locationSearchModal.hide();
};

// display list of breweries in modal
var displayBreweries = function (breweries) {

    // clear old content
    breweryContainerEl.textContent = "";


    // loop over breweries
    for (var i = 0; i < breweries.length; i++) {

        // create container for each brewery
        var breweryEl = document.createElement("li");
        breweryEl.classList = ("border-2 hover:border-t-4");

        // create header for brewery
        var header = document.createElement("h4");
        header.classList = ("text-center text-2xl underline m-3 p-3 font-bold");
        header.textContent = breweries[i].name;

        // create address for brewery
        var address = document.createElement("p");
        address.innerHTML = breweries[i].street + ", <br>" + breweries[i].city + " " + breweries[i].state;
        address.classList = ("address m-3 p-3");

        // type of brewery
        var type = document.createElement("p");
        type.textContent = "Type: " + breweries[i].brewery_type
        type.classList = ("m-3 p-3 italic");

        // create link for website
        var website = document.createElement("a");
        website.setAttribute("href", breweries[i].website_url);
        website.setAttribute("target", "_blank");
        website.textContent = breweries[i].website_url;
        website.classList = ("m-3 p-3 no-underline hover:underline")

        // create button element to send to journal
        var button = document.createElement("button");
        button.innerHTML = "Click here to add";
        button.classList = ("breweryBtn btn inline-block m-4 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center")

        // create button button to go to directions
        var direction = document.createElement("button");
        direction.classList = ("directionBtn btn inline-block m-4 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center");
        direction.innerHTML = "Click here for directions";


        // pass directions
        document.querySelectorAll('.directionBtn').forEach(item => {
            console.log
        })


        // append to modal
        breweryEl.appendChild(header);
        breweryEl.appendChild(type);
        breweryEl.appendChild(address);
        breweryEl.appendChild(website);
        breweryEl.appendChild(button);
        breweryEl.appendChild(direction);

        breweryContainerEl.appendChild(breweryEl)
    };

    $(".breweryBtn").click(function (e) {
        var breweryThis = e.target.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
        createJournal(breweryThis);
    });
    $(".directionBtn").click(function (e) {
        var breweryAddress = e.target.previousSibling.previousSibling.previousSibling.textContent;
        console.log(breweryAddress);


        $.ajax({
            url: 'https://api.positionstack.com/v1/forward',
            data: {
                access_key: '3c901a01e99403584073b5175537c705',
                query: breweryAddress,
                limit: 1,
            }
        }).done(function (data) {
            console.log(Object.keys(data));
            var dataArray = Object.values(data);
            console.log(dataArray);
            var addressInfo = dataArray[0];
            console.log(addressInfo);
            var mapURL = addressInfo[0].map_url;
            console.log(mapURL);
            window.open(mapURL)
        });
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

// edit journal entries
$("#journalContainer").on("click", "p", function () {

    var text = $(this)
        .text()
        .trim();

    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$("#journalContainer").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    //get position in list
    var index = $(this)
        .closest("li")
        .index();

        console.log(index)

    // journalEntries[index].journal = text;
    // saveJournals;

    // recreate p element
    var journalP = $("<p>")
    journalP.text(text);
    journalP.classList = ("px-2");

    // replace text area with p element
    $(this).replaceWith(journalP);
});

$("#journalContainer").on("change", "input[type='text']", function () {
    //get current text
    var date = $(this)
        .val()
        .trim();

        console.log(date);

    //get position in list
    var index = $(this)
        .closest("li")
        .index();

        console.log(index);

    journalEntries[index].date = date;
    saveJournals;

    //recreate span element with bootstrap classes
    var dateSpan = $("<span>")
    dateSpan.text(date);
    dateSpan.classlist = ("date px-2");

    //replace input with span element
    $(this).replaceWith(dateSpan);
});

// visit date was clicked
$("#journalContainer").on("click", "span", function () {

    console.log("boop");
    // get current text
    var date = $(this)
        .text()
        .trim();

    //create new input element
    var dateInput = $("<input>")
        .attr("type", "text")
        .val(date);

    //swap out elements
    $(this).replaceWith(dateInput);

    //enable jquery ui datepicker
    dateInput.datepicker({
        minDate: new Date(2007, 1 - 1, 1),
        onClose: function () {
            //when claendar is closed, force a "change event on the `dateInput`
            $(this).trigger("change");
        }
    })

    //automatically focus on new element
    dateInput.trigger("focus");
});

var loadJournals = function() {
    journalEntries = JSON.parse(localStorage.getItem("journalEntries"));
  
    // if nothing in localStorage, end function
    if (!journalEntries) {
      return
    };
  
    // loop over object properties
    $.each(journalEntries, function(brewery, date, journal) {
      console.log(brewery, date, journal);
      // then loop over sub-array
    //   arr.forEach(function(task) {// create list item
        // var journalEl = document.createElement("li");
        // journalEl.classList = ("flex flex-col bg-white rounded-md border-2 p2 m-2");
    
        // // create header
        // var journalHeader = document.createElement("h3");
        // journalHeader.textContent = brewery;
        // journalHeader.classList = ("px-2 text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white");
    
        // // create date
        // var date = document.createElement("span");
        // date.textContent = "Enter a Date";
        // date.classList = ("date px-2");
    
        // // create journal content
        // var journalContent = document.createElement("p");
        // journalContent.classList = ("px-2");
        // journalContent.textContent = "Tell us what you think about " + brewery;
    
        // // create delete button
        // var journalDelete = document.createElement("button");
        // journalDelete.classList = ("deleteBtn btn inline-block m-4 px-4 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center");
        // journalDelete.textContent = ("Delete this Entry");
    
        // // append children to li
        // journalEl.appendChild(journalHeader);
        // journalEl.appendChild(date);
        // journalEl.appendChild(journalContent);
        // journalEl.appendChild(journalDelete);
    
        // // append journal entry to container
        // journalContainerEl.appendChild(journalEl);
    //   });
    });
  };
  

$("#journalContainer").on("click", ".deleteBtn", function () {

    //journa
    this.parentElement.remove();
});

// event listener for location search modal exit button
document.getElementById("locBtn").addEventListener("click", locModalExit);
var listStuff = function () {
    var apiURL = "https://api.openbrewerydb.org/breweries?by_city=richmond&by_state=virginia"
    fetch(apiURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            });
        } else {
            alert("Error you bastard")
        }
    })
}

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
                    console.log("No breweries found")
                }
                // else log data
                else {
                    console.log(data)
                }
                });    
        }
    })

    // response fails
    .catch(function (error) {
        alert("Unable to connect to the database");
    });
})
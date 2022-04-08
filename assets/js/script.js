var listRichmond

var listStuff = function() {
    console.log("check")
    var apiURL = "https://api.openbrewerydb.org/breweries?by_city=richmond"
    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then (function (data) {
                console.log(data)
            });
        } else {
            alert("Error you bastard")
        }
    })
}


listStuff();
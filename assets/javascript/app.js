console.log(`Java is working!`);
let map;

var totalRows = 5;
var cellsInRow = 5;
var min = 1;
var max = 10;

    function drawTable() {
        // get the reference for the body
        var div1 = document.getElementById('div1');
 
        // creates a <table> element
        var tbl = document.createElement("table");
 
        // creating rows
        for (var r = 0; r < totalRows; r++) {
            var row = document.createElement("tr");
	     
	     // create cells in row
             for (var c = 0; c < cellsInRow; c++) {
                var cell = document.createElement("td");
		getRandom = Math.floor(Math.random() * (max - min + 1)) + min;
                var cellText = document.createTextNode(Math.floor(Math.random() * (max - min + 1)) + min);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }           
            
	tbl.appendChild(row); // add the row to the end of the table body
        }
    
     div1.appendChild(tbl); // appends <table> into <div1>
}
window.onload=drawTable; 


function getInput() {
    event.preventDefault();
    console.log(`button is working`);
    // $(`#inputCity`).empty();
    
    let cityInput = $(`#inputCity`).val().trim();
    let inputState = $(`#inputState`).val().trim();
    

    const settings1 = {
        async: true,
        crossDomain: true,
        url: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${cityInput},${inputState}`,
        method: "GET",
        headers: {
            "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
            "x-rapidapi-key": "83433a047fmsh31c5f4e50fb1610p18af61jsn090f8ef0d26c"
        }
    }
    

    
$.ajax(settings1).done(function (response) {
        console.log(response.Results);
        let longitude = Number(response.Results[0].lon);
        let latitude = Number(response.Results[0].lat);
        // $(`#longitude`).text(`Longitude: ${longitude}`);
        // $(`#latitude`).text(`Latitude: ${latitude}`);
        initMap(latitude, longitude);  
        fourSquare(latitude, longitude);

        



    });

    

};

$(`.btn`).on(`click`, getInput);



function initMap(latitude, longitude){
    // console.log(latitude, longitude);
let options = {
    zoom: 10,
    center: {lat:latitude, lng: longitude }
}   
map = new
google.maps.Map(document.getElementById(`map`), options);


}
function createMarkers(latitude, longitude){
let marker = new google.maps.Marker({
    position: {lat:latitude, lng: longitude},
    map:map
});
}

// FOURSQUARE API

function fourSquare(latitude, longitude){
fetch(`https://api.foursquare.com/v2/venues/explore?client_id=R3BQG1QOQ5EGU1J40COJNGJ35QB2ZRQBZ3RZU33HGFBCEKLK&client_secret=USPSYAGMLHKZJLEUWVN02IVMVWSLOMWUJDJAIKV22O5YZHHY&v=20180323&limit=13&ll=` + latitude + `,` +longitude + `&query=venues`)
   .then(response => response.json())
   .then(data =>{

console.log(data.response);


    for (let i =0; i< data.response.groups[0].items.length; i++){
createMarkers(data.response.groups[0].items[i].venue.location.lat, data.response.groups[0].items[i].venue.location.lng);
    }

   });
};









    
    
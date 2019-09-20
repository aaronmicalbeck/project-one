console.log(`JavaScript is working!`);
let map;

var totalRows = 5;
var cellsInRow = 5;
var min = 1;
var max = 10;

function drawTable(arr) {
  console.log(`table is working`);
  $("#tBody").empty();  

  // creating rows
  // data.response.groups[0].items
  for (var r = 0; r < arr.length; r++) {
    var row = $("<tr>");
    let c1 = $("<td>").text(arr[r].venue.name);
    let c2 = $("<td>").text(arr[r].venue.location.formattedAddress[0] + `, ` + arr[r].venue.location.formattedAddress[1]);
    let c3 = $("<td>").text(arr[r].venue.location.distance + ` feet`);
    // create cells in row
    
    row.append(c1);
    row.append(c2);
    row.append(c3);
    $("#tBody").append(row); // add the row to the end of the table body
  }
}

// SUBMIT FUNCTION THAT DOES IT ALLLLL

function getInput() {
  event.preventDefault();
  console.log(`button is working`);
  // $(`#inputCity`).empty();

  let cityInput = $(`#inputCity`)
    .val()
    .trim();
  let inputState = $(`#inputState`)
    .val()
    .trim();

  const settings1 = {
    async: true,
    crossDomain: true,
    url: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${cityInput},${inputState}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
      "x-rapidapi-key": "83433a047fmsh31c5f4e50fb1610p18af61jsn090f8ef0d26c"
    }
  };

  $.ajax(settings1).done(function(response) {
    console.log(response.Results);
    let longitude = Number(response.Results[0].lon);
    let latitude = Number(response.Results[0].lat);
    // $(`#longitude`).text(`Longitude: ${longitude}`);
    // $(`#latitude`).text(`Latitude: ${latitude}`);
    initMap(latitude, longitude);
    fourSquare(latitude, longitude);
  });
}

$(`.btn`).on(`click`, getInput);

// GOOGLE MAPS API

function initMap(latitude, longitude) {
  // console.log(latitude, longitude);
  let options = {
    zoom: 13,
    center: { lat: latitude, lng: longitude }
  };
  map = new google.maps.Map(document.getElementById(`map`), options);
}
function createMarkers(latitude, longitude) {
  let marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map
  });
}

// FOURSQUARE API


function fourSquare(latitude, longitude) {
  fetch(
    `https://api.foursquare.com/v2/venues/explore?client_id=R3BQG1QOQ5EGU1J40COJNGJ35QB2ZRQBZ3RZU33HGFBCEKLK&client_secret=USPSYAGMLHKZJLEUWVN02IVMVWSLOMWUJDJAIKV22O5YZHHY&v=20180323&limit=12&ll=` +
      latitude +
      `,` +
      longitude +
      `&query=venues`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data.response.groups[0].items);

      for (let i = 0; i < data.response.groups[0].items.length; i++) {
        createMarkers(
          data.response.groups[0].items[i].venue.location.lat,
          data.response.groups[0].items[i].venue.location.lng
        );
      }
      drawTable(data.response.groups[0].items);
    });
}










    
    


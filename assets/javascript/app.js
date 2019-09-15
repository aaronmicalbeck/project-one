console.log(`Java is working!`);



function initMap(){
let options = {
    zoom: 10,
    center: {lat:32.2226, lng: -110.9747 }
}   
let map = new
google.maps.Map(document.getElementById(`map`), options);

let marker = new google.maps.Marker({
    position: {lat:32.221721795700596, lng:-110.9664299893252},
    map:map
});

let infoWindow = new google.maps.InfoWindow({
    content: `<h1> Rialto Theater </h1>`
});

marker.addListenter(`click`, function(){
infoWindow.open(map, marker);
});

}


fetch('https://api.foursquare.com/v2/venues/explore?client_id=R3BQG1QOQ5EGU1J40COJNGJ35QB2ZRQBZ3RZU33HGFBCEKLK&client_secret=USPSYAGMLHKZJLEUWVN02IVMVWSLOMWUJDJAIKV22O5YZHHY&v=20180323&limit=13&ll=32.2226,-110.97478&query=venues')
    .then(response => response.json())
    .then(data =>{
console.log(data.response.groups[0].items[0].venue.name, data.response.groups[0].items[0].venue.location.lat, data.response.groups[0].items[0].venue.location.lng);
    });

    
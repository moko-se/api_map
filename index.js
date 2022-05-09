// Variables
const Root = document.querySelector('#root');
const List = document.querySelector('#list');
const Map = document.querySelector('#map');
//Listes des restaurants
function apiResto(){
    // Variables
    let data = [];

    // Ajax api
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.status == 200) {
            data = JSON.parse(this.response);
            
            data.forEach( (info,index) => {
                let msg = '';
                info.ratings.map( m => {
                    msg += `
                        <li>
                            <div>
                                <span class='span1'>
                                    <i class='fas fa-user-circle'></i>
                                </span>
                                <span class='span2'>
                                    ${m.stars} <sup><i class='fas fa-star'></i></sup>
                                </span>
                            </div>
                            <div>
                                <p>${m.comment}</p> 
                            </div>
                        </li>
                    `
                    // console.log(msg);


                });
                 
                
                addListResto(info.restaurantName, info.address, msg, index);
            });

            initMap(data);
        }

    }

    xhr.open("GET", "http://localhost/ajax/TP2/data.json", true);
    xhr.send();
}
apiResto();

//Render
let ul = document.createElement('ul');
ul.setAttribute('class', 'list')

function addListResto(name, address, msg, index){
    ul.innerHTML += `
        <li class='card'>
            <div class='box_head'>
                <h3 class='title-h3'>${name}</h3>
            </div>
            <p class='text'>${address}</p>
            <ul class='others-info' data-key=${index}>${msg}</ul>
        </li>
    `

    List.appendChild(ul);

    const cards = document.querySelectorAll('.card');
    const Others = document.querySelectorAll('.others-info');

    // cards.forEach(ind =>{
    //     console.log(ind.getAttribute('data-id'));
    // })

    cards.forEach( card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            if (!card.classList.contains('is_active')){
                e.currentTarget.classList.add('is_active');
            } else {
                e.currentTarget.classList.remove('is_active');
            }

        });
    });
}

function ratFunc(){
    const rat = document.querySelector("form");
    rat.addEventListener('submit', (e) => {
        e.preventDefault()

        alert('ok');
    })
}

ratFunc();
// Make marker in map
function addMarker(lat, lng) {
    let location = { lat: lat, lng:lng };

    new google.maps.Marker({
        position: location,
        map: map,
        icon: './img/location-pin.png'
    });

}
// InitMap
function initMap(data) {
    // console.clear();

    let map = new google.maps.Map(this.map, {
        zoom: 15
    });

    // Position des restaurants
    data.forEach(item => {

        // addMarker(item.lat, item.long);
        const locationResto = {
            lat: item.lat,
            lng: item.long
        }

        new google.maps.Marker({
            position: locationResto,
            map: map,
            icon: './img/location-pin.png'
        });
    });

    // Position de l'utilisateur
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            map.setCenter(pos);

            const content = `
                <h2> Hello world this is me ! </h2>
            `
            const infowindow = new google.maps.InfoWindow({
                content: content,
            });

            const marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: './img/pin.png'
            });

            marker.addListener("mouseover", () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
            });
        });

    }
}

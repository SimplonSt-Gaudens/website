var map;
var panel;
var initialize;
var calculate;
var direction;

$(document).ready(function() {

    // Jérôme //
    var stickyNavTop = $('.menuGen').offset().top;

    var stickyNav = function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('.menuGen').addClass('sticky');
        } else {
            $('.menuGen').removeClass('sticky');
        }
    };
    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });


    // David //
    var offset = $("#sidebar").offset();
    var topPadding = 200;

    $(window).scroll(function() {
        if ($(window).scrollTop() > offset.top) {
            $("#sidebar").stop().animate({
                marginTop: $(window).scrollTop() - offset.top + topPadding
            });
        } else {
            $("#sidebar").stop().animate({
                marginTop: 0
            });
        }
    });

    //Patrick//
    function initialisation() {
        var LatLng = new google.maps.LatLng(43.109178300248146, 0.7265326380729675);
        var optionsCarte = {
            zoom: 17,
            center: LatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var maCarte = new google.maps.Map(document.getElementById("carte"), optionsCarte);

        var styleArray = [{
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }];

        direction = new google.maps.DirectionsRenderer({
            map: map,
            panel: panel // Dom element pour afficher les instructions d'itinéraire
        });


        var optionsMarqueur = {
            position: LatLng,
            map: maCarte,
            styles: styleArray,
            title: "Simplon Saint-Gaudens"
        };
        var marqueur = new google.maps.Marker(optionsMarqueur);
    }
    google.maps.event.addDomListener(window, 'load', initialisation);

    calculate = function() {
        origin = document.getElementById('origin').value; // Le point départ
        console.log(origin);
        destination = document.getElementById('destination').value; // Le point d'arrivé
        console.log(destination);
        if (origin && destination) {
            var request = {
                origin: origin,
                destination: destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING // Type de transport
            }
            var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
            directionsService.route(request, function(response, status) { // Envoie de la requête pour calculer le parcours
                if (status == google.maps.DirectionsStatus.OK) {
                    direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
                }
            });
        } //http://code.google.com/intl/fr-FR/apis/maps/documentation/javascript/reference.html#DirectionsRequest
    };




});
$(document).ready(function () {

    // Jérôme //
    var stickyNavTop = $('.menuGen').offset().top;

    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('.menuGen').addClass('sticky');
            $('.div.navbar.navbar-default').removeClass('notSticky');
        } else {
            $('.menuGen').removeClass('sticky');
            $('.div.navbar.navbar-default').addClass('notSticky');
        }
    };
    stickyNav();

    $(window).scroll(function () {
        stickyNav();
    });

    /* konami code */
    var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
        n = 0;
    $(document).keydown(function (e) {
        if (e.keyCode === k[n++]) {
            if (n === k.length) {
                $('body').toggleClass("rotate")
                n = 0;
                return false;
            }
        } else {
            n = 0;
        }
    });

    // David //
    var offset = $("#sidebar").offset();
    var topPadding = 200;

    $(window).scroll(function () {
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
            map: maCarte,


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

    document.onkeypress = function (e) {
        var enterpressed = e ? e.which == 13 : window.event.keyCode == 13;
        if (enterpressed) {
            calculate();
            return false;
        }
    }

    calculate = function () {
        var depart = document.getElementById('origin').value; // Le point départ
        // console.log(depart);
        var destination = "1 rue de l'Avenir 31800 Saint-Gaudens"; // Le point d'arrivé


        if (origin && destination) {
            var request = {
                origin: depart,
                destination: destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING // Type de transport
            }
            // console.log(request);
            var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
            // console.log(directionsService);
            directionsService.route(request, function (response, status) { // Envoie de la requête pour calculer le parcours
                if (status == google.maps.DirectionsStatus.OK) {
                    direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours

                    $.ajax({
                        url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + depart + "%7C&destinations=" + destination + "%7C&mode=driving&language=fr-FR&key=AIzaSyBm6euhXQowM8zwx_YPULIYj3rh3HVt5YI",
                        success: function (data) {
                            var duree = data.rows[0].elements[0].duration.text;
                            var distance = data.rows[0].elements[0].distance.text;
                            // console.log(data);

                            $("#total").html("En voiture, votre trajet pour nous rejoindre durera  " + duree + " pour une distance de " + distance + ".</li>");
                        }
                    })
                };
            });
        };
    };

    function autocompletion() {
        $("#origin").autocomplete({
            source: function (request, response) {
                $.getJSON(
                    "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=FR&q=" + request.term,
                    function (data) {
                        response(data);
                        maxRows: 3;
                    }
                );
            },
            minLength: 3,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $("#origin").val(selectedObj.value);
                return false;
            },
            open: function () {
                jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
        $("#origin").autocomplete("option", "delay", 100);
    };
    autocompletion();


    // function computeTotalDistance(result) {
    //     var total = 0;
    //     var myroute = result.routes[0];
    //     console.log(myroute);
    //     for (i = 0; i < myroute.legs.length; i++) {
    //         total += myroute.legs[i].distance.value;
    //     }
    //     total = total / 1000.
    //     console.log(total);
    //     document.getElementById("total").innerHTML = total + " km";

    // }

    // google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    //     computeTotalDistance(directionsDisplay.directions);
    // });

    google.maps.event.addDomListener(window, 'load', initialisation);
});
window.onload = function() {
    var add = document.getElementById("add");
    var content = document.getElementById("content");
    var i;

    makeRequest();

    function makeRequest() {
        var httpRequest = new XMLHttpRequest(); //creaza un obiect XMLHttpRequest
        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.open('GET', './transport_data.json');
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status == 200) {
                    let info = JSON.parse(httpRequest.responseText);
                    localStorage.setItem('number_of_transport_boxes', String(info.length));

                    for (i = 0; i < info.length; i++) {
                        var new_ob = document.createElement("article");
                        var text;
                        var button;

                        new_ob.classList = "grid-item ride";
                        new_ob.id = `box_number_${i}`;

                        text = `<h1><i class="fa fa-map-marker"></i>${info[i].departure} <i class="fa fa-chevron-right"></i> ${info[i].arrival}</h1><br>`;
                        text += `<p><i class="fa fa-calendar"></i>${info[i].date}</p><br>`;
                        text += `<p><i class="fa fa-clock-o"></i>${info[i].time}</p><br>`;
                        text += `<p><i class="fa fa-map-marker"></i>${info[i].from_location}</p><br>`;
                        text += `<p><i class="fa fa-map-marker"></i>${info[i].to_location}</p><br>`;
                        text += `<p id="paragraph_number${i}"><i class="fa fa-child"></i>${info[i].number_of_sits}</p><br>`;
                        text += `<button id="button_number${i}">Vreau sa merg!</button>`;
                        new_ob.innerHTML = text;

                        content.insertBefore(new_ob, document.getElementById("add-content"));
                    }

                    for (i = 0; i < parseInt(localStorage.getItem('number_of_transport_boxes')); i++) {
                        document.getElementById(`button_number${i}`).onclick = function() {
                            alert(document.getElementById(`paragraph_number${i}`));
                        }
                    }
                } else {
                    alert('There was a problem with the request.');
                }
            }
        }
    }
}
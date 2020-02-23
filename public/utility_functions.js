window.onload = function() {
    var slideshow = document.getElementById("change-slideshow-picture");
    var add_meet_container = document.getElementById("add-meet-container");
    var add_meet_content = document.getElementById("add-meet-content");
    var delete_meet_content = document.getElementById("delete-meet-content");
    var delete_el = document.getElementById("first-meet");

    document.getElementById("coordinates").onclick = Poz;

    function Poz(event) {
        document.getElementById("coordinates").innerText = "Coordinates:\nevent.clientX-Y " + event.clientX + ' ' + event.clientY + '\n' +
            "event.pageX-Y: " + event.pageX + ' ' + event.pageY + '\n' +
            "event.screenX-Y " + event.screenX + ' ' + event.screenY;
    }

    var data;
    var httpObj;

    var interval;
    // var end = 15000;

    function startInterval() { interval = setInterval(make_request, 3000); }

    // function stopInterval() { clearInterval(interval); }

    startInterval();
    // setTimeout(stopInterval, end);

    slideshow.onclick = function() {
        make_request();
    }

    var myWindow;
    var open_window = document.getElementById("open_window");
    var close_window = document.getElementById("close_window");


    open_window.onclick = function() {
        myWindow = window.open("https://www.shutterfly.com/ideas/family-quotes/", "_blank", "top=100, left=200, height=400, width=900, toolbar=no");
    }

    close_window.onclick = function() {
        myWindow.close();
    }

    add_meet_content.onclick = function() {
        var obj = document.createElement("article");
        obj.classList = "grid-item meet";
        obj.innerHTML = `<h1><i class="fa fa-map-marker"></i>La ceainarie</h1><br>
        <p><i class="fa fa-calendar"></i><b>Data:</b> 20/06/2025</p> <br>
        <p><i class="fa fa-clock-o"></i><b>Ora:</b> 12:45</p><br>
        <p><i class="fa fa-child"></i><b>Vin:</b> Ionel Popescu</p><br>
        <p><i class="fa fa-info-circle"></i>Intrunire nefireasca</p><br>
        <button>Vin si eu!</button>`;

        document.getElementById('add-here').insertBefore(obj, add_meet_container);
        add_meet_container.style.backgroundColor = "green";
    }

    delete_meet_content.addEventListener("click", delete_elem, true);
}

function delete_elem() {
    let list = document.getElementById("add-here");

    if (list.childNodes.length >= 2) {
        document.getElementById('add-here').removeChild(list.childNodes[0]);
    }
    document.getElementById("add-meet-container").style.backgroundColor = "red";
}

function make_request() {
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert('Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = change_picture;
    httpRequest.open('GET', 'pictures.json');
    httpRequest.send();
}

function change_picture(data) {
    let picture = document.getElementById("slideshow-picture");
    let index = localStorage.getItem("slideshowPictureNumber");

    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            if (index == 'NaN') {
                index = 0;
                localStorage.setItem("slideshowPictureNumber", "0");

            } else {
                index = parseInt(index);
                index = (index + 1) % 3;
                localStorage.setItem("slideshowPictureNumber", index);
            }

            data = JSON.parse(httpRequest.responseText);
            picture.src = data[index].source;

        } else {
            alert('There was a problem with the request.');
        }
    }
}
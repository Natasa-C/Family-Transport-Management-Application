window.onload = function() {
    var httpRequest;
    makeRequest();

    function makeRequest() {
        httpRequest = new XMLHttpRequest(); //creaza un obiect XMLHttpRequest
        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = addInfo;
        httpRequest.open('GET', './transport_data.json');
        httpRequest.send();
    }

    function addInfo() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                alert(httpRequest.responseText); //continutul fis. test.html
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}
// window.onload = function() {
//     var add = document.getElementById("add");
//     var content = document.getElementById("content");

//     makeRequest();

//     function makeRequest() {
//         var httpRequest = new XMLHttpRequest(); //creaza un obiect XMLHttpRequest
//         if (!httpRequest) {
//             alert('Giving up :( Cannot create an XMLHTTP instance');
//             return false;
//         }

//         httpRequest.open('GET', './transport_data.json');
//         httpRequest.send();
//         httpRequest.onreadystatechange = function() {
//             if (httpRequest.readyState == 4) {
//                 if (httpRequest.status == 200) {
//                     let i;
//                     let info = JSON.parse(httpRequest.responseText);
//                     localStorage.setItem('number_of_transport_boxes', String(info.length));

//                     // Mongo
//                     // let data;

//                     // let prom = new Promise((resolve, reject) => {
//                     //     app.db[collection].findOne(query)
//                     //         .then(result => {
//                     //             if (result) {
//                     //                 data = result;
//                     //             }
//                     //             else {
//                     //                 data = -1;
//                     //             }
//                     //             resolve();
//                     //         })
//                     //         .catch(function (error) {
//                     //             console.error(`Failed to find document: ${error}`);
//                     //             reject();
//                     //         })
//                     // });
//                     // await prom;

//                     // return data;

//                     for (i = 0; i < info.length; i++) {
//                         var new_ob = document.createElement("article");
//                         var text;
//                         var button;

//                         new_ob.classList = "grid-item ride";
//                         new_ob.id = `box_number_${i}`;

//                         text = `<h1><i class="fa fa-map-marker"></i>${info[i].departure} <i class="fa fa-chevron-right"></i> ${info[i].arrival}</h1><br>`;
//                         text += `<p><i class="fa fa-calendar"></i>${info[i].date}</p><br>`;
//                         text += `<p><i class="fa fa-clock-o"></i>${info[i].time}</p><br>`;
//                         text += `<p><i class="fa fa-map-marker"></i>${info[i].from_location}</p><br>`;
//                         text += `<p><i class="fa fa-map-marker"></i>${info[i].to_location}</p><br>`;
//                         text += `<p id="paragraph_number_${i}"><i class="fa fa-child"></i>${info[i].number_of_sits}</p><br>`;
//                         text += `<p id="come_number_${i}" class='not-comeing'><i class="fa fa-child"></i>Comeing: </p><br>`;
//                         text += `<button id="button_number_${i}">Add person</button>`;
//                         new_ob.innerHTML = text;

//                         content.insertBefore(new_ob, document.getElementById("add-content"));
//                     }

//                     for (i = 0; i < info.length; i++) {
//                         let button = document.getElementById(`button_number_${i}`);
//                         let paragraph = document.getElementById(`paragraph_number_${i}`);
//                         let come = document.getElementById(`come_number_${i}`);

//                         button.onclick = function() {
//                             let number = paragraph.innerHTML.split('>');

//                             if (String(parseInt(number[2])) >= 1) {
//                                 let name = prompt('Person name:');
//                                 come.classList = 'comeing';

//                                 paragraph.innerHTML = number[0] + '>' + number[1] + '>' + String(parseInt(number[2]) - 1);
//                                 if (parseInt(number[2]) == 1) {
//                                     button.innerHTML = 'No places available ';
//                                 }

//                                 number = come.innerHTML.split('>');
//                                 if (number[2] != 'Comeing: ') {
//                                     come.innerHTML = come.innerHTML + ', ' + name;
//                                 } else {
//                                     come.innerHTML = come.innerHTML + ' ' + name;
//                                 }
//                             } else {
//                                 alert('No more places available!');
//                             }
//                         }
//                     }
//                 } else {
//                     alert('There was a problem with the request.');
//                 }
//             }
//         }
//     }
// }
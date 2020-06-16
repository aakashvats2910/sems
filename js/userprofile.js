const nameField = document.querySelector('#name-field');
const emailField = document.querySelector('#email-field');
const uidField = document.querySelector('#uid-field');
const mobileField = document.querySelector('#mobile-field');

const eventTable = document.querySelector('#event');

var uidOfChild = getParameterByName("childuid");

getProfileBasicData();
getRegisteredEvents();


function getProfileBasicData() {
    db.collection("students").doc(uidOfChild).get().then(function(gotJson) {
        var dataStudent = gotJson.data();
        nameField.innerText = "Name : " + dataStudent.NAME;
        emailField.innerText = "Email : " + dataStudent.email;
        mobileField.innerText = "Mobile Number : " + dataStudent.mobile;
        uidField.innerText = "Unique Id : " + gotJson.id;
    });
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getRegisteredEvents() {
    db.collection("events").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            

            console.log(doc.id);


            db.collection("events").doc(doc.id).collection("registerations").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(insideDoc) {
                    if (insideDoc.id === uidOfChild) {
                        var xyz = doc.data();
                        console.log("EQUAL EQUAL")
                        addDataToTable(xyz.EVENT_NAME, xyz.RESULT, doc.id);
                    } else {
                        console.log("NOT EQUAL NOT EQUAL : ")
                    }
                });
            });


        });
    });
}

function addDataToTable(eventName, status, uid) {
    var newRow = eventTable.insertRow();

    var eventCell = newRow.insertCell(0);
    var eventText = document.createTextNode(eventName);
    eventCell.appendChild(eventText);

    var statusCell = newRow.insertCell(1);
    var statusText = document.createTextNode(status);
    statusCell.appendChild(statusText);

    var uidCell = newRow.insertCell(2);
    var uidText = document.createTextNode(uid);
    uidCell.appendChild(uidText);
}
const resultTable = document.querySelector('#result-table');
const eventsTable = document.querySelector('#events-table');

// Hide
// resultTable.style.visibility = "hidden";

getEventsList();

// addDataToTable("aakash","wesdyijkcnsiduh892h3eh09");

function addDataToTable(name, uid,  mobile, roll) {
    var newRow = resultTable.insertRow();

    var nameCell = newRow.insertCell(0);
    var nameText = document.createTextNode(name);
    nameCell.appendChild(nameText);

    var uidCell = newRow.insertCell(1);
    var uidText = document.createTextNode(uid);
    uidCell.appendChild(uidText);

    var mobileCell = newRow.insertCell(2);
    var mobileText = document.createTextNode(mobile);
    mobileCell.appendChild(mobileText);

    var rollCell = newRow.insertCell(3);
    var rollText = document.createTextNode(roll);
    rollCell.appendChild(rollText);

    newRow.addEventListener('click', (e) => {
        console.log("EVENT : " + uid);
        window.open('userprofile.html?childuid=' + uid, '_self');
    });

    newRow.style.cursor = "pointer";
}

function addDataToTableEvents(name, uid, result) {
    var newRow = eventsTable.insertRow();

    var nameCell = newRow.insertCell(0);
    var nameText = document.createTextNode(name);
    nameCell.appendChild(nameText);

    var uidCell = newRow.insertCell(1);
    var uidText = document.createTextNode(uid);
    uidCell.appendChild(uidText);

    var resultCell = newRow.insertCell(2);
    var resultText = document.createTextNode(result);
    resultCell.appendChild(resultText);

    newRow.addEventListener('click', (e) => {
        console.log("EVENT : " + uid);
        getRegisteredUIDs(uid);
    });

    newRow.style.cursor = "pointer";
}

function getEventsList() {
    db.collection("events").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var innerData = doc.data();
            addDataToTableEvents(innerData.EVENT_NAME, doc.id, innerData.RESULT);
        })
    });
}

function getRegisteredUIDs(eventUID) {
    clearTable();
    db.collection('events').doc(eventUID)
        .collection('registerations').get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var uid = doc.id;
                getStudentDetails(uid);

            })
        });
}

function getStudentDetails(studentUid) {
    db.collection('students').doc(studentUid).get().then(function (got) {
        var details = got.data();
        console.log(details)
        addDataToTable(details.NAME, studentUid, details.mobile, details.rollnumber);
    })
}

function clearTable() {
    resultTable.innerHTML = "<tr><th>Student Name</th><th>Unique Id</th><th>Mobile</th><th>RollNo.</th></tr>";
}


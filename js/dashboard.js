const students_field = document.querySelector('#students-registered');
const teacher_field = document.querySelector('#teacher-available');
const ongoing_field = document.querySelector('#ongoing-events');
const admin_name = document.querySelector('#admin-name');
const event_submit_button = document.querySelector('#event-submit-button');
const log_out_button = document.querySelector('#log-out-button');

const event_name_field = document.querySelector('#event-name-field');
const description_field = document.querySelector('#description-field');
const rules_regulations_field = document.querySelector('#rules-regulation-field');
const prize_field = document.querySelector('#prize-field');
const teachers_assigned_field = document.querySelector('#teachers-assigned-field');

const right_log_out = document.querySelector('#right-log-out');

// Getting the UID of the admin from the firebase firestore.
console.log(sessionStorage.getItem('uid'));

// To be deployed in final version.
// To close the window if the user is not valid!
// If the user opens the file directly this will block the access.
// It will close the file immediatly showing an Alert/Error!

if (sessionStorage.getItem('uid') == null) {
    console.log('REACHED!!!!!');
    window.alert('No Legitimate User found!');
    window.open('login.html', '_self');
}

// Initiate the dashboard with the basic data.
getBasicData(sessionStorage.getItem('uid'));

event_submit_button.addEventListener('click', (e) => {
    console.log('EVENT SUBMIT BUTTON');
    registerEvent(event_name_field.value, description_field.value,
        rules_regulations_field.value, prize_field.value, teachers_assigned_field.value);
});

log_out_button.addEventListener('click', (e) => {
    logOut();
});

right_log_out.addEventListener('click', (e) => {
    console.log('LOg ouT');
});

function getBasicData(id) { 
    // ,------.,--.,------. ,------.    ,--.   ,--. ,-----. ,------. ,--. ,--. ,---.   
    // |  .---'|  ||  .--. '|  .---'    |  |   |  |'  .-.  '|  .--. '|  .'   /'   .-'  
    // |  `--, |  ||  '--'.'|  `--,     |  |.'.|  ||  | |  ||  '--'.'|  .   ' `.  `-.  
    // |  |`   |  ||  |\  \ |  `---.    |   ,'.   |'  '-'  '|  |\  \ |  |\   \.-'    | 
    // `--'    `--'`--' '--'`------'    '--'   '--' `-----' `--' '--'`--' '--'`-----'  
                                                                                
    db.collection('admin').doc(id).get().then(function (doc) {
        if (doc.exists) {
            var adminData = doc.data();
            admin_name.innerText = adminData.NAME;
        } else {
            console.log('Unable to get data!');
            window.alert('No legitimate User found!');
            window.open('login.html','_self');
        }
    });
    db.collection('staticdata').doc('Y2Jb231xdez5eLcEFLKt').get().then(function (doc) {
        if (doc.exists) {
            var staticData = doc.data();
            students_field.innerText = staticData.STUDENTS_REGISTERED;
            teacher_field.innerText = staticData.TEACHERS_AVAILABLE;
            ongoing_field.innerText = staticData.ONGOING_EVENTS;
        } else {
            console.log('Nothing found!');
        }
    }).catch(function (error) {
        console.log('Error :: ' + error.message);
    }); 
}

// Under development.
function registerEvent(eventsName, description, rulesRegulations, prizes, teachersAssigned) {
    db.collection('events').add({
        EVENT_NAME: eventsName,
        DESCRIPTION: description,
        RULES_REGULATIONS: rulesRegulations,
        PRIZES: prizes,
        TEACHERS_ASSIGNED: teachersAssigned
    }).then(ref => {
        console.log('Auto ID : ' + ref.id);
        window.alert('Event Registered!');
    }).catch(function(error) {
        console.log('Unwated error :: ' + error.message);
    });
}

function logOut() {
    firebase.auth().signOut().then(function () {
        console.log('signed_out-successfully');
    }).then(function() {
        sessionStorage.setItem('uid', null);
        window.open('login.html','_self');
    }).catch(function (error) {
        console.log('===== : ' + error.message);
    });
}
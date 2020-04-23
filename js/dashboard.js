const students_field = document.querySelector('#students-registered');
const teacher_field = document.querySelector('#teacher-available');
const ongoing_field = document.querySelector('#ongoing-events');
const assigned_field = document.querySelector('#teacher-assigned');
const admin_name = document.querySelector('#admin-name');
const event_submit_button = document.querySelector('#event-submit-button');
const log_out_button = document.querySelector('#log-out-button');

// For the submission of the event on the new Dialog Box!
const event_name_field = document.querySelector('#event-name-field');
const description_field = document.querySelector('#description-field');
const rules_regulations_field = document.querySelector('#rules-regulation-field');
const prize_field = document.querySelector('#prize-field');
const teachers_assigned_field = document.querySelector('#teachers-assigned-field');

// For the total events!
const events_list_field = document.querySelector('#events-list');

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
getBasicDataAdmin(sessionStorage.getItem('uid'));

event_submit_button.addEventListener('click', (e) => {
    console.log('EVENT SUBMIT BUTTON');
    registerEvent(event_name_field.value, description_field.value,
        rules_regulations_field.value, prize_field.value, teachers_assigned_field.value);
});

log_out_button.addEventListener('click', (e) => {
    logOut();
});

right_log_out.addEventListener('click', (e) => {
    console.log('Log ouT');
});

// ,------.,--.,------. ,------.    ,--.   ,--. ,-----. ,------. ,--. ,--. ,---.   
// |  .---'|  ||  .--. '|  .---'    |  |   |  |'  .-.  '|  .--. '|  .'   /'   .-'  
// |  `--, |  ||  '--'.'|  `--,     |  |.'.|  ||  | |  ||  '--'.'|  .   ' `.  `-.  
// |  |`   |  ||  |\  \ |  `---.    |   ,'.   |'  '-'  '|  |\  \ |  |\   \.-'    | 
// `--'    `--'`--' '--'`------'    '--'   '--' `-----' `--' '--'`--' '--'`-----'  

function getBasicDataAdmin(id) {
    db.collection('admin').doc(id).get().then(function (doc) {
        if (doc.exists) {
            var adminData = doc.data();
            admin_name.innerText = adminData.NAME;
        } else {
            // console.log('Unable to get data!');
            // window.alert('No legitimate User found!');
            // window.open('login.html', '_self');
            getBasicDataStudent(id);
        }
    });
    db.collection('staticdata').doc('Y2Jb231xdez5eLcEFLKt').get().then(function (doc) {
        if (doc.exists) {
            var staticData = doc.data();
            students_field.innerText = staticData.STUDENTS_REGISTERED;
            teacher_field.innerText = staticData.TEACHERS_AVAILABLE;
            ongoing_field.innerText = staticData.ONGOING_EVENTS;
            assigned_field.innerText = staticData.TEACHERS_ASSIGNED;
        } else {
            console.log('Nothing found!');
        }
    }).catch(function (error) {
        console.log('Error :: ' + error.message);
    });
    initiateEvents();
}

// Alpha vserion.
function getBasicDataStudent(id) {
    db.collection('students').doc(id).get().then(function (doc) {
        if (doc.exists) {
            var adminData = doc.data();
            admin_name.innerText = adminData.NAME;
        } else {
            console.log('Unable to get data!');
            window.alert('No legitimate User found!');
            window.open('login.html', '_self');
        }
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
    }).catch(function (error) {
        console.log('Unwated error :: ' + error.message);
    });
}

function logOut() {
    firebase.auth().signOut().then(function () {
        console.log('signed_out-successfully');
    }).then(function () {
        sessionStorage.setItem('uid', null);
        window.open('login.html', '_self');
    }).catch(function (error) {
        console.log('===== : ' + error.message);
    });
}

function initiateEvents() {
    db.collection("events").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var abc = doc.data();
            addToEventsList(abc.EVENT_NAME + " - " + doc.id);
        })
    });
}

function addToEventsList(item_) {
    var node = document.createElement('li');
    var textNode = document.createTextNode(item_);
    var a = document.createElement('a');
    // a.setAttribute('href', 'Cricket.html');
    a.appendChild(textNode);
    node.appendChild(a);

    node.addEventListener('click', (e) => {
        console.log(cropToGetDocumentId(node.innerText));
        sessionStorage.setItem('event_clicked', cropToGetDocumentId(node.innerText));
        window.open('Cricket.html', '_self');
    });

    events_list_field.appendChild(node);
}

function cropToGetDocumentId(x) {
    var index = x.indexOf('-');
    return x.substring(index+2, x.length);
}



//  _______ _                     _                                    _       _   _     _                           _                      _ 
// |__   __| |                   (_)                                  | |     | | | |   (_)                         | |                    | |
//    | |  | |__   ___ _ __ ___   _ ___   _ __   ___    ___ _   _  ___| |__   | |_| |__  _ _ __   __ _    __ _ ___  | |__   ___  _ __   ___| |
//    | |  | '_ \ / _ \ '__/ _ \ | / __| | '_ \ / _ \  / __| | | |/ __| '_ \  | __| '_ \| | '_ \ / _` |  / _` / __| | '_ \ / _ \| '_ \ / _ \ |
//    | |  | | | |  __/ | |  __/ | \__ \ | | | | (_) | \__ \ |_| | (__| | | | | |_| | | | | | | | (_| | | (_| \__ \ | | | | (_) | |_) |  __/_|
//    |_|  |_| |_|\___|_|  \___| |_|___/ |_| |_|\___/  |___/\__,_|\___|_| |_|  \__|_| |_|_|_| |_|\__, |  \__,_|___/ |_| |_|\___/| .__/ \___(_)
//                                                                                                __/ |                         | |           
//                                                                                               |___/                          |_|           
// _______ _                                           _            __   _                        _                   _   _     _             
// |__   __| |                                         | |          / _| | |                      (_)                 | | | |   (_)            
//    | |  | |__   ___    ___ ___  _ __   ___ ___ _ __ | |_    ___ | |_  | |__   ___  _ __   ___   _ ___   _ __   ___ | |_| |__  _ _ __   __ _ 
//    | |  | '_ \ / _ \  / __/ _ \| '_ \ / __/ _ \ '_ \| __|  / _ \|  _| | '_ \ / _ \| '_ \ / _ \ | / __| | '_ \ / _ \| __| '_ \| | '_ \ / _` |
//    | |  | | | |  __/ | (_| (_) | | | | (_|  __/ |_) | |_  | (_) | |   | | | | (_) | |_) |  __/ | \__ \ | | | | (_) | |_| | | | | | | | (_| |
//    |_|  |_| |_|\___|  \___\___/|_| |_|\___\___| .__/ \__|  \___/|_|   |_| |_|\___/| .__/ \___| |_|___/ |_| |_|\___/ \__|_| |_|_|_| |_|\__, |
//                                               | |                                 | |                                                  __/ |
//                                               |_|                                 |_|                                                 |___/ 
// _   _                         _       _                                                            _  
// | | | |                       (_)     (_)                                                          | | 
// | |_| |__   __ _ _ __     __ _ ___   ___ _ __   __ _   _   _ _ __      __ _  __      _____  _ __ __| | 
// | __| '_ \ / _` | '_ \   / _` | \ \ / / | '_ \ / _` | | | | | '_ \    / _` | \ \ /\ / / _ \| '__/ _` | 
// | |_| | | | (_| | | | | | (_| | |\ V /| | | | | (_| | | |_| | |_) |  | (_| |  \ V  V / (_) | | | (_| | 
//  \__|_| |_|\__,_|_| |_|  \__, |_| \_/ |_|_| |_|\__, |  \__,_| .__( )  \__,_|   \_/\_/ \___/|_|  \__,_| 
//                           __/ |                 __/ |       | |  |/                                    
//                          |___/                 |___/        |_|                                        
// _   _           _     _           _     _                     _                                                _               
// | | | |         | |   | |         | |   | |                   | |                                              (_)              
// | |_| |__   __ _| |_  | |__   ___ | | __| |___   _ __   ___   | |_ _ __ _   _  ___   _ __ ___   ___  __ _ _ __  _ _ __   __ _   
// | __| '_ \ / _` | __| | '_ \ / _ \| |/ _` / __| | '_ \ / _ \  | __| '__| | | |/ _ \ | '_ ` _ \ / _ \/ _` | '_ \| | '_ \ / _` |  
// | |_| | | | (_| | |_  | | | | (_) | | (_| \__ \ | | | | (_) | | |_| |  | |_| |  __/ | | | | | |  __/ (_| | | | | | | | | (_| |_ 
//  \__|_| |_|\__,_|\__| |_| |_|\___/|_|\__,_|___/ |_| |_|\___/   \__|_|   \__,_|\___| |_| |_| |_|\___|\__,_|_| |_|_|_| |_|\__, (_)
//                                                                                                                          __/ |  
//                                                                                                                         |___/   
//             ____  _     _ _          _    _      _     _ _           
//            / __ \| |   (_) |        | |  | |    | |   (_) |          
//   ______  | |  | | |__  _| |_ ___   | |  | | ___| |__  _| |__   __ _ 
//  |______| | |  | | '_ \| | __/ _ \  | |  | |/ __| '_ \| | '_ \ / _` |
//           | |__| | |_) | | || (_) | | |__| | (__| | | | | | | | (_| |
//            \____/|_.__/|_|\__\___/   \____/ \___|_| |_|_|_| |_|\__,_|


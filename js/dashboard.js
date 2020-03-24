const students_field = document.querySelector('#students-registered');
const teacher_field = document.querySelector('#teacher-available');
const ongoing_field = document.querySelector('#ongoing-events');
const admin_name = document.querySelector('#admin-name');

const log_out_button = document.querySelector('#log-out');

const adminId = sessionStorage.getItem('uid');

// To be deployed in final version.
// To close the window if the user is not valid!
// If the user opens the file directly this will block the access.
// It will close the file immediatly showing an Alert/Error!
if (adminId == null) {
    window.alert('No Legitimate User found!');
    window.close();
}

getBasicData(adminId);

function getBasicData(id) {
    db.collection('staticdata').doc('Y2Jb231xdez5eLcEFLKt').get().then(function(doc) {
        if (doc.exists) {
            var staticData = doc.data();
            students_field.innerText = staticData.STUDENTS_REGISTERED;
            teacher_field.innerText = staticData.TEACHERS_AVAILABLE;
            ongoing_field.innerText = staticData.ONGOING_EVENTS;
        } else {
            console.log('Nothing found!');
        }
    }).catch(function(error) {
        console.log('Error :: ' + error.message);
    });
    db.collection('admin').doc(id).get().then(function(doc) {
        if (doc.exists) {
            var adminData = doc.data();
            admin_name.innerText = adminData.NAME;
        } else {
            console.log('Unable to get data!');
        }
    });
}

log_out_button.addEventListener('click', (e) => {
    console.log('clicked');
});


const register = document.querySelector('#sign-up');
const form = document.querySelector('#form');
register.addEventListener('click', (e) => {
	e.preventDefault();

	const username = document.querySelector('#username');
	const pass = document.querySelector('#pass');
	const roll = document.querySelector('#roll');
	const mobile = document.querySelector('#mobile');
	const form = document.querySelector('#form');
	const mess = document.querySelector('#mess');

	sessionStorage.setItem('username_m', username.value);
	sessionStorage.setItem('roll_m', roll.value);
	sessionStorage.setItem('pass_m', pass.value);
	sessionStorage.setItem('mobile_m', mobile.value);


	// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-new');
	// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-up', {
	// 	'size': 'invisible',
	// 	'callback': function (response) {
	// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
	// 		onSignInSubmit();
	// 	}
	// });
	// var appVerifier = window.recaptchaVerifier;

	console.log(pass.value);

	// ==================================================================

	// var provider = new firebase.auth.PhoneAuthProvider();
	// provider.verifyPhoneNumber('+91' + mobile.value, recaptchaVerifier)
	// 	.then(function (verificationId) {
	// 		var verificationCode = window.prompt('Please enter the verification ' +
	// 			'code that was sent to your mobile device.');
	// 		return firebase.auth.PhoneAuthProvider.credential(verificationId,
	// 			verificationCode);
	// 	})
	// 	.then(function (phoneCredential) {
	// 		console.log('REACHER HERE!');
	// 		console.log(phoneCredential);
	// 		return firebase.auth().signInWithCredential(phoneCredential);
	// 	}).then(function (xyz) {
	// 		window.open('login.html', '_self');
	// 	}).catch(function (error) {
	// 		window.alert(error.message);
	// 		location.reload();
	// 	});



	// firebase.auth().signInWithPhoneNumber("+91" + mobile.value, appVerifier)
	// 	.then(function (confirmationResult) {
	// 		console.log("SMS SENT! HUrray!");
	// 		window.open('OTP.html', '_self');
	// 		console.log('OPENED!!!');



	// 		// SMS sent. Prompt user to type the code from the message, then sign the
	// 		// user in with confirmationResult.confirm(code).
	// 		window.confirmationResult = confirmationResult;
	// 		sessionStorage.setItem('confirmation_result', confirmationResult);
	// 	}).catch(function (error) {
	// 		console.log("======");
	// 		console.log(error.message);
	// 		// Error; SMS not sent
	// 		// ...
	// 	});

	//==============================================


	auth.createUserWithEmailAndPassword(username.value, pass.value).then(c => {

		db.collection("students").doc(c.user.uid).set({
			rollnumber: roll.value,
			password: pass.value,
			mobile: mobile.value,
			email: username.value
		}).then(function () {
			console.log('Written successfull');
			form.reset();
			window.open('login.html', '_self');
			//Signing out the user when the registraion occured!
			firebase.auth().signOut().then(function () {
				console.log('signed_out-successfully');
			}).catch(function (error) {
				console.log('===== : ' + error.message);
			});
		}).catch(function (error) {
			console.log('=====' + error.message);
		});



	}).catch((err) => {
		console.log("errorororor", err.message);
		form.reset();
	})

});




const register = document.querySelector('#sign-up');
const form = document.querySelector('#form');
		register.addEventListener('click', (e) =>{
			e.preventDefault();
			const username = document.querySelector('#username');
			const pass = document.querySelector('#pass');
			const roll = document.querySelector('#roll');
			const mobile = document.querySelector('#mobile');
			const form = document.querySelector('#form');
			const mess = document.querySelector('#mess');

			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container-new');
			var appVerifier = window.recaptchaVerifier;

			console.log(pass.value);

			firebase.auth().signInWithPhoneNumber("+91" + mobile.value, appVerifier)
				.then(function (confirmationResult) {
					console.log("SMS SENT! HUrray!");
					window.open('OTP.html','_self');
					console.log('OPENED!!!');

					sessionStorage.setItem('username_m', username.value);
					sessionStorage.setItem('roll_m', roll.value);
					sessionStorage.setItem('pass_m', pass.value);
					sessionStorage.setItem('mobile_m', mobile.value);

				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				}).catch(function (error) {
					console.log("======");
					console.log(error.message);
				// Error; SMS not sent
				// ...
				});

			// auth.createUserWithEmailAndPassword(username.value, pass.value).then(c => {
				
			// 	db.collection("students").doc(c.user.uid).set({
			// 		rollnumber: roll.value,
			// 		password: pass.value,
			// 		mobile: mobile.value
			// 	})

			// console.log("successfull");
			// form.reset();

			// }).catch((err) =>{
			// 	console.log("errorororor", err.message);
			// 	form.reset();
			// })

		});


        

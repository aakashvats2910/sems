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

			auth.createUserWithEmailAndPassword(username.value, pass.value).then(c => {
				
				db.collection("students").doc(c.user.uid).set({
					rollnumber: roll.value,
					password: pass.value,
					mobile: mobile.value
				})

			console.log("successfull");
			form.reset();

			}).catch((err) =>{
				console.log("errorororor", err.message);
				form.reset();
			})

		});
        

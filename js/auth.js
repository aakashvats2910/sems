const register = document.querySelector('.login-content');
		register.addEventListener('submit', (e) =>{
			e.preventDefault();
			const username = document.querySelector('#username');
			const pass = document.querySelector('#pass');
			const roll = document.querySelector('#roll');
			const mess = document.querySelector('#mess');

			auth.createUserWithEmailAndPassword(username.value, pass.value).then(c => {
				
				db.collection("students").doc(c.user.uid).set({
				rollnuber: roll.value	    			
			})
			.then(() => {
				username.innerHTML = '';
				pass.innerHTML = '';
				roll.innerHTML = '';
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});


			})

		});
        

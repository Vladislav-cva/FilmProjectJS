const tegs = ['authorization', 'regist', 'sign', 'firstName', 'lastName', 'inputAdress', 'inputPassw', 'blockStart','inputAdressAuthorization','inputPasswAuthorization', 'blockStartAuth']
const elems = tegs.map(item => document.getElementById(item))
const [
    authorization,                                                                         
    regist,
    signUp,
    getFirstName,
    getLastName,
    getEmail,
    getPassword,
    getStarted,
    inputAdressAuthorization,
    inputPasswAuthorization,
    blockStartAuth
] = elems
const switchLog = document.getElementsByClassName('login');
const apiPath = 'https://api.jsonbin.io';
const signUpUserdata = {
	name: '',
	syrname: '',
	email: '',
	password: ''
};

for (let i = 0; i < switchLog.length; i++) {
	switchLog[i].addEventListener('click', function(event) {
		if (event.target.value === 'SignUp') {
			regist.style.display = 'block';
			authorization.style.display = 'none';
			signUp.innerHTML = 'SignUp';
		}
		if (event.target.value === 'LoginUp') {
			regist.style.display = 'none';
			authorization.style.display = 'block';
			signUp.innerHTML = 'Hi';
		}
	});
}
getEmail.addEventListener('blur', function() {
	const Reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	    if (!Reg.test(getEmail.value)) {
		    getEmail.style.backgroundColor = 'Red';
		    return;
	    }
	getEmail.style.backgroundColor = 'aliceblue';
});

getFirstName.addEventListener('blur', function() {
	if (getFirstName.value) getFirstName.style.backgroundColor = '#fff';
});

getLastName.addEventListener('blur', function() {
	if (getLastName.value) getLastName.style.backgroundColor = '#fff';
});

getPassword.addEventListener('blur', function() {
	if (getPassword.value) getPassword.style.backgroundColor = '#fff';
});

getStarted.addEventListener('click', function(event) {
	if (getFirstName.value && getLastName.value && getPassword.value && getEmail.value) {
		signUpUserdata.name = getFirstName.value;
		signUpUserdata.syrname = getLastName.value;
		signUpUserdata.email = getEmail.value;
		signUpUserdata.password = getPassword.value;
		sendData(apiPath, signUpUserdata);
		getFirstName.value = '';
		getLastName.value = '';
		getEmail.value = '';
		getPassword.value = '';
	} else {
		getFirstName.style.backgroundColor = 'Red';
		getLastName.style.backgroundColor = 'Red';
		getEmail.style.backgroundColor = 'Red';
		getPassword.style.backgroundColor = 'Red';
		event.preventDefault();
	}
});

inputAdressAuthorization.addEventListener('blur', function() {
	const Reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (!Reg.test(inputAdressAuthorization.value)) {
		inputAdressAuthorization.style.backgroundColor = 'Red';
		return;
	}
	inputAdressAuthorization.style.backgroundColor = '#fff';
});

inputPasswAuthorization.addEventListener('blur', function() {
	if (inputPasswAuthorization.value) inputPasswAuthorization.style.backgroundColor = '#fff';
});

inputAdressAuthorization.addEventListener('blur', function() {
	if (inputAdressAuthorization.value) inputAdressAuthorization.style.backgroundColor = '#fff';
});

blockStartAuth.addEventListener('click', function(event) {
	if (inputAdressAuthorization.value && inputPasswAuthorization.value) {
		getData(apiPath).then(function(arg) {
			if (
				arg.user.email !== inputAdressAuthorization.value ||
				arg.user.password !== inputPasswAuthorization.value
			) {
				alert('Зарегистрируйтесь!');
			} else if (arg.user.email === '') {
				alert('введите Email и пароль');
			} else {
				alert('добро пожаловать');
			}
		});
	} else {
		inputAdressAuthorization.style.backgroundColor = 'Red';
		inputPasswAuthorization.style.backgroundColor = 'Red';
		event.preventDefault();
	}
});

// Отправляем данные регистрации на сервер
function sendData(url = '', data = {}) {
	fetch(`${url}/b/5f2c68d9dddf413f95be8768`, {
		method: 'PUT', // Get
		headers: {
			'Content-Type': 'application/json',
			'secret-key': '$2b$10$kpFjHKKM33QLRENstqIZhO4Efl35CiDmerQeAS.f41YrJ2NuzID3C'
		},
		body: JSON.stringify({ user: data })
	}).then(() => {
		console.log('Вы успешно зарегистрированы');
	});
}
//Получаем данные
async function getData(url = '') {
	const Response = await fetch(`${url}/b/5f2c68d9dddf413f95be8768/latest`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'secret-key': '$2b$10$kpFjHKKM33QLRENstqIZhO4Efl35CiDmerQeAS.f41YrJ2NuzID3C'
		}
	});
	if (Response.status === 200) {
		const Json = await Response.json();
		return Json;
	}
}



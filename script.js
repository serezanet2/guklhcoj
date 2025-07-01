// Конфигурация Firebase (замените на свою конфигурацию)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Элементы DOM
const googleSignInBtn = document.getElementById('google-signin');
const signInForm = document.getElementById('email-signin');
const signUpForm = document.getElementById('email-signup');
const showSignUp = document.getElementById('show-signup');
const showSignIn = document.getElementById('show-signin');
const signInFormDiv = document.getElementById('signin-form');
const signUpFormDiv = document.getElementById('signup-form');
const userProfileDiv = document.getElementById('user-profile');
const signOutBtn = document.getElementById('signout-btn');
const userNameSpan = document.getElementById('user-name');
const userEmailSpan = document.getElementById('user-email');

// Переключение между формами входа и регистрации
showSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    signInFormDiv.classList.add('hidden');
    signUpFormDiv.classList.remove('hidden');
});

showSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpFormDiv.classList.add('hidden');
    signInFormDiv.classList.remove('hidden');
});

// Вход через Google
googleSignInBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            // Успешный вход
            console.log('Успешный вход через Google:', result.user);
        })
        .catch((error) => {
            console.error('Ошибка входа через Google:', error);
            alert('Ошибка входа через Google: ' + error.message);
        });
});

// Вход по email и паролю
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Успешный вход
            console.log('Успешный вход:', userCredential.user);
        })
        .catch((error) => {
            console.error('Ошибка входа:', error);
            alert('Ошибка входа: ' + error.message);
        });
});

// Регистрация по email и паролю
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Успешная регистрация
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            console.log('Успешная регистрация');
        })
        .catch((error) => {
            console.error('Ошибка регистрации:', error);
            alert('Ошибка регистрации: ' + error.message);
        });
});

// Выход из системы
signOutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log('Успешный выход');
        })
        .catch((error) => {
            console.error('Ошибка выхода:', error);
        });
});

// Отслеживание состояния аутентификации
auth.onAuthStateChanged((user) => {
    if (user) {
        // Пользователь вошел в систему
        signInFormDiv.classList.add('hidden');
        signUpFormDiv.classList.add('hidden');
        userProfileDiv.classList.remove('hidden');
        
        userNameSpan.textContent = user.displayName || 'Пользователь';
        userEmailSpan.textContent = user.email;
    } else {
        // Пользователь вышел из системы
        signInFormDiv.classList.remove('hidden');
        userProfileDiv.classList.add('hidden');
    }
});

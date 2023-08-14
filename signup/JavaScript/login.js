import { auth, db, doc, getDoc, signInWithEmailAndPassword } from '../../firebase.js';

const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginBtn.addEventListener('click', login);
window.addEventListener("load", function () {
    if (localStorage.getItem('user') !== null) {
        history.back();
        return;
    }else if(localStorage.getItem('user') === accountType){
        history.back();
        return;
    }
});

if (localStorage.getItem('user')) {
    const userData = JSON.parse(localStorage.getItem('user'));
    redirectToDashboard(userData.accountType);
}

async function login() {
    try {
        const email = emailInput.value;
        const password = passwordInput.value;

        // Disable the login button during login process
        disableLoginButton();

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", userCredential.user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            handleLoginError('No such user!');
            return;
        }

        const userData = userDoc.data();
        localStorage.setItem('user', JSON.stringify(userData));

        if (!userData.accVerified) {
            handleUnverifiedAccount();
            return;
        }

        redirectToUserDashboard(userData.accountType);

    } catch (error) {
        console.log(error);
        handleLoginError(error.message);
    } finally {
        // Re-enable the login button
        enableLoginButton();
    }
}

function handleLoginError(errorMessage) {
    alert(errorMessage);
}

function handleUnverifiedAccount() {
    alert('Your account is not verified yet!');
}

function redirectToUserDashboard(accountType) {
    const dashboardPath = getDashboardPath(accountType);
    if (dashboardPath) {
        window.location.replace(dashboardPath);
    } else {
        handleLoginError('Invalid account type');
    }
}

function getDashboardPath(accountType) {
    if (accountType === 'admin') {
        return '../../admin/index.html';
    } else if (accountType === 'Vendor') {
        return '../../Vendor/vendorDashboard.html';
    } else if (accountType === 'Customer') {
        return '../../Customer/index.html';
    }
    return null;
}

function disableLoginButton() {
    loginBtn.disabled = true;
    loginBtn.innerHTML = 'Logging In...';
}

function enableLoginButton() {
    loginBtn.disabled = false;
    loginBtn.innerHTML = 'Login';
}
function redirectToDashboard(accountType) {
    const dashboardMapping = {
        admin: "../admin/index.html",
        Vendor: "../../Vendor/vendorDashboard.html",
        Customer: "../customer/index.html",
        // Add more account types if needed
    };

    const dashboardPath = dashboardMapping[accountType];
    
    if (dashboardPath) {
        window.location.assign(dashboardPath);
    }
}
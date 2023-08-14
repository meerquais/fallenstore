import {
    db,
    auth,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
} from "../../firebase.js";

const SignupBtn = document.getElementById("SignupBtn");

SignupBtn.addEventListener("click", SignUp);

if (localStorage.getItem('user')) {
    const userData = JSON.parse(localStorage.getItem('user'));
    redirectToDashboard(userData.accountType);
}

async function SignUp() {
    try {
        const fullName = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phone").value;
        const accountType = document.getElementById("accountType").value;

        if (!fullName || !email || !password || !phone || accountType === "Select Account Type") {
            alert("Please fill all the fields");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        const userAuth = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userAuth.user.uid;
        const userObj = {
            fullName,
            email,
            phone,
            accountType,
            uid,
            accVerified: accountType === "Vendor" ? false : true,
        };

        const userRef = doc(db, "users", uid);
        await setDoc(userRef, userObj);
    
        disableSignUpButton();

        window.location.assign("./login.html");
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}
function disableSignUpButton() {
    SignupBtn.disabled = true;
    SignupBtn.innerHTML = 'Logging In...';
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
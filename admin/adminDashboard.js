import { collection, db, doc, getDocs, updateDoc } from '../firebase.js';

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);

window.addEventListener("load", function () {
    if (localStorage.getItem("user") === null) {
        window.location.replace("/");
        return;
    } else {
        if (userData.accountType !== "admin") {
            history.back();
            return;
        }
    }
});

const userListContainer = document.getElementById('userList');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logout);


function logout() {
    // Perform any necessary logout actions, such as clearing local storage
    localStorage.removeItem("user");
    // Redirect the user to the login page
    window.location.replace("/");
}


async function fetchAndDisplayUsers() {
    try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        userListContainer.innerHTML = '';

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            const userItem = document.createElement('div');
            userItem.className = 'user-item col-md-3'; // Add col class and adjust column size for responsiveness

            userItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${userData.fullName}</h5>
                        <p class="card-text">${userData.email}</p>
                        <p class="card-text">${userData.accountType}</p>
                        <button class="btn btn-success activate-btn" data-uid="${userDoc.id}" ${userData.accVerified ? 'disabled' : ''}>Activate</button>
                        <button class="btn btn-danger deactivate-btn" data-uid="${userDoc.id}" ${userData.accVerified ? '' : 'disabled'}>Deactivate</button>
                    </div>
                </div>
            `;

            userListContainer.appendChild(userItem);
        });

        // ...

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function activateAccount(event) {
    try {
        const uid = event.target.getAttribute('data-uid');
        console.log('Activating account:', uid);
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { accVerified: true });
        fetchAndDisplayUsers();
    } catch (error) {
        console.error('Error activating account:', error);
    }
}

async function deactivateAccount(event) {
    try {
        const uid = event.target.getAttribute('data-uid');
        console.log('Deactivating account:', uid);
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { accVerified: false });
        fetchAndDisplayUsers();
    } catch (error) {
        console.error('Error deactivating account:', error);
    }
}

fetchAndDisplayUsers();

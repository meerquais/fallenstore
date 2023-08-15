import { collection, db, doc, getDocs, updateDoc } from '../firebase.js';

const userListContainer = document.getElementById('userList');
const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', logout);

function logout() {
    localStorage.removeItem("user");
    window.location.replace("/");
}

async function fetchAndDisplayUsers() {
    try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        userListContainer.innerHTML = '';

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            const userItem = document.createElement('div');
            userItem.className = 'user-item col-md-3';

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
            console.log(userData)
            userListContainer.appendChild(userItem);
        });

        // Attach event listeners after user data is displayed
        const activateBtns = document.querySelectorAll('.activate-btn');
        const deactivateBtns = document.querySelectorAll('.deactivate-btn');
        activateBtns.forEach((btn) => {
            btn.addEventListener('click', activateAccount);
        });
        deactivateBtns.forEach((btn) => {
            btn.addEventListener('click', deactivateAccount);
        });

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function activateAccount(event) {
    try {
        const uid = event.target.getAttribute('data-uid');
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
        const userRef = doc(db, 'users', uid);
        const data = { accVerified: false };
        await updateDoc(userRef, data);
        fetchAndDisplayUsers();
    } catch (error) {
        console.error('Error deactivating account:', error);
    }
}

fetchAndDisplayUsers();

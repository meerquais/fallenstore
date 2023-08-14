import { auth, db, storage } from './firebase.js';

const profilePicInput = document.getElementById('profilePicInput');
const uploadProfilePicBtn = document.getElementById('uploadProfilePicBtn');
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const productImageInput = document.getElementById('productImage');
const postProductBtn = document.getElementById('postProductBtn');
const logoutBtn = document.getElementById('logoutBtn');
const profileInfo = document.getElementById('profileInfo');
const productsList = document.getElementById('productsList');

// Initialize user
const user = auth.currentUser;

// Display user information
if (user) {
    profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.displayName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;

    // Load and display profile picture
    // (Assuming you have stored the profile picture URL in the database)
    // Replace 'profilePicURL' with the actual field name in your database
    db.collection('vendors')
        .doc(user.uid)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                if (data.profilePicURL) {
                    const profilePic = document.createElement('img');
                    profilePic.src = data.profilePicURL;
                    profilePic.alt = 'Profile Picture';
                    profileInfo.appendChild(profilePic);
                }
            }
        });
}

// Upload profile picture
uploadProfilePicBtn.addEventListener('click', async () => {
    const file = profilePicInput.files[0];
    if (file) {
        const storageRef = storage.ref().child(`profile_pics/${user.uid}`);
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();

        // Update the profile picture URL in the database
        // Replace 'vendors' with the actual collection name in your database
        // Replace 'profilePicURL' with the actual field name in your database
        db.collection('vendors')
            .doc(user.uid)
            .update({
                profilePicURL: downloadURL,
            })
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.error('Error updating profile picture:', error);
            });
    }
});

// Post a product
postProductBtn.addEventListener('click', async () => {
    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productImage = productImageInput.files[0];

    if (productName && productDescription && productImage) {
        const storageRef = storage.ref().child(`products/${user.uid}/${productImage.name}`);
        const snapshot = await storageRef.put(productImage);
        const productImageURL = await snapshot.ref.getDownloadURL();

        // Add the product to the 'products' collection
        // Replace 'products' with the actual collection name in your database
        db.collection('products')
            .add({
                vendorId: user.uid,
                name: productName,
                description: productDescription,
                imageURL: productImageURL,
                timestamp: new Date(),
            })
            .then(() => {
                productNameInput.value = '';
                productDescriptionInput.value = '';
                productImageInput.value = '';
            })
            .catch((error) => {
                console.error('Error posting product:', error);
            });
    }
});

// Display products
db.collection('products')
    .where('vendorId', '==', user.uid)
    .orderBy('timestamp', 'desc')
    .get()
    .then((querySnapshot) => {
        productsList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${productData.imageURL}" alt="Product Image">
                <h3>${productData.name}</h3>
                <p>${productData.description}</p>
                <p>${productData.timestamp.toDate().toLocaleString()}</p>
            `;
            productsList.appendChild(productCard);
        });
    });

// Log out
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
});

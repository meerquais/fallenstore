const checkLoggedInRedirect = () => {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        if (userData.accountType === 'admin') {
            window.location.replace('../admin/index.html');
        } else if (userData.accountType === 'Vendor') {
            window.location.replace('../../Vendor/vendorDashboard.html');
        } else if (userData.accountType === 'Customer') {
            window.location.replace('../customer/index.html');
        }
    }
};

// Call the function when the page loads
window.addEventListener('load', checkLoggedInRedirect);

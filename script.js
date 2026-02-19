// Product data
const products = {
    gold: {
        name: 'Gold Mining',
        description: 'Invest in our carefully selected gold mining operations with proven reserves and sustainable extraction methods. Our gold mining investments focus on established mines with extensive geological surveys and modern extraction technologies that minimize environmental impact.',
        features: [
            'Proven gold reserves with extensive geological surveys',
            'Modern extraction technologies minimizing environmental impact',
            'Regular production updates and transparency reports',
            'Insurance coverage for operational risks',
            'Compliance with international mining standards'
        ],
        basePrice: 1000,
        icon: 'fas fa-gem'
    },
    coal: {
        name: 'Coal Mining',
        description: 'Strategic investments in coal mining with focus on efficiency and environmental responsibility. Our coal mining operations utilize advanced technologies to maximize yield while implementing comprehensive environmental protection measures.',
        features: [
            'Strategic locations with high-quality coal deposits',
            'Advanced mining equipment for optimal efficiency',
            'Comprehensive environmental protection measures',
            'Stable demand from industrial and energy sectors',
            'Regular safety audits and compliance checks'
        ],
        basePrice: 800,
        icon: 'fas fa-industry'
    },
    biogas: {
        name: 'Biogas Production',
        description: 'Support renewable energy through investments in biogas production from organic waste materials. Our biogas facilities convert agricultural and municipal waste into clean energy, contributing to waste reduction and sustainable energy production.',
        features: [
            'Conversion of organic waste into renewable energy',
            'Multiple revenue streams from energy sales and carbon credits',
            'Government incentives for renewable energy production',
            'Positive environmental impact through waste reduction',
            'Long-term contracts with energy distributors'
        ],
        basePrice: 1200,
        icon: 'fas fa-recycle'
    }
};

// Plan data
const plans = {
    1: { name: '1 Month', return: 8, minInvestment: 500 },
    2: { name: '2 Month', return: 18, minInvestment: 1000 },
    3: { name: '3 Month', return: 30, minInvestment: 2500 }
};

// User storage using localStorage
const userStorage = {
    saveUser: function(userData) {
        let users = JSON.parse(localStorage.getItem('primeinvest_users')) || [];
        // Check if user already exists
        const existingUserIndex = users.findIndex(user => user.email === userData.email);
        if (existingUserIndex !== -1) {
            users[existingUserIndex] = userData;
        } else {
            users.push(userData);
        }
        localStorage.setItem('primeinvest_users', JSON.stringify(users));
    },
    getUser: function(email) {
        const users = JSON.parse(localStorage.getItem('primeinvest_users')) || [];
        return users.find(user => user.email === email);
    },
    saveInvestment: function(investmentData) {
        let investments = JSON.parse(localStorage.getItem('primeinvest_investments')) || [];
        investmentData.id = Date.now().toString();
        investments.push(investmentData);
        localStorage.setItem('primeinvest_investments', JSON.stringify(investments));
        return investmentData;
    },
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('primeinvest_current_user'));
    },
    setCurrentUser: function(user) {
        localStorage.setItem('primeinvest_current_user', JSON.stringify(user));
    },
    logout: function() {
        localStorage.removeItem('primeinvest_current_user');
        window.location.href = 'index.html';
    }
};

// Common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });

    // Plan selection functionality
    document.querySelectorAll('.plan-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            document.querySelectorAll('.plan-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });

    // Update navigation based on current page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update user status in navigation
    updateUserStatus();

    // Initialize page-specific functionality
    initPage();
});

// Initialize page-specific functionality
function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const planParam = urlParams.get('plan');
    
    // Product detail page
    if (productParam && products[productParam]) {
        const product = products[productParam];
        document.title = `${product.name} - PrimeInvest`;
        
        // Update product details
        if (document.querySelector('.product-image i')) {
            document.querySelector('.product-image i').className = product.icon;
        }
        if (document.querySelector('.product-info h2')) {
            document.querySelector('.product-info h2').textContent = product.name;
        }
        if (document.querySelector('.product-description')) {
            document.querySelector('.product-description').textContent = product.description;
        }
        if (document.querySelector('.product-price')) {
            document.querySelector('.product-price').textContent = `From $${product.basePrice}`;
        }
        
        // Update product features
        const featuresList = document.querySelector('.product-features');
        if (featuresList) {
            featuresList.innerHTML = '';
            product.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check" style="color: var(--success); margin-right: 10px;"></i> ${feature}`;
                featuresList.appendChild(li);
            });
        }
    }
    
    // Sales funnel page
    if (planParam && plans[planParam]) {
        const plan = plans[planParam];
        
        // Update plan details
        const planNameElements = document.querySelectorAll('.plan-name');
        planNameElements.forEach(el => {
            el.textContent = `${plan.name} Plan`;
        });
        
        const planReturnElements = document.querySelectorAll('.plan-return');
        planReturnElements.forEach(el => {
            el.textContent = `${plan.return}%`;
        });
        
        const minInvestmentElements = document.querySelectorAll('.min-investment');
        minInvestmentElements.forEach(el => {
            el.textContent = plan.minInvestment;
        });
        
        // Update product links with plan parameter
        document.querySelectorAll('.product-card .btn').forEach(btn => {
            const href = btn.getAttribute('href');
            if (href && href.includes('purchase.html')) {
                btn.setAttribute('href', `${href}&plan=${planParam}`);
            }
        });
    }
    
    // Purchase page
    if (productParam && planParam && products[productParam] && plans[planParam]) {
        const product = products[productParam];
        const plan = plans[planParam];
        
        // Update purchase details
        if (document.querySelector('.purchase-product')) {
            document.querySelector('.purchase-product').textContent = product.name;
        }
        if (document.querySelector('.purchase-plan')) {
            document.querySelector('.purchase-plan').textContent = `${plan.name} Plan`;
        }
        if (document.querySelector('.purchase-return')) {
            document.querySelector('.purchase-return').textContent = `${plan.return}%`;
        }
        
        // Update minimum investment
        if (document.querySelector('#min-amount')) {
            document.querySelector('#min-amount').textContent = plan.minInvestment;
        }
        
        // Calculate and display estimated return
        const investmentInput = document.querySelector('#investment-amount');
        const estimatedReturn = document.querySelector('.estimated-return');
        
        if (investmentInput && estimatedReturn) {
            investmentInput.min = plan.minInvestment;
            investmentInput.value = plan.minInvestment;
            
            const calculateReturn = () => {
                const amount = parseFloat(investmentInput.value) || 0;
                if (amount < plan.minInvestment) {
                    investmentInput.value = plan.minInvestment;
                    amount = plan.minInvestment;
                }
                const returnAmount = amount * (plan.return / 100);
                estimatedReturn.textContent = returnAmount.toFixed(2);
            };
            
            investmentInput.addEventListener('input', calculateReturn);
            calculateReturn();
        }
    }
    
    // Confirmation page
    if (window.location.pathname.includes('confirmation.html')) {
        displayConfirmationDetails();
    }
    
    // Form handling
    setupFormHandlers();
}

// Setup form submission handlers
function setupFormHandlers() {
    // Handle signup form submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) return;
            
            const formData = new FormData(this);
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm-password');
            
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            const userData = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: password,
                date: new Date().toISOString()
            };
            
            // Save user and redirect
            userStorage.saveUser(userData);
            userStorage.setCurrentUser(userData);
            alert('Account created successfully!');
            window.location.href = 'home.html';
        });
    }

    // Handle signin form submission
    const signinForm = document.querySelector('.signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) return;
            
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            
            const user = userStorage.getUser(email);
            
            if (user && user.password === password) {
                userStorage.setCurrentUser(user);
                alert('Sign in successful!');
                window.location.href = 'home.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }

    // Handle purchase form submission
    const purchaseForm = document.querySelector('.purchase-form');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) return;
            
            // Check if user is logged in
            const currentUser = userStorage.getCurrentUser();
            if (!currentUser) {
                alert('Please sign in to make a purchase.');
                window.location.href = 'signin.html';
                return;
            }
            
            const urlParams = new URLSearchParams(window.location.search);
            const productParam = urlParams.get('product');
            const planParam = urlParams.get('plan');
            
            if (!productParam || !planParam) {
                alert('Invalid product or plan selection.');
                return;
            }
            
            const formData = new FormData(this);
            const investmentAmount = parseFloat(formData.get('investment-amount'));
            const plan = plans[planParam];
            
            if (investmentAmount < plan.minInvestment) {
                alert(`Minimum investment for this plan is $${plan.minInvestment}`);
                return;
            }
            
            const investmentData = {
                product: productParam,
                plan: planParam,
                amount: investmentAmount,
                paymentMethod: formData.get('payment-method'),
                date: new Date().toISOString(),
                userId: currentUser.email,
                confirmation: `INV-${Math.floor(100000 + Math.random() * 900000)}`
            };
            
            // Save investment
            const savedInvestment = userStorage.saveInvestment(investmentData);
            
            // Redirect to confirmation page with details
            window.location.href = `confirmation.html?product=${productParam}&plan=${planParam}&amount=${investmentData.amount}&confirmation=${savedInvestment.confirmation}`;
        });
    }
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger)';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
    }
    
    return isValid;
}

// Update user status in navigation
function updateUserStatus() {
    const currentUser = userStorage.getCurrentUser();
    const authLinks = document.querySelector('.auth-links');
    
    if (authLinks) {
        if (currentUser) {
            authLinks.innerHTML = `
                <span>Welcome, ${currentUser.name}</span>
                <a href="#" class="btn btn-secondary" id="logout-btn">Logout</a>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                userStorage.logout();
            });
        } else {
            authLinks.innerHTML = `
                <a href="signin.html">Sign In</a>
                <a href="signup.html" class="btn">Sign Up</a>
            `;
        }
    }
}

// Display confirmation details
function displayConfirmationDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    const planParam = urlParams.get('plan');
    const amount = urlParams.get('amount');
    const confirmation = urlParams.get('confirmation');
    
    if (productParam && products[productParam] && planParam && plans[planParam]) {
        const product = products[productParam];
        const plan = plans[planParam];
        const returnAmount = parseFloat(amount) * (plan.return / 100);
        
        document.querySelector('.confirmation-product').textContent = product.name;
        document.querySelector('.confirmation-plan').textContent = `${plan.name} Plan`;
        document.querySelector('.confirmation-amount').textContent = `$${parseFloat(amount).toFixed(2)}`;
        document.querySelector('.confirmation-return').textContent = `$${returnAmount.toFixed(2)}`;
        document.querySelector('.confirmation-number').textContent = confirmation;
        
        // Set current date
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('confirmation-date').textContent = now.toLocaleDateString('en-US', options);
    }
}

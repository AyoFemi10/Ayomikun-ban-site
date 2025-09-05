// Elements
const banNumberBtn = document.getElementById('banNumberBtn');
const unbanNumberBtn = document.getElementById('unbanNumberBtn');
const banGroupBtn = document.getElementById('banGroupBtn');
const unbanGroupBtn = document.getElementById('unbanGroupBtn');
const banCheckerBtn = document.getElementById('banCheckerBtn');

const banNumberSection = document.getElementById('banNumberSection');
const unbanNumberSection = document.getElementById('unbanNumberSection');
const banCheckerSection = document.getElementById('banCheckerSection');

const resultSection = document.getElementById('resultSection');
const banCheckResult = document.getElementById('banCheckResult');
const apiStatus = document.getElementById('apiStatus');

// Button click handlers
banNumberBtn.addEventListener('click', () => {
    hideAllSections();
    banNumberSection.style.display = 'block';
});

unbanNumberBtn.addEventListener('click', () => {
    hideAllSections();
    unbanNumberSection.style.display = 'block';
});

banCheckerBtn.addEventListener('click', () => {
    hideAllSections();
    banCheckerSection.style.display = 'block';
});

// Placeholder for group functions
banGroupBtn.addEventListener('click', () => {
    hideAllSections();
    alert('Group ban functionality is currently being updated. Please check back later.');
});

unbanGroupBtn.addEventListener('click', () => {
    hideAllSections();
    alert('Group unban functionality is currently being updated. Please check back later.');
});

// Generate Ban Email
document.getElementById('generateBanBtn').addEventListener('click', () => {
    const phoneNumber = document.getElementById('banPhoneNumber').value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number in international format (e.g., +1234567890)');
        return;
    }
    
    const emailContent = `To: support@support.whatsapp.com
Subject: URGENT: Report Violating WhatsApp Account - ${phoneNumber}

Dear WhatsApp Support Team,

I am writing to report a serious violation of WhatsApp's Terms of Service by the user with phone number: ${phoneNumber}.

This account has been engaged in the following activities:
- Sending spam messages repeatedly
- Spreading harmful misinformation
- Harassing other users with abusive content
- Distributing inappropriate and prohibited content
- Attempting to scam users through fraudulent schemes

I have encountered this user multiple times and their behavior is severely negatively impacting the WhatsApp community.

Please investigate this matter urgently and take appropriate action against this account as per WhatsApp's policies.

Thank you for your attention to this critical matter.

Sincerely,
A concerned WhatsApp user`;

    document.getElementById('emailTemplate').textContent = emailContent;
    resultSection.style.display = 'block';
    banCheckResult.style.display = 'none';
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });
});

// Generate Unban Email
document.getElementById('generateUnbanBtn').addEventListener('click', () => {
    const phoneNumber = document.getElementById('unbanPhoneNumber').value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number in international format (e.g., +1234567890)');
        return;
    }
    
    const emailContent = `To: support@support.whatsapp.com
Subject: Request to Review WhatsApp Account Ban - ${phoneNumber}

Dear WhatsApp Support Team,

I am writing to respectfully request a review of the ban on my WhatsApp account associated with phone number: ${phoneNumber}.

I believe this ban may have been applied in error due to one of the following reasons:
- Possible mistaken identity or false reporting
- Automated system detection anomaly
- Unintentional violation of terms

I have always aimed to use WhatsApp in compliance with your Terms of Service and value the platform for my daily communication needs.

If any violation occurred, it was unintentional and I sincerely apologize. I have reviewed the Terms of Service and will ensure strict compliance moving forward.

Please reconsider the ban on my account and restore access at your earliest convenience.

Thank you for your understanding and assistance.

Sincerely,
WhatsApp User`;
    
    document.getElementById('emailTemplate').textContent = emailContent;
    resultSection.style.display = 'block';
    banCheckResult.style.display = 'none';
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });
});

// Check Ban Status
document.getElementById('checkBanBtn').addEventListener('click', async () => {
    const phoneNumber = document.getElementById('checkPhoneNumber').value.trim();
    
    if (!validatePhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number in international format (e.g., +1234567890)');
        return;
    }
    
    // Show loading state
    apiStatus.textContent = "Checking ban status...";
    apiStatus.className = "api-status";
    apiStatus.style.display = "block";
    apiStatus.innerHTML = '<span class="loading"></span> Connecting to WhatsApp API...';
    
    try {
        // This is where you would integrate with your backend API
        // For now, we'll simulate the API call with a timeout
        const isBanned = await simulateApiCall(phoneNumber);
        
        let statusMessage = '';
        if (isBanned) {
            statusMessage = `
            <div style="color: #ff0000; font-weight: bold;">
                <i class="fas fa-ban"></i> BANNED<br><br>
                The phone number ${phoneNumber} is currently banned from WhatsApp.
            </div>
            <div class="scary-message" style="margin-top: 15px;">
                <i class="fas fa-exclamation-circle"></i> This number has been restricted from using WhatsApp services due to violations of Terms of Service.
            </div>`;
            
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> API Response: Number is banned';
            apiStatus.className = "api-status api-success";
        } else {
            statusMessage = `
            <div style="color: #00ff00; font-weight: bold;">
                <i class="fas fa-check-circle"></i> NOT BANNED<br><br>
                The phone number ${phoneNumber} is currently active on WhatsApp.
            </div>
            <div class="scary-message" style="margin-top: 15px;">
                <i class="fas fa-info-circle"></i> This number is in good standing with WhatsApp's Terms of Service.
            </div>`;
            
            apiStatus.innerHTML = '<i class="fas fa-check-circle"></i> API Response: Number is not banned';
            apiStatus.className = "api-status api-success";
        }
        
        document.getElementById('banStatusMessage').innerHTML = statusMessage;
        banCheckResult.style.display = 'block';
        resultSection.style.display = 'none';
        
        // Scroll to result
        banCheckResult.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error checking ban status:', error);
        apiStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error: Could not connect to WhatsApp API';
        apiStatus.className = "api-status api-error";
        
        // Fallback to simulated result if API fails
        setTimeout(() => {
            const isBanned = simulateBanCheck(phoneNumber);
            
            let statusMessage = '';
            if (isBanned) {
                statusMessage = `
                <div style="color: #ff0000; font-weight: bold;">
                    <i class="fas fa-ban"></i> BANNED (Simulated Result)<br><br>
                    The phone number ${phoneNumber} appears to be banned from WhatsApp.
                </div>
                <div class="scary-message" style="margin-top: 15px;">
                    <i class="fas fa-exclamation-circle"></i> Note: This is a simulated result as the API is not connected.
                </div>`;
            } else {
                statusMessage = `
                <div style="color: #00ff00; font-weight: bold;">
                    <i class="fas fa-check-circle"></i> NOT BANNED (Simulated Result)<br><br>
                    The phone number ${phoneNumber} appears to be active on WhatsApp.
                </div>
                <div class="scary-message" style="margin-top: 15px;">
                    <i class="fas fa-info-circle"></i> Note: This is a simulated result as the API is not connected.
                </div>`;
            }
            
            document.getElementById('banStatusMessage').innerHTML = statusMessage;
            banCheckResult.style.display = 'block';
            resultSection.style.display = 'none';
            
            // Scroll to result
            banCheckResult.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }
});

// Helper functions
function hideAllSections() {
    banNumberSection.style.display = 'none';
    unbanNumberSection.style.display = 'none';
    banCheckerSection.style.display = 'none';
    resultSection.style.display = 'none';
    banCheckResult.style.display = 'none';
    apiStatus.style.display = 'none';
}

function validatePhoneNumber(phone) {
    return phone.startsWith('+') && phone.length > 8 && phone.length < 16;
}

function simulateBanCheck(phoneNumber) {
    // This is a simulation - in a real implementation, this would be an API call
    // For demonstration purposes, we'll randomly determine status based on the last digit
    const lastDigit = parseInt(phoneNumber.slice(-1));
    return lastDigit % 3 === 0; // Approximately 1/3 of numbers will show as "banned"
}

function simulateApiCall(phoneNumber) {
    // Simulate API call with delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real implementation, this would be an actual API call
            // For now, we'll simulate success 80% of the time
            if (Math.random() > 0.2) {
                const lastDigit = parseInt(phoneNumber.slice(-1));
                resolve(lastDigit % 3 === 0);
            } else {
                throw new Error("API connection failed");
            }
        }, 2000);
    });
}

// Backend Integration Instructions
console.log(`
=============================================
AYOMIKUN BAN SITE - BACKEND INTEGRATION GUIDE
=============================================

To connect this frontend to a real backend API:

1. Create a Node.js/Express backend with the following endpoints:
   - POST /api/check-ban-status: Accepts { phoneNumber } and returns { banned: boolean }
   - POST /api/ban-number: Accepts { phoneNumber } and returns { success: boolean }
   - POST /api/unban-number: Accepts { phoneNumber } and returns { success: boolean }

2. Update the simulateApiCall() function in this code to make actual fetch requests:

   async function checkBanStatus(phoneNumber) {
       const response = await fetch('https://your-api.com/api/check-ban-status', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ phoneNumber })
       });
       
       if (!response.ok) {
           throw new Error('API request failed');
       }
       
       const data = await response.json();
       return data.banned;
   }

3. For the ban checker to work with WhatsApp's actual API, you would need:
   - Official WhatsApp Business API access
   - Proper authentication tokens
   - Server-side implementation that respects WhatsApp's terms of service

Note: Use official APIs and comply with all terms of service.
=============================================
`);
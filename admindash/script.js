document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    const tabContent = document.getElementById('tabContent');
    const navItems = document.querySelectorAll('.nav-item');

    // Tab content
    const tabData = {
        utpras: {
            title: 'UTPRAS',
            content: 'Unified TVET Program Registration and Accreditation System'
        },
        scholarships: {
            title: 'Scholarships',
            content: 'TESDA Scholarship Programs'
        },
        ptcacs: {
            title: 'PTCACS',
            content: 'Post-Training Credit Assistance and Collection System'
        },
        settings: {
            title: 'Settings',
            content: 'System Settings and Configurations'
        },
        accounts: {
            title: 'Accounts Control',
            content: 'User Account Management'
        }
    };

    function createTabContent(tab) {
        const data = tabData[tab];
        return `
            <div class="card">
                <h2>${data.title}</h2>
                <p>${data.content}</p>
            </div>
        `;
    }

    function setActiveTab(clickedItem) {
        navItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');
    }

    function updateContent(tab) {
        tabContent.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            tabContent.innerHTML += createTabContent(tab);
        }
    }

    // Set initial content
    updateContent('utpras');

    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.getAttribute('data-tab');
            setActiveTab(item);
            updateContent(tab);
        });
    });
});


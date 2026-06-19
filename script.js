document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const dots = document.querySelectorAll('.dot');
    const alertModal = document.getElementById('customAlertModal');
    const closeAlertBtn = document.getElementById('closeAlertBtn');
    const typingText = document.querySelector('.typing-text');
    const form = document.getElementById('portfolioForm');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    function smoothScrollTo(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-section') || link.getAttribute('href').replace('#', '');
            if (targetId) {
                e.preventDefault();
                smoothScrollTo(targetId);
            }
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            if (targetId) {
                smoothScrollTo(targetId);
            }
        });
    });

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - window.innerHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const target = link.getAttribute('data-section') || link.getAttribute('href').replace('#', '');
            if (target === currentSectionId) {
                link.classList.add('active');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active-dot');
            if (dot.getAttribute('data-target') === currentSectionId) {
                dot.classList.add('active-dot');
            }
        });
    });

    const roles = ["Frontend Developer", "Web Designer", "Clean Coder"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 120;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Simulasi pengiriman pesan berhasil (Template Aktif).');
            form.reset();
        });
    }

    function showCustomAlert(e) {
        e.preventDefault();
        if (alertModal) {
            alertModal.style.display = 'flex';
        }
    }

    document.addEventListener('contextmenu', showCustomAlert);

    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'i' || e.key === 'j')) || 
            (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
        ) {
            showCustomAlert(e);
        }
    });

    if (closeAlertBtn) {
        closeAlertBtn.addEventListener('click', () => {
            alertModal.style.display = 'none';
        });
    }

    if (alertModal) {
        window.addEventListener('click', (e) => {
            if (e.target === alertModal) {
                alertModal.style.display = 'none';
            }
        });
    }
});
document.getElementById('btnDownloadCV').addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah link default
    
    const fileUrl = 'asset/CV_Rio_Fernandes_Hasibuan.pdf'; // Path file CV Anda
    const fileName = 'CV_Rio_Fernandes_Hasibuan.pdf'; // Nama file saat terdownload nanti
    
    // Trik membuat elemen <a> bayangan di memori browser
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    
    // Simulasikan klik
    document.body.appendChild(link);
    link.click();
    
    // Hapus kembali elemen bayangan
    document.body.removeChild(link);
});
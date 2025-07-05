// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add hover effects for skill items
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click to copy functionality for contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.querySelector('span').textContent;
        
        // Create temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        
        try {
            document.execCommand('copy');
            
            // Show feedback
            const originalText = this.querySelector('span').textContent;
            this.querySelector('span').textContent = 'Copied!';
            this.style.color = '#2ecc71';
            
            setTimeout(() => {
                this.querySelector('span').textContent = originalText;
                this.style.color = '';
            }, 1500);
            
        } catch (err) {
            console.log('Copy failed');
        }
        
        document.body.removeChild(tempInput);
    });
});

// Add typing effect to the tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.textContent;
    
    setTimeout(() => {
        typeWriter(tagline, originalText, 80);
    }, 1000);
});

// Add parallax effect to header background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    const rate = scrolled * -0.5;
    
    if (header) {
        header.style.transform = `translateY(${rate}px)`;
    }
});

// Add progress bar for skills
document.querySelectorAll('.skill-item').forEach(skill => {
    const level = skill.classList.contains('expert') ? 90 : 
                  skill.classList.contains('advanced') ? 75 : 60;
    
    skill.setAttribute('data-level', level);
    
    // Add tooltip on hover
    skill.addEventListener('mouseenter', function(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `${level}% proficiency`;
        tooltip.style.cssText = `
            position: absolute;
            background: #2c3e50;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            transform: translateX(-50%);
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 35 + 'px';
        
        this.tooltip = tooltip;
    });
    
    skill.addEventListener('mouseleave', function() {
        if (this.tooltip) {
            document.body.removeChild(this.tooltip);
            this.tooltip = null;
        }
    });
});

// Add print functionality
function printResume() {
    window.print();
}

// Add download as PDF functionality (requires html2pdf library)
function downloadPDF() {
    const element = document.querySelector('.resume-container');
    const opt = {
        margin: 0.5,
        filename: 'opencv-resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // This would require including html2pdf library
    // html2pdf().set(opt).from(element).save();
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'p':
                e.preventDefault();
                printResume();
                break;
            case 's':
                e.preventDefault();
                // Could trigger save/download functionality
                break;
        }
    }
});

// Add theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Add search functionality for skills and projects
function searchContent(query) {
    const searchableElements = document.querySelectorAll('.skill-item, .project-item, .experience-item');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const matches = text.includes(query.toLowerCase());
        
        element.style.opacity = matches || query === '' ? '1' : '0.3';
        element.style.transform = matches || query === '' ? 'scale(1)' : 'scale(0.95)';
    });
}

// Add animation delays for staggered loading
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-item, .experience-item, .skill-item');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

console.log('🎉 OpenCV Resume Template Loaded Successfully!');
console.log('💡 Tip: Click on contact items to copy them to clipboard');
console.log('🎨 Features: Responsive design, smooth animations, and interactive elements');
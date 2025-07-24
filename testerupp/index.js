document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('meteor-container');
    const meteorCount = 20;
    
    function createBackgroundStars(container, count) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'background-star';
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = 0.3 + Math.random() * 0.7;
            const duration = 2 + Math.random() * 2;
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                left: ${posX}%;
                top: ${posY}%;
                --twinkle-opacity: ${opacity};
                --twinkle-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            container.appendChild(star);
        }
    }
    
    function createMeteor(container, index) {
        const spawnX = Math.random() * 100;
        const spawnY = -10 - (Math.random() * 20);
        const angle = 25 + Math.random() * 10;
        const distanceX = 200 + Math.random() * 150;
        const distanceY = 50 + Math.random() * 50;
        const tailLength = 60 + Math.random() * 40;
        const shineWidth = 20 + Math.random() * 20;
        const duration = 2 + Math.random();
        const delay = Math.random() * 15;
        
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        meteor.style.cssText = `
            --angle: ${angle}deg;
            --distance-x: ${distanceX}px;
            --distance-y: ${distanceY}px;
            --tail-length: ${tailLength}px;
            --shine-width: ${shineWidth}px;
            --duration: ${duration}s;
            --delay: ${delay}s;
            top: ${spawnY}px;
            left: ${spawnX}%;
        `;
        
        container.appendChild(meteor);
        
        const totalTime = (delay + duration) * 1000;
        setTimeout(() => {
            meteor.remove();
            setTimeout(() => createMeteor(container, index), 1000 + Math.random() * 4000);
        }, totalTime);
    }
    
    createBackgroundStars(container, 150);
    
    for (let i = 0; i < meteorCount; i++) {
        createMeteor(container, i);
    }
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    setTimeout(() => {
                        const target = document.querySelector(link.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 400);
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !e.target.closest('nav') && 
                navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    const questions = document.querySelectorAll('.question');
    
    questions.forEach(question => {
        const header = question.querySelector('.question-header');
        const answer = question.querySelector('.question-answer');
        const toggle = question.querySelector('.question-toggle');
        
        header.addEventListener('click', function() {
            questions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.querySelector('.question-answer').style.maxHeight = null;
                    q.querySelector('.question-toggle').textContent = '+';
                }
            });
            
            const isActive = question.classList.toggle('active');
            
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '×';
            } else {
                answer.style.maxHeight = null;
                toggle.textContent = '+';
            }
        });
    });
    function animateOnScroll() {
        const elements = document.querySelectorAll('.scroll-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-active');
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    animateOnScroll();

    window.addEventListener('load', animateOnScroll);
    
    window.addEventListener('resize', animateOnScroll);
    
    setTimeout(animateOnScroll, 500);
});
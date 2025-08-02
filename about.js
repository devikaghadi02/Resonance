
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navClose = document.getElementById('nav-close');
        const overlay = document.getElementById('overlay');
        const hamburgerBars = document.querySelectorAll('.hamburger');
        const navItems = document.querySelectorAll('.nav-item');

        
        function openMenu() {
            overlay.classList.remove('opacity-0', 'invisible');
            overlay.classList.add('opacity-100', 'visible');

            navMenu.classList.remove('translate-x-full');
            navMenu.classList.add('translate-x-0');

            hamburgerBars[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
            hamburgerBars[1].style.opacity = '0';
            hamburgerBars[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';

            setTimeout(() => {
                navItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 100);
                });
            }, 200);

            document.body.style.overflow = 'hidden';
        }

        
        function closeMenu() {
            overlay.classList.remove('opacity-100', 'visible');
            overlay.classList.add('opacity-0', 'invisible');

            navMenu.classList.remove('translate-x-0');
            navMenu.classList.add('translate-x-full');

            hamburgerBars[0].style.transform = 'rotate(0deg) translate(0px, 0px)';
            hamburgerBars[1].style.opacity = '1';
            hamburgerBars[2].style.transform = 'rotate(0deg) translate(0px, 0px)';

            navItems.forEach(item => {
                item.classList.remove('show', 'opacity-100', 'translate-x-0');
                item.classList.add('opacity-0', 'translate-x-8');
            });

            document.body.style.overflow = 'auto';
        }

        
        navToggle.addEventListener('click', openMenu);
        navClose.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        document.querySelectorAll('#nav-menu a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !navMenu.classList.contains('translate-x-full')) {
                closeMenu();
            }
        });

        
        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

        const revealOnScroll = () => {
            scrollRevealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('revealed');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        
        const floatingPhoto = document.getElementById('floating-photo');
        const hoverTriggers = document.querySelectorAll('.hover-trigger');

        hoverTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', (e) => {
                const photoSrc = e.target.dataset.photo;
                if (photoSrc) {
                    floatingPhoto.style.backgroundImage = `url(${photoSrc})`;
                    floatingPhoto.style.backgroundSize = 'cover';
                    floatingPhoto.style.backgroundPosition = 'center';
                    floatingPhoto.classList.add('show');
                    
                    
                    createParticles(e.target);
                }
            });

            trigger.addEventListener('mouseleave', () => {
                floatingPhoto.classList.remove('show');
            });

            trigger.addEventListener('mousemove', (e) => {
                if (floatingPhoto.classList.contains('show')) {
                    floatingPhoto.style.left = (e.clientX - 100) + 'px';
                    floatingPhoto.style.top = (e.clientY - 100) + 'px';
                }
            });
        });

        
        function createParticles(element) {
            const rect = element.getBoundingClientRect();
            const particles = 5;
            
            for (let i = 0; i < particles; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    particle.style.top = (rect.top + rect.height) + 'px';
                    particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
                    
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 3000);
                }, i * 200);
            }
        }

        
        const teamCards = document.querySelectorAll('.team-member-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                
                card.style.animation = 'subtle-shake 0.5s ease-in-out';
                
                
                createGlowParticles(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.animation = '';
            });
        });

        
        function createGlowParticles(card) {
            const rect = card.getBoundingClientRect();
            const colors = ['#e78d2e', '#4a90e2', '#8b5cf6'];
            
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.position = 'fixed';
                    particle.style.width = '6px';
                    particle.style.height = '6px';
                    particle.style.borderRadius = '50%';
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '999';
                    
                    
                    const side = Math.floor(Math.random() * 4);
                    if (side === 0) { 
                        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                        particle.style.top = rect.top + 'px';
                    } else if (side === 1) { 
                        particle.style.left = (rect.right) + 'px';
                        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                    } else if (side === 2) { 
                        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                        particle.style.top = (rect.bottom) + 'px';
                    } else { 
                        particle.style.left = rect.left + 'px';
                        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                    }
                    
                    particle.style.animation = 'glow-particle 2s ease-out forwards';
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 2000);
                }, i * 100);
            }
        }
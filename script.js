// ===================================
// Scroll Detection & Animations
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // Intersection Observer for Cards
    // ===================================

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                const card = entry.target;
                const cardIndex = parseInt(card.dataset.index) || 0;
                const delay = cardIndex * 100; // 100ms stagger

                setTimeout(() => {
                    card.classList.add('visible');
                }, delay);

                cardObserver.unobserve(card);
            }
        });
    }, observerOptions);

    // Observe all item cards
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        cardObserver.observe(card);
    });

    // ===================================
    // Team Members Animation
    // ===================================

    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const members = entry.target.querySelectorAll('.team-member');
                members.forEach((member, index) => {
                    setTimeout(() => {
                        member.classList.add('visible');
                    }, index * 150);
                });
                teamObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const teamPhotos = document.querySelector('.team-photos');
    if (teamPhotos) {
        teamObserver.observe(teamPhotos);
    }

    // ===================================
    // Smooth Scroll Enhancement
    // ===================================

    // Add smooth scroll behavior to internal links
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

    // ===================================
    // Upload Area Interactions
    // ===================================

    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            // In a real implementation, this would trigger file input
            console.log('Upload area clicked - file input would trigger here');

            // Visual feedback
            uploadArea.style.transform = 'scale(0.98)';
            setTimeout(() => {
                uploadArea.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // ===================================
    // Submit Button Interaction
    // ===================================

    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // Visual feedback
            submitButton.textContent = 'Submitting...';
            submitButton.style.pointerEvents = 'none';

            // Simulate submission
            setTimeout(() => {
                submitButton.textContent = '✓ Submitted!';
                submitButton.style.backgroundColor = '#16a34a';

                setTimeout(() => {
                    submitButton.textContent = 'Submit Found Item';
                    submitButton.style.backgroundColor = '';
                    submitButton.style.pointerEvents = '';
                }, 2000);
            }, 1500);
        });
    }

    // ===================================
    // Scroll Progress Indicator
    // ===================================

    let ticking = false;
    let lastScrollY = 0;

    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Calculate scroll progress
        const scrollProgress = scrollY / (documentHeight - windowHeight);

        // You can use this for additional scroll-based effects
        // For example, changing background colors, revealing elements, etc.

        ticking = false;
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // ===================================
    // Parallax Effect for Section Backgrounds
    // ===================================

    const parallaxSections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrolled = window.scrollY;

            // Only apply to sections in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(rect.top * speed);
                // Could apply transform here for parallax backgrounds
            }
        });
    });

    // ===================================
    // Item Card Click Handler
    // ===================================

    itemCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real app, this would open a detail view
            console.log('Item card clicked:', card.querySelector('.item-name').textContent);

            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });

    // ===================================
    // Field Item Hover Sound/Feedback
    // ===================================

    const fieldItems = document.querySelectorAll('.field-item');
    fieldItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Could add subtle sound effect here
            item.style.transition = 'all 0.3s ease-out';
        });
    });

    // ===================================
    // Keyboard Navigation Support
    // ===================================

    document.addEventListener('keydown', (e) => {
        // Space or Enter on focused cards
        if (e.key === ' ' || e.key === 'Enter') {
            const focusedCard = document.activeElement;
            if (focusedCard.classList.contains('item-card')) {
                e.preventDefault();
                focusedCard.click();
            }
        }
    });

    // ===================================
    // Performance: Reduce Motion for Accessibility
    // ===================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-base', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }

    // ===================================
    // Console Welcome Message
    // ===================================

    console.log('%c🔍 Campus Lost & Found', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cHelping students reconnect with what matters most', 'font-size: 14px; color: #57534e;');

});

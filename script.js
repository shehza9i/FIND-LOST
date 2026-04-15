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
    const itemCards = document.querySelectorAll('.item-card, .js-item-card');
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
    // Item Card Click Handler & Modals
    // ===================================

    const backdrop = document.getElementById('item-modal-backdrop');
    const itemModal = document.getElementById('item-modal');
    const claimModal = document.getElementById('claim-modal');
    
    const closeModal = () => {
        if(backdrop) backdrop.style.opacity = '0';
        if(itemModal) itemModal.style.opacity = '0';
        if(claimModal) claimModal.style.opacity = '0';
        setTimeout(() => {
            if(backdrop) backdrop.classList.add('hidden');
            if(itemModal) {
                itemModal.classList.add('hidden');
                itemModal.classList.remove('flex');
            }
            if(claimModal) {
                claimModal.classList.add('hidden');
                claimModal.classList.remove('flex');
            }
        }, 300);
    };

    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('claim-close')?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    const btnIsYours = document.getElementById('btn-is-this-yours');
    const claimItemName = document.getElementById('claim-item-name');

    btnIsYours?.addEventListener('click', () => {
        if(itemModal) itemModal.style.opacity = '0';
        setTimeout(() => {
            if(itemModal) {
                itemModal.classList.add('hidden');
                itemModal.classList.remove('flex');
            }
            if(claimModal) {
                claimModal.classList.remove('hidden');
                claimModal.classList.add('flex');
                setTimeout(() => {
                    claimModal.style.opacity = '1';
                }, 50);
            }
        }, 300);
    });
    
    const claimProofImg = document.getElementById('claim-proof-img');
    const claimProofFilename = document.getElementById('claim-proof-filename');

    if (claimProofImg && claimProofFilename) {
        claimProofImg.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                claimProofFilename.textContent = e.target.files[0].name;
                claimProofFilename.classList.add('text-blue-600');
            } else {
                claimProofFilename.textContent = 'Upload an image as proof (optional)';
                claimProofFilename.classList.remove('text-blue-600');
            }
        });
    }
    
    const btnSubmitClaim = document.getElementById('btn-submit-claim');
    btnSubmitClaim?.addEventListener('click', () => {
        const howLost = document.getElementById('claim-how')?.value || 'Not provided';
        const proof = document.getElementById('claim-proof')?.value || 'Not provided';
        const contact = document.getElementById('claim-contact')?.value || 'Not provided';
        const itemName = claimItemName ? claimItemName.textContent : 'an item';
        
        // --- 📧 THE RECEIVING EMAIL ADDRESS ---
        const targetEmail = 'shehzaanshariff0@gmail.com';

        // Visual feedback
        btnSubmitClaim.textContent = 'Sending...';
        btnSubmitClaim.style.pointerEvents = 'none';

        // Use FormData to allow file uploads
        const formData = new FormData();
        formData.append('_subject', `Claim Request: ${itemName}`);
        formData.append('Item Name', itemName);
        formData.append('How/When Lost', howLost);
        formData.append('Proof Description', proof);
        formData.append('Contact Info', contact);
        formData.append('_captcha', 'false');

        // Append the file if one was selected
        if (claimProofImg && claimProofImg.files && claimProofImg.files[0]) {
            formData.append('attachment', claimProofImg.files[0], claimProofImg.files[0].name);
        }
        
        // Automatically send the email in the background 
        fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            btnSubmitClaim.textContent = 'Done!';
            btnSubmitClaim.style.backgroundColor = '#16a34a'; // tailwind green-600
            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    // Reset button and clear form
                    btnSubmitClaim.textContent = 'Submit details';
                    btnSubmitClaim.style.backgroundColor = '';
                    btnSubmitClaim.style.pointerEvents = '';
                    if (document.getElementById('claim-how')) document.getElementById('claim-how').value = '';
                    if (document.getElementById('claim-proof')) document.getElementById('claim-proof').value = '';
                    if (document.getElementById('claim-contact')) document.getElementById('claim-contact').value = '';
                    if (claimProofImg) claimProofImg.value = '';
                    if (claimProofFilename) {
                        claimProofFilename.textContent = 'Upload an image as proof (optional)';
                        claimProofFilename.classList.remove('text-blue-600');
                    }
                }, 300);
            }, 1000);
        })
        .catch(error => {
            console.error("Error sending email:", error);
            btnSubmitClaim.textContent = 'Error! Try Again.';
            setTimeout(() => {
                btnSubmitClaim.textContent = 'Submit details';
                btnSubmitClaim.style.pointerEvents = '';
            }, 2000);
        });
    });

    itemCards.forEach(card => {
        card.addEventListener('click', () => {
            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);

            // Only proceed if modals exist
            if (!itemModal) return;

            // Extract details from card structure
            const imgEl = card.querySelector('img');
            const img = imgEl ? imgEl.src : '';
            
            const categoryEl = card.querySelector('span.uppercase');
            const category = categoryEl ? categoryEl.textContent : 'Item';
            
            // The time is the second span inside the row or class
            const justifyBetweenSpans = card.querySelectorAll('.flex.justify-between span');
            const timeSpan = justifyBetweenSpans[1] || card.querySelectorAll('span')[1]; 
            const time = timeSpan ? timeSpan.textContent : '';
            
            const titleEl = card.querySelector('h3');
            const title = titleEl ? titleEl.textContent : 'Item';
            
            const descEl = card.querySelector('p');
            const desc = descEl ? descEl.textContent : '';
            
            const locSpanEl = card.querySelector('.bg-slate-50 span');
            const locSpan = locSpanEl ? locSpanEl.textContent : '';

            // Populate Modal
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-category').textContent = category;
            document.getElementById('modal-time').textContent = time;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-desc').textContent = desc;
            document.getElementById('modal-location').textContent = locSpan;
            if(claimItemName) claimItemName.textContent = title;

            // Show Modal
            if(backdrop) backdrop.classList.remove('hidden');
            itemModal.classList.remove('hidden');
            itemModal.classList.add('flex');
            
            setTimeout(() => {
                if(backdrop) backdrop.style.opacity = '1';
                itemModal.style.opacity = '1';
            }, 50);
        });
    });

    // ===================================
    // View All Items click handler
    // ===================================
    
    const btnViewAll = document.getElementById('btn-view-all');
    const itemsSlider = document.getElementById('items-slider');
    
    if (btnViewAll && itemsSlider) {
        btnViewAll.addEventListener('click', () => {
            // Smoothly scroll the slider to the right
            itemsSlider.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
            // Visual feedback
            btnViewAll.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btnViewAll.style.transform = '';
            }, 150);
        });
    }

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
            if (focusedCard.classList.contains('item-card') || focusedCard.classList.contains('js-item-card')) {
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

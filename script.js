// ========================================
// CONTENT PROTECTION
// ========================================

// Disable right-click on sensitive content
document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click on certificates and resume
    const protectedElements = document.querySelectorAll('.certificate-item, .resume-viewer, iframe');
    protectedElements.forEach(el => {
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });
    
    // Prevent dragging of images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
    
    // Disable text selection on certificates
    document.querySelectorAll('.certificate-item').forEach(el => {
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
    });
});

// Check referrer to prevent hotlinking
if (document.referrer && !document.referrer.includes(window.location.hostname)) {
    const allowedDomains = ['bharathi-portfolio.xyz', 'localhost', '127.0.0.1'];
    const isAllowed = allowedDomains.some(domain => 
        window.location.hostname.includes(domain) || document.referrer.includes(domain)
    );
    
    if (!isAllowed) {
        // Redirect if accessed from external source
        window.location.href = '/';
    }
}

// ========================================
// INTERSECTION OBSERVER
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all scenes after DOM load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scene').forEach(scene => {
        sceneObserver.observe(scene);
    });
});

// ========================================
// SMOOTH SCROLL PARALLAX EFFECTS
// ========================================

let ticking = false;
let currentProjectIndex = 0;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Apply depth parallax to ALL scenes (except projects and certifications sections)
    const allScenes = document.querySelectorAll('.scene');
    allScenes.forEach(scene => {
        // Skip parallax effect for projects section only
        if (scene.classList.contains('scene-projects')) {
            return;
        }
        
        const rect = scene.getBoundingClientRect();
        const sceneTop = rect.top;
        const sceneBottom = rect.bottom;
        
        // Calculate how far the scene has been scrolled
        if (sceneBottom > 0 && sceneTop < windowHeight) {
            // Scene is in viewport
            const sceneContent = scene.querySelector('.scene-content') || scene.querySelector('.hero-content');
            
            if (sceneContent) {
                // When scrolling past, push content back and fade
                if (sceneTop < 0) {
                    const progress = Math.abs(sceneTop) / windowHeight;
                    const clampedProgress = Math.min(progress, 1);
                    
                    // Push back into depth
                    const translateY = clampedProgress * 150;
                    const scale = 1 - (clampedProgress * 0.2);
                    const opacity = Math.max(0, 1 - (clampedProgress * 1.2));
                    
                    sceneContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    sceneContent.style.opacity = opacity;
                } else {
                    // Scene entering from bottom
                    const enterProgress = (windowHeight - sceneTop) / windowHeight;
                    const clampedEnter = Math.min(enterProgress, 1);
                    
                    const translateY = (1 - clampedEnter) * 60;
                    const scale = 0.95 + (clampedEnter * 0.05);
                    const opacity = Math.max(0, clampedEnter);
                    
                    sceneContent.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    sceneContent.style.opacity = opacity;
                }
            }
        }
    });

    // Individual project cards depth parallax
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top;
        const itemBottom = rect.bottom;
        const itemCenter = itemTop + (rect.height / 2);
        
        // Apply parallax when card is in viewport
        if (itemBottom > 0 && itemTop < windowHeight) {
            // Calculate distance from viewport center
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = itemCenter - viewportCenter;
            const maxDistance = windowHeight / 2;
            
            // Normalize distance (-1 to 1)
            const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
            
            // Calculate parallax values based on position
            const translateY = normalizedDistance * 40;
            const scale = 1 - (Math.abs(normalizedDistance) * 0.05);
            const opacity = 1 - (Math.abs(normalizedDistance) * 0.3);
            
            item.style.transform = `translateY(${translateY}px) scale(${scale})`;
            item.style.opacity = Math.max(0.7, opacity);
        }
    });

    // Individual certificate cards depth parallax
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardBottom = rect.bottom;
        const cardCenter = cardTop + (rect.height / 2);
        
        // Apply parallax when card is in viewport
        if (cardBottom > 0 && cardTop < windowHeight) {
            // Calculate distance from viewport center
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = cardCenter - viewportCenter;
            const maxDistance = windowHeight / 2;
            
            // Normalize distance (-1 to 1)
            const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
            
            // Calculate parallax values for certificate cards
            const translateY = normalizedDistance * 30;
            const scale = 1 - (Math.abs(normalizedDistance) * 0.06);
            const opacity = 1 - (Math.abs(normalizedDistance) * 0.2);
            
            // Apply transform while preserving hover state
            const currentTransform = card.style.transform;
            if (!card.matches(':hover')) {
                card.style.transform = `translateY(${translateY}px) scale(${scale})`;
                card.style.opacity = Math.max(0.8, opacity);
            }
        }
    });



    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// ========================================
// PROJECT ITEM SUBTLE 3D HOVER (Desktop Only)
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 80;
                const rotateY = (centerX - x) / 80;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }
});

// ========================================
// TIMELINE PROGRESS ON SCROLL
// ========================================

function updateTimeline() {
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const rect = timeline.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Timeline line animates via CSS on scene visibility
        }
    }
}

window.addEventListener('scroll', updateTimeline, { passive: true });

// ========================================
// CONTACT TERMINAL TYPING EFFECT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const contactScene = document.querySelector('.scene-contact');
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const terminal = document.querySelector('.terminal');
                    if (terminal) {
                        terminal.style.opacity = '0';
                        terminal.style.transform = 'translateY(30px)';
                        terminal.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        
                        setTimeout(() => {
                            terminal.style.opacity = '1';
                            terminal.style.transform = 'translateY(0)';
                        }, 100);
                    }
                }, 300);
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (contactScene) {
        contactObserver.observe(contactScene);
    }
});

// ========================================
// SMOOTH SCROLL TO ANCHOR
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip mailto, tel, http links
            if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========================================
// PERFORMANCE: REDUCE MOTION
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-duration', '0s');
    document.querySelectorAll('.scene').forEach(scene => {
        scene.style.transition = 'none';
    });
}

// ========================================
// MAGNETIC CURSOR EFFECT FOR INTERACTIVE ELEMENTS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) { // Only on desktop
        const magneticElements = document.querySelectorAll('.skill-tag, .certificate-card');

        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.15;
                const moveY = y * 0.15;
                
                element.style.transition = 'transform 0.1s ease-out';
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'transform 0.3s ease';
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
});

// ========================================
// ADD GLOW TO ELEMENTS ON SCROLL
// ========================================

function addScrollGlow() {
    const elements = document.querySelectorAll('.project-card, .skill-cluster, .certificate-card');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
            const visibility = Math.min(1, Math.max(0, 1 - Math.abs(rect.top - windowHeight / 2) / (windowHeight / 2)));
            element.style.setProperty('--glow-opacity', visibility);
        }
    });
}

window.addEventListener('scroll', addScrollGlow, { passive: true });

// ========================================
// INIT
// ========================================

// ========================================
// CERTIFICATE LIGHTBOX
// ========================================

let currentCertIndex = 0;
const certificateItems = [];

function initCertificateLightbox() {
    const lightbox = document.getElementById('certificateLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    // Check if elements exist
    if (!lightbox || !lightboxImg || !closeBtn || !prevBtn || !nextBtn) {
        console.error('Lightbox elements not found');
        return;
    }
    
    // Clear previous items
    certificateItems.length = 0;
    
    // Get all certificate items (only the first 8, skip duplicates)
    const items = document.querySelectorAll('.certificate-item');
    
    // Only add first 8 certificates to avoid duplicates in lightbox
    const uniqueItems = Array.from(items).slice(0, 8);
    
    uniqueItems.forEach((item, index) => {
        const img = item.querySelector('.certificate-img');
        const card = item.querySelector('.certificate-card');
        
        if (img && card) {
            certificateItems.push({
                src: img.src,
                alt: img.alt
            });
            
            // Remove any existing listeners
            card.style.cursor = 'pointer';
            
            // Add click event
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(index);
            }, true);
        }
    });
    
    // Also add click handlers to duplicated cards
    const duplicateItems = Array.from(items).slice(8);
    duplicateItems.forEach((item, index) => {
        const card = item.querySelector('.certificate-card');
        if (card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(index);
            }, true);
        }
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevCert();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextCert();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevCert();
        if (e.key === 'ArrowRight') showNextCert();
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('certificateLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (!lightbox || !lightboxImg || !certificateItems[index]) return;
    
    currentCertIndex = index;
    lightbox.classList.add('active');
    lightbox.style.display = 'block';
    lightboxImg.src = certificateItems[index].src;
    lightboxCaption.textContent = certificateItems[index].alt;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('certificateLightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

function showPrevCert() {
    if (certificateItems.length === 0) return;
    
    currentCertIndex = (currentCertIndex - 1 + certificateItems.length) % certificateItems.length;
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImg && certificateItems[currentCertIndex]) {
        lightboxImg.src = certificateItems[currentCertIndex].src;
        lightboxCaption.textContent = certificateItems[currentCertIndex].alt;
    }
}

function showNextCert() {
    if (certificateItems.length === 0) return;
    
    currentCertIndex = (currentCertIndex + 1) % certificateItems.length;
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImg && certificateItems[currentCertIndex]) {
        lightboxImg.src = certificateItems[currentCertIndex].src;
        lightboxCaption.textContent = certificateItems[currentCertIndex].alt;
    }
}

window.addEventListener('load', () => {
    updateParallax();
    updateTimeline();
    addScrollGlow();
    initCertificateLightbox();
    
    // Show hero immediately
    const hero = document.querySelector('.scene-hero');
    if (hero) {
        hero.classList.add('visible');
    }
});

// Backup initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize certificate lightbox as backup
    setTimeout(() => {
        if (certificateItems.length === 0) {
            initCertificateLightbox();
        }
    }, 500);
    
    // Add momentum scroll feel with visual feedback
    initScrollMomentum();
});

// ========================================
// MOMENTUM SCROLL FEEL (Mobile Tactile)
// ========================================

function initScrollMomentum() {
    let isScrolling;
    let lastScrollY = window.pageYOffset;
    let scrollVelocity = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        scrollVelocity = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
        
        // Clear timeout throughout scroll
        window.clearTimeout(isScrolling);
        
        // Add subtle scale effect during scroll for tactile feel
        const scenes = document.querySelectorAll('.scene');
        scenes.forEach(scene => {
            const rect = scene.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate distance from viewport center
            const sceneCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = Math.abs(sceneCenter - viewportCenter);
            const normalizedDistance = distanceFromCenter / windowHeight;
            
            // Apply subtle scale based on position (creates "passing by" feel)
            const scale = 1 - (normalizedDistance * 0.02);
            const opacity = 1 - (normalizedDistance * 0.15);
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                scene.style.transform = `scale(${Math.max(0.98, Math.min(1, scale))})`;
                scene.style.opacity = Math.max(0.85, Math.min(1, opacity));
            }
        });
        
        // Reset after scrolling stops
        isScrolling = setTimeout(() => {
            scenes.forEach(scene => {
                scene.style.transform = 'scale(1)';
                scene.style.opacity = '1';
            });
        }, 150);
    }, { passive: true });
}

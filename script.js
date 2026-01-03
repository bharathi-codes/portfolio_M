// ========================================
// 3D SPATIAL SCROLL PORTFOLIO
// Bharathi B - Full Stack Developer
// ========================================

// Content protection
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Smooth scroll polyfill for older browsers
if (!CSS.supports('animation-timeline', 'scroll()')) {
    console.log('Scroll-driven animations not supported. Using fallback layout.');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('3D Spatial Scroll Portfolio Initialized');
    console.log('Scroll to explore the portfolio!');
});

import Stats from 'stats.js';

export const initFpsStats = () => {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, etc.
    document.body.appendChild(stats.dom);
    stats.dom.style.position = 'absolute';
    stats.dom.style.left = '0px';
    stats.dom.style.top = '0px';

    function animateStats() {
        stats.begin();
        // Den faktiska renderingen eller andra operationer sker här.
        stats.end();
        requestAnimationFrame(animateStats);
    }
    requestAnimationFrame(animateStats);
};

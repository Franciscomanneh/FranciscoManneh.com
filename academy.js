/**
 * ACADEMY SPECIFIC SCRIPTS
 */

 document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. ACCORDION / EXPANDABLE LESSONS
    ========================================= */
    const modules = document.querySelectorAll('.module');
    
    modules.forEach(mod => {
        const header = mod.querySelector('.module-header');
        if (header) {
            header.addEventListener('click', () => {
                // Optional: Close others
                // modules.forEach(m => {
                //     if (m !== mod) {
                //         m.classList.remove('active');
                //         m.querySelector('.module-content').style.maxHeight = null;
                //     }
                // });

                mod.classList.toggle('active');
                const content = mod.querySelector('.module-content');
                if (mod.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
                
                // Update Progress purely as a UI simulation
                updateProgress();
            });
        }
    });

    /* =========================================
       2. RECALCULATE MAX HEIGHT ON RESIZE
    ========================================= */
    window.addEventListener('resize', () => {
        modules.forEach(mod => {
            if (mod.classList.contains('active')) {
                const content = mod.querySelector('.module-content');
                content.style.maxHeight = "none"; 
                const newHeight = content.scrollHeight;
                content.style.maxHeight = newHeight + "px";
            }
        });
    });

    /* =========================================
       3. COPY TO CLIPBOARD
    ========================================= */
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.closest('.code-block').querySelector('pre code');
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.innerText).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = "<i class='bx bx-check'></i> Copied!";
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 2000);
                });
            }
        });
    });

    /* =========================================
       4. SHOW / HIDE ANSWERS
    ========================================= */
    const toggleBtns = document.querySelectorAll('.answer-toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.toggle('show');
                if (targetContent.classList.contains('show')) {
                    btn.innerHTML = "Hide Answer <i class='bx bx-chevron-up'></i>";
                } else {
                    btn.innerHTML = "Reveal Answer <i class='bx bx-chevron-down'></i>";
                }
            }
        });
    });

    /* =========================================
       5. SIMULATED PROGRESS SYSTEM
    ========================================= */
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const lessonItems = document.querySelectorAll('.lesson-item');

    function updateProgress() {
        if (!progressFill || !progressText) return;
        
        let activeModules = document.querySelectorAll('.module.active').length;
        let totalModules = modules.length || 1;
        
        let percentage = Math.round((activeModules / totalModules) * 100);
        if (percentage > 100) percentage = 100;
        
        progressFill.style.width = percentage + '%';
        progressText.innerText = percentage + '% Completed';

        // Mark sidebar items as complete based on index
        lessonItems.forEach((item, index) => {
            if (index < activeModules) {
                item.classList.add('completed');
                item.querySelector('.lesson-icon').className = "bx bx-check-circle lesson-icon";
            }
        });
    }
});

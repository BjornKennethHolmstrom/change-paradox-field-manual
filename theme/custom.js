// Custom JavaScript for The Change Paradox Field Manual

(function() {
    'use strict';

    // Add copy button to code blocks
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(function(codeBlock) {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 5px 10px;
                background: #2563eb;
                color: white;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 12px;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            
            pre.style.position = 'relative';
            pre.appendChild(button);
            
            pre.addEventListener('mouseenter', function() {
                button.style.opacity = '1';
            });
            
            pre.addEventListener('mouseleave', function() {
                button.style.opacity = '0';
            });
            
            button.addEventListener('click', function() {
                navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                    button.textContent = 'Copied!';
                    setTimeout(function() {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            });
        });
    }

    // Add anchors to headers for easy linking
    function addHeaderAnchors() {
        const headers = document.querySelectorAll('.content h2, .content h3, .content h4');
        
        headers.forEach(function(header) {
            if (!header.id) {
                // Create an ID from the header text
                const id = header.textContent
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/^-+|-+$/g, '');
                header.id = id;
            }
            
            // Add a link icon that appears on hover
            const anchor = document.createElement('a');
            anchor.className = 'header-anchor';
            anchor.href = '#' + header.id;
            anchor.innerHTML = '🔗';
            anchor.style.cssText = `
                text-decoration: none;
                margin-left: 0.5em;
                opacity: 0;
                transition: opacity 0.2s;
                font-size: 0.8em;
            `;
            
            header.appendChild(anchor);
            
            header.addEventListener('mouseenter', function() {
                anchor.style.opacity = '0.5';
            });
            
            header.addEventListener('mouseleave', function() {
                anchor.style.opacity = '0';
            });
            
            anchor.addEventListener('mouseenter', function() {
                anchor.style.opacity = '1';
            });
        });
    }

    // Add reading time estimate to the top of each page
    function addReadingTime() {
        const content = document.querySelector('.content');
        if (!content) return;
        
        const text = content.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
        
        const timeIndicator = document.createElement('div');
        timeIndicator.style.cssText = `
            font-size: 0.9em;
            color: #666;
            margin-bottom: 1em;
            padding: 0.5em;
            background-color: rgba(0, 0, 0, 0.05);
            border-radius: 3px;
            text-align: right;
        `;
        timeIndicator.textContent = `📖 Estimated reading time: ${readingTime} min`;
        
        const firstH1 = content.querySelector('h1');
        if (firstH1 && firstH1.nextSibling) {
            content.insertBefore(timeIndicator, firstH1.nextSibling);
        }
    }

    // Highlight current section in navigation
    function highlightCurrentSection() {
        const currentUrl = window.location.pathname;
        const navLinks = document.querySelectorAll('.chapter a');
        
        navLinks.forEach(function(link) {
            if (link.getAttribute('href') === currentUrl) {
                link.style.fontWeight = 'bold';
                link.style.color = '#2563eb';
            }
        });
    }

    // Add "back to top" button for long pages
    function addBackToTop() {
        const button = document.createElement('button');
        button.textContent = '↑ Top';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
            font-weight: 600;
        `;
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
            } else {
                button.style.opacity = '0';
            }
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add visual indicators for checkboxes in tables
    function enhanceCheckboxes() {
        const content = document.querySelector('.content');
        if (!content) return;
        
        // Replace ✅ with styled version
        content.innerHTML = content.innerHTML.replace(/✅/g, '<span style="color: #059669; font-size: 1.2em;">✅</span>');
        
        // Replace ❌ with styled version
        content.innerHTML = content.innerHTML.replace(/❌/g, '<span style="color: #dc2626; font-size: 1.2em;">❌</span>');
        
        // Replace ⚠️ with styled version
        content.innerHTML = content.innerHTML.replace(/⚠️/g, '<span style="color: #d97706; font-size: 1.2em;">⚠️</span>');
    }

    // Add progress indicator for multi-part sections
    function addProgressIndicator() {
        const url = window.location.pathname;
        
        // Check if this is a protocol section (6.x)
        if (url.includes('06-protocol')) {
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: fixed;
                top: 60px;
                right: 20px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                z-index: 999;
                font-size: 0.85em;
            `;
            
            let part = '';
            if (url.includes('steps-1-2')) part = 'Steps 1-2 of 7';
            if (url.includes('steps-3-4')) part = 'Steps 3-4 of 7';
            if (url.includes('steps-5-6-7')) part = 'Steps 5-7 of 7';
            
            if (part) {
                indicator.innerHTML = `<strong>7-Step Protocol:</strong><br>${part}`;
                document.body.appendChild(indicator);
            }
        }
    }

    // Initialize all enhancements when page loads
    document.addEventListener('DOMContentLoaded', function() {
        addCopyButtons();
        addHeaderAnchors();
        addReadingTime();
        highlightCurrentSection();
        addBackToTop();
        enhanceCheckboxes();
        addProgressIndicator();
    });

    // Also run on navigation (mdBook uses AJAX for page changes)
    document.addEventListener('load', function() {
        addCopyButtons();
        addHeaderAnchors();
        addReadingTime();
        highlightCurrentSection();
        enhanceCheckboxes();
        addProgressIndicator();
    });

})();

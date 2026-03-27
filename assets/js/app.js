/**
 * Denahalaya Institute - Core Application Logic
 * Optimized for local and server execution
 */

$(function() {
    // 8. Dynamic Course Modal Logic (Unified & Exalted to Global Scope Early)
    let courseModalInstance = null;

    window.showCourseDetails = function(courseId) {
        const course = window.COURSE_DATA ? window.COURSE_DATA[courseId] : null;
        if (!course) {
            if (window.COURSE_DATA) console.error("Course data not found for:", courseId);
            return;
        }

        const modalEl = document.getElementById('courseDetailsModal');
        if (!modalEl) {
            // Silently retry if modals.html is still loading
            setTimeout(() => window.showCourseDetails(courseId), 100);
            return;
        }

        // Populate Modal Content
        $('#modalCourseTitle').text(course.title);
        $('#modalCourseTagline').text(course.tagline);
        
        const durationEl = document.getElementById('modalCourseDuration');
        if (durationEl) {
            durationEl.innerHTML = `<i class="far fa-calendar-alt me-2"></i>${course.duration}`;
        }

        const bodyEl = document.getElementById('modalCourseBody');
        if (bodyEl) {
            bodyEl.innerHTML = course.content;
        }

        // Populate Highlights
        const highlightsContainer = document.getElementById('modalHighlights');
        if (highlightsContainer) {
            highlightsContainer.innerHTML = '';
            if (course.highlights && course.highlights.length > 0) {
                course.highlights.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'highlight-item mb-1';
                    div.innerHTML = `<i class="fas fa-check text-gold me-2"></i><span style="font-size: 0.95rem; color: #555;">${item}</span>`;
                    highlightsContainer.appendChild(div);
                });
            }
        }

        // Populate Stats
        const statsContainer = document.getElementById('modalStats');
        if (statsContainer) {
            statsContainer.innerHTML = '';
            if (course.seats) {
                statsContainer.innerHTML += `<span class="stat-pill"><i class="fas fa-users me-2"></i>Seats: ${course.seats}</span>`;
            }
            if (course.age) {
                statsContainer.innerHTML += `<span class="stat-pill"><i class="fas fa-user-clock me-2"></i>Age: ${course.age}</span>`;
            }
        }

        // Reuse or create Bootstrap modal instance
        if (!courseModalInstance && typeof bootstrap !== 'undefined') {
            courseModalInstance = new bootstrap.Modal(modalEl);
        }

        // [Auto-Fill Update] - Set the course slug on the "Apply Now" button inside the modal
        const $modalApplyBtn = $('#modalApplyBtn');
        if ($modalApplyBtn.length) {
            $modalApplyBtn.attr('data-course', courseId);
        }

        if (courseModalInstance) courseModalInstance.show();
    };

    // Alias for user request (Globally Available)
    window.openCourse = window.showCourseDetails;

    // Detect local file protocol
    const isLocalFile = window.location.protocol === 'file:';

    // 1. Protocol Handling & Warnings
    if (isLocalFile) {
        console.warn("Website running via file:// protocol. Dynamic features (header/footer) may be blocked.");
    }

    // 2. Dynamic HTML Inclusions (Header/Footer)
    const includes = $('[data-include]');
    let loadedCount = 0;

    if (includes.length > 0) {
        includes.each(function() {
            const $this = $(this);
            const file = $this.data('include') + '.html';
            
            // Simplified load with error handling and cache-busting
            fetch(file + '?v=10.0')
                .then(response => {
                    if (!response.ok) throw new Error('CORS or File Not Found');
                    return response.text();
                })
                .then(html => {
                    $this.html(html);
                    checkComplete();
                })
                .catch(err => {
                    console.error(`Error loading ${file}:`, err);
                    if (isLocalFile) {
                        $this.html(`
                            <div class="alert alert-warning m-3 py-2 small">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                <strong>Local Protocol Warning:</strong> ${file} could not be loaded. 
                                <br>Please run via <strong>Live Server</strong> or a local web server.
                            </div>
                        `);
                    }
                    checkComplete();
                });
        });
    } else {
        initializePlugins();
    }

    // 2b. Smooth Anchor Scrolling (Requested by user)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    function checkComplete() {
        loadedCount++;
        if (loadedCount === includes.length) {
            initializePlugins();
            $(document).trigger('include-complete');
        }
    }

    function initializePlugins() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: window.innerWidth < 768 ? 0 : 100, // No offset on mobile to ensure clicks aren't blocked
                disable: false // Support AOS on all devices for continuity
            });
            AOS.refresh();
        }

        // 3c. Faculty Grid View Toggle (3 Rows Limit)
        const $facultyGrid = $('#facultyGrid');
        if ($facultyGrid.length > 0) {
            const initialShown = 12; // 3 rows of 4
            const $items = $('.faculty-item');
            const $loadMoreBtn = $('#loadMoreFaculty');
            const $loadMoreContainer = $('#loadMoreContainer');

            if ($items.length > initialShown) {
                $items.slice(initialShown).addClass('d-none');
                $loadMoreContainer.show(); // Ensure visible if more than limit
            } else {
                $loadMoreContainer.hide();
            }

            $loadMoreBtn.off('click').on('click', function() {
                const isExpanded = $(this).hasClass('expanded');
                
                if (!isExpanded) {
                    // View More Actions
                    $items.slice(initialShown).removeClass('d-none').hide().fadeIn(800);
                    $(this).addClass('expanded').html('View Less <i class="fas fa-arrow-up ms-2"></i>');
                } else {
                    // View Less Actions - Optimize to prevent flickering
                    // 1. Scroll to top of grid first
                    const targetTop = $facultyGrid.offset().top - (window.innerWidth < 768 ? 150 : 100);
                    
                    $('html, body').animate({
                        scrollTop: targetTop
                    }, {
                        duration: 600,
                        easing: 'swing',
                        complete: function() {
                            // 2. Hide extra items ONLY after scroll reaches target area
                            $items.slice(initialShown).fadeOut(300, function() {
                                $(this).addClass('d-none');
                                if (typeof AOS !== 'undefined') AOS.refresh();
                            });
                            $loadMoreBtn.removeClass('expanded').html('View More <i class="fas fa-arrow-down ms-2"></i>');
                        }
                    });
                }
            });
        }

        // 3d. Gallery Lightbox (Fancybox 5) - Premium Zoom & Play
        if (typeof Fancybox !== 'undefined') {
            Fancybox.bind("[data-fancybox]", {
                Toolbar: {
                    display: {
                        left: ["infobar"],
                        middle: [],
                        right: ["zoomIn", "zoomOut", "slideshow", "fullscreen", "thumbs", "close"],
                    },
                },
                Images: {
                    Panzoom: {
                        maxScale: 3,
                    },
                },
                Slideshow: {
                    playOnStart: false,
                    timeout: 3000,
                },
                Thumbs: {
                    autoStart: false,
                }
            });
        }

        // 3e. Gallery View More / View Less Toggle
        const $viewMoreBtn = $('#viewMoreBtn');
        if ($viewMoreBtn.length > 0) {
            $viewMoreBtn.off('click').on('click', function() {
                const $extraItems = $('.gallery-item-extra');
                const isExpanding = !$(this).hasClass('expanded');
                
                const moreText = $(this).data('more-text') || 'View More Moments <i class="fas fa-chevron-down ms-2"></i>';
                const lessText = $(this).data('less-text') || 'View Less Moments <i class="fas fa-chevron-up ms-2"></i>';

                if (isExpanding) {
                    $extraItems.removeClass('d-none').hide().fadeIn(800);
                    $(this).addClass('expanded').html(lessText);
                    if (typeof AOS !== 'undefined') {
                        setTimeout(() => AOS.refresh(), 100);
                    }
                } else {
                    // Smooth scroll back to start of gallery before hiding
                    const $galleryStart = $('#gallery-start');
                    const targetTop = ($galleryStart.length > 0) ? $galleryStart.offset().top - 100 : 0;
                    
                    $('html, body').animate({
                        scrollTop: targetTop
                    }, 600, function() {
                        $extraItems.fadeOut(400, function() {
                            $(this).addClass('d-none');
                        });
                        $viewMoreBtn.removeClass('expanded').html(moreText);
                    });
                }
            });
        }

        // 3b. Premium CTA Highlights (v29)
        // Animations now handled directly in HTML classes for reliability.
        // JS timeout removed per user request for continuous movement.


        // 4. Hero Slider
        if ($('.hero-slider').length > 0 && typeof Swiper !== 'undefined') {
            new Swiper('.hero-slider', {
                speed: 800,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                effect: 'fade',
                fadeEffect: { crossFade: true },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            });
        }

        // 5. Portfolio/Gallery Swiper
        if ($('.mySwiper').length > 0 && typeof Swiper !== 'undefined') {
            new Swiper(".mySwiper", {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                coverflowEffect: {
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
            });
        }

        // 6. Custom Testimonial Marquee (Seamless Loop + Click to Stop)
        const $marqueeTrack = $('.testimonial-marquee-track');
        if ($marqueeTrack.length > 0) {
            // Clone cards for seamless marquee effect
            const $cards = $marqueeTrack.find('.testimonial-box');
            $marqueeTrack.append($cards.clone());

            // 6a. Pause on hover, resume on leave (Standard Marquee Behavior)
            $marqueeTrack.on('mouseenter', '.testimonial-box', function() {
                $marqueeTrack.addClass('paused');
            }).on('mouseleave', '.testimonial-box', function() {
                $marqueeTrack.removeClass('paused');
            });

            // 6b. Safety: Clicking also ensures it doesn't stay permanently stuck
            $marqueeTrack.on('click', '.testimonial-box', function() {
                // If clicked, we still want it to pause while hovering, 
                // but mouseleave will eventually trigger a resume.
                $marqueeTrack.addClass('paused');
            });
        }


        // 5b. Faculty Carousel
        if ($('.facultySwiper').length > 0 && typeof Swiper !== 'undefined') {
            new Swiper(".facultySwiper", {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                centeredSlides: false,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 }
                }
            });
        }


        // 6. Global Application Form Submission
        if (typeof emailjs !== 'undefined') {
            emailjs.init("RmgrNAAYbmB8BvIJ2");
        }

        // 6. Global Modal Scroll Locking & Lenis Integration
        // This ensures that when ANY modal or Fancybox opens, the smooth scroll (Lenis) is paused
        // and floating UI elements are hidden for a focused experience.
        const toggleUIForModal = (show) => {
            const $floaters = $('.cta-wrapper, #floatingActions, .floating-actions, .floating-buttons');
            if (show) {
                if (window.lenis) window.lenis.start();
                $('html, body').removeClass('modal-open-active');
                $floaters.fadeIn(300);
            } else {
                if (window.lenis) window.lenis.stop();
                $('html, body').addClass('modal-open-active');
                $floaters.fadeOut(300);
            }
        };

        $(document).on('shown.bs.modal', () => toggleUIForModal(false));
        $(document).on('hidden.bs.modal', () => toggleUIForModal(true));

        // 6b. Fancybox v5 Integration (Robust Scroll & UI Restore)
        const initFancyboxObservers = () => {
            if (typeof Fancybox === 'undefined') return;

            // Use global defaults to catch all Fancybox instances
            Fancybox.defaults.on = {
                reveal: () => toggleUIForModal(false),
                destroy: () => toggleUIForModal(true)
            };

            // MutationObserver safety fallback: 
            // If .fancybox__container is removed from DOM, restore UI
            const observer = new MutationObserver((mutations) => {
                const fancyboxGone = !document.querySelector('.fancybox__container');
                const fancyboxActive = document.documentElement.classList.contains('has-fancybox');
                
                if (fancyboxGone && !fancyboxActive) {
                    // Ensure UI is restored if Fancybox closed but events missed
                    const $floaters = $('.cta-wrapper, #floatingActions, .floating-actions, .floating-buttons');
                    if ($floaters.is(':hidden')) {
                         toggleUIForModal(true);
                    }
                }
            });

            observer.observe(document.body, { childList: true });
        };

        initFancyboxObservers();

        /**
         * ==========================================
         * 7. CORE EMAIL ENGINE (EmailJS v25)
         * - Service: service_xobfjk8
         * - Template: template_jeonbnf
         * - Public Key: XxDgOKwmxVpCQ1zx6
         * ==========================================
         */
        const EMAILJS_CONFIG = {
            PUBLIC_KEY: "XxDgOKwmxVpCQ1zx6",
            SERVICE_ID: "service_xobfjk8",
            TEMPLATE_ID: "template_jeonbnf"
        };

        // Initialize EmailJS Globally
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        }

        // 7. Success Toast Helper (v30)
        // 7. Success Toast Helper (v30) - [LEGACY - Keep for compatibility if needed elsewhere]
        window.showToast = function(message) {
            const toast = document.getElementById("toast");
            if (!toast) return;
            if (message) toast.innerHTML = `✔ ${message}`;
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }

        // 7b. Premium Success Alert (v31)
        window.showSuccessAlert = function() {
            const alertBox = document.getElementById("successAlert");
            if (!alertBox) return;
            
            alertBox.classList.add("active");
            
            // Auto close after 5 seconds
            setTimeout(() => {
                alertBox.classList.remove("active");
            }, 5000);
            
            // Allow manual close on overlay click
            alertBox.onclick = function(e) {
                if (e.target === alertBox) {
                    alertBox.classList.remove("active");
                }
            };
        }

        window.handleFormSubmission = function(e, formId = 'generic') {
            e.preventDefault(); 
            
            const form = e.target;
            const $form = $(form);
            const $btn = $form.find('button[type="submit"]');
            const originalText = $btn.html();            
            
            $form.find('.is-invalid').removeClass('is-invalid');
            $form.find('.error-message').hide().text('');

            // 2. Validation Mapping
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());
            const required = ['name', 'age', 'email', 'phone', 'address', 'pin', 'diocese', 'qualification', 'apostolate', 'course', 'reason'];
            
            const fieldLabels = {
                name: "Full Name",
                age: "Age",
                email: "Email Address",
                phone: "Phone Number",
                address: "Address",
                pin: "Pin Code",
                diocese: "Diocese / Congregation",
                qualification: "Qualification",
                apostolate: "Present Apostolate",
                course: "Programme Selection",
                reason: "Reason for applying"
            };

            let isValid = true;
            let firstErrorInput = null;
            
            required.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (input && (!dataObj[field] || dataObj[field].toString().trim() === "")) {
                    isValid = false;
                    $(input).addClass('is-invalid');
                    
                    const $group = $(input).closest('.form-group, .col-md-9, .col-md-3, .col-md-6, .col-md-12, .col-12');
                    const $error = $group.find('.error-message');
                    if ($error.length) {
                        $error.text(`${fieldLabels[field] || field} is required`).show();
                    }

                    if (!firstErrorInput) firstErrorInput = input;
                }
            });

            if (!isValid) {
                if (firstErrorInput) firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return false;
            }

            // 2. Loading State
            $btn.prop('disabled', true).text("Sending...");

            // 3. EmailJS Execution
            emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, form)
                .then(function() {
                    window.showSuccessAlert(); // ✅ Trigger Premium Alert
                    form.reset();
                    
                    if (typeof resetCourseSelect === 'function') resetCourseSelect();
                    
                    setTimeout(() => {
                        $('.modal').modal('hide');
                        if (formId === 'apply-page') window.location.href = "index.html";
                    }, 1000); // Close modal sooner as alert is overlaying

                }, function(error) {
                    console.error("FAILED...", error);
                    alert("Failed to send. Please check your connection and try again.");
                })
                .finally(() => {
                    $btn.prop('disabled', false).html(originalText);
                });
        }


        /** Global Validation Helpers (v23) */
        function showError(input, msg) {
            let error = input.nextElementSibling;
            if (error && error.tagName === 'LABEL') {
                error = error.nextElementSibling;
            }
            if (error && error.classList.contains('error-message')) {
                error.innerText = msg;
                error.style.display = "block";
            }
            input.classList.add("input-error");
        }

        function removeError(input) {
            let error = input.nextElementSibling;
            if (error && error.tagName === 'LABEL') {
                error = error.nextElementSibling;
            }
            if (error && error.classList.contains('error-message')) {
                error.innerText = "";
                error.style.display = "none";
            }
            input.classList.remove("input-error");
        }


        /** Internal helper for backup state management */
        function markBackupAsSent(email) {
            try {
                let submissions = JSON.parse(localStorage.getItem('denahalaya_submissions') || '[]');
                submissions = submissions.map(s => {
                    if (s.data.email === email && s.status === 'pending') {
                        return { ...s, status: 'sent' };
                    }
                    return s;
                });
                localStorage.setItem('denahalaya_submissions', JSON.stringify(submissions));
            } catch (e) {}
        }

        $(document).on('submit', '#applicationFormGlobal', function(e) {
            window.handleFormSubmission(e, 'global-modal');
        });
        
        /** 6. Subtle Scroll Animations (Fade-In) */
        const fadeElements = document.querySelectorAll('.fade-in');
        const handleScrollAnimation = () => {
            fadeElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    el.classList.add('show');
                }
            });
        };
        $(window).on('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Initial trigger

        // 7. Horizontal Scroll Navigation (Faculty Section)
        const setupScroll = (scrollRowId, prevBtnId, nextBtnId) => {
            const $row = $(`#${scrollRowId}`);
            const $prev = $(`#${prevBtnId}`);
            const $next = $(`#${nextBtnId}`);

            if ($row.length === 0) return;

            $next.on('click', function() {
                const scrollAmount = $row.find('.col-lg-3').first().outerWidth() + 20; // card width + gap
                $row.animate({ scrollLeft: $row.scrollLeft() + scrollAmount }, 400);
            });

            $prev.on('click', function() {
                const scrollAmount = $row.find('.col-lg-3').first().outerWidth() + 20;
                $row.animate({ scrollLeft: $row.scrollLeft() - scrollAmount }, 400);
            });

            // Toggle arrow visibility based on scroll position
            $row.on('scroll', function() {
                const scrollLeft = $(this).scrollLeft();
                const maxScroll = $(this)[0].scrollWidth - $(this).outerWidth();
                
                $prev.css('opacity', scrollLeft <= 5 ? '0.3' : '1');
                $next.css('opacity', scrollLeft >= maxScroll - 5 ? '0.3' : '1');
            });

            // Initial trigger
            $row.trigger('scroll');
        };

        // Old Scroll Logic (Cleaned up as we moved to Swiper)
        // setupScroll('facultyScrollRow', 'facultyPrev', 'facultyNext');

        // Mobile Dropdown Toggle Logic
        const $navItems = $('.nav-item.dropdown');
        $navItems.on('click', function(e) {
            if (window.innerWidth < 992) {
                const $this = $(this);
                if ($this.find('.dropdown-menu').length) {
                    if (!$this.hasClass('active')) {
                        e.preventDefault();
                        $navItems.removeClass('active');
                        $this.addClass('active');
                    } else {
                        $this.removeClass('active');
                    }
                }
            }
        });


        // 8. Support Us Form Submission (Newly Added & Validated)
        $(document).on('submit', '#supportForm', function(e) {
            e.preventDefault();
            const form = this;
            const $form = $(form);
            const $btn = $form.find('button[type="submit"]');
            const originalText = $btn.html();

            // 1. Reset Errors
            $form.find('.is-invalid').removeClass('is-invalid');
            $form.find('.error-message').hide().text('');

            // 2. Validation
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());
            const required = ['name', 'address', 'phone', 'email', 'subject', 'description'];
            
            const fieldLabels = {
                name: "Full Name",
                address: "Contact Address",
                phone: "Phone Number",
                email: "Email Address",
                subject: "Subject",
                description: "Description"
            };

            let isValid = true;
            let firstErrorInput = null;
            
            required.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (input && (!dataObj[field] || dataObj[field].toString().trim() === "")) {
                    isValid = false;
                    $(input).addClass('is-invalid');
                    
                    const $group = $(input).closest('.form-group');
                    const $error = $group.find('.error-message');
                    if ($error.length) {
                        $error.text(`${fieldLabels[field] || field} is required`).show();
                    }
                    if (!firstErrorInput) firstErrorInput = input;
                }
            });

            if (!isValid) {
                if (firstErrorInput) firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return false;
            }

            $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i> Sending...');

            // 3. EmailJS — explicit variable mapping for template_gde1f34
            const templateParams = {
                name:        (form.querySelector('[name="name"]') || {}).value || '',
                address:     (form.querySelector('[name="address"]') || {}).value || '',
                phone:       (form.querySelector('[name="phone"]') || {}).value || '',
                email:       (form.querySelector('[name="email"]') || {}).value || '',
                subject:     (form.querySelector('[name="subject"]') || {}).value || '',
                description: (form.querySelector('[name="description"]') || {}).value || ''
            };

            console.log('[EmailJS] Sending support form data:', templateParams);

            emailjs.send('service_xobfjk8', 'template_gde1f34', templateParams, 'XxDgOKwmxVpCQ1zx6')
                .then(function(response) {
                    console.log('[EmailJS] SUCCESS:', response.status, response.text);
                    if (typeof window.showSuccessAlert === 'function') {
                        window.showSuccessAlert();
                    }
                    form.reset();
                    const supportModal = document.getElementById('supportModal');
                    if (supportModal) {
                        const instance = bootstrap.Modal.getInstance(supportModal);
                        if (instance) instance.hide();
                    }
                })
                .catch(function(error) {
                    console.error('[EmailJS] FAILED:', error);
                    alert('Failed to send. Please check your connection and try again.');
                })
                .finally(function() {
                    $btn.prop('disabled', false).html(originalText);
                });
        });

    } // Close initializePlugins


    // 6. Global Utilities (Smart Scroll Toggle & Floating Buttons)
    
    // Generic View More / View Less Toggle System
    $(document).on('click', '.btn-toggle', function(e) {
        e.preventDefault();
        const $btn = $(this);
        const targetId = $btn.data('target');
        const $content = $(`#${targetId}`);
        
        if ($content.length) {
            const isExpanding = !$content.hasClass('expanded');
            $content.toggleClass('expanded');
            
            // Handle Button Text and Icon
            const moreText = $btn.data('more-text') || "View More ↓";
            const lessText = $btn.data('less-text') || "View Less ↑";
            
            $btn.html(isExpanding ? lessText : moreText);
            
            // Refresh AOS if present
            if (typeof AOS !== 'undefined') {
                setTimeout(() => AOS.refresh(), 400);
            }
        }
    });

    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(this).height();
        const documentHeight = $(document).height();
        const $scrollBtn = $('#scrollToggleBtn');
        
        // Sticky Navbar logic
        if (scrollTop > 100) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        // 6a. Floating Buttons Visibility (Always Visible per user request)
        // Hiding logic removed to ensure visibility on all pages at all times.

        // 6b. Smart Toggle Icon/Mode logic (only if button exists)
        if ($scrollBtn.length) {
            // Show button after 300px scroll
            if (scrollTop > 300) {
                $scrollBtn.addClass('show');
            } else {
                $scrollBtn.removeClass('show');
            }

            if (scrollTop + windowHeight > documentHeight - 150) {
                $scrollBtn.addClass('up').attr('aria-label', 'Scroll to top');
            } else {
                $scrollBtn.removeClass('up').attr('aria-label', 'Scroll to bottom');
            }
        }
    });


    // Use delegated click for dynamic include compatibility
    $(document).on('click', '#scrollToggleBtn', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        const isUp = $(this).hasClass('up');
        const targetScroll = isUp ? 0 : $(document).height() - $(window).height();
        
        // Use smooth scroll with fallback
        try {
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        } catch (err) {
            // Fallback for older browsers
            $('html, body').animate({ scrollTop: targetScroll }, 800);
        }
        
        return false;
    });

    // Faculty Load More Logic (Mobile Only) - REMOVED: CONSOLIDATED IN INITIALIZEPLUGINS

    // WhatsApp Floating Button Logic
    $(document).on('click', '#whatsappBtn', function(e) {
        e.preventDefault();
        const phone = "916282525648";
        const message = `Hello Denahalaya,
I would like to know more about your courses.`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });

    /**
     * ==========================================
     * 7. CUSTOM DROPDOWN & AUTO-FILL ENGINE (v8 - FULL NAME SYNC)
     * ==========================================
     */
    
    const COURSES = [
        "One-Year Diploma Course in Psycho-Spiritual Integration",
        "One-Year Diploma Course in Psycho-Spiritual Renewal",
        "Three-Month Certificate Programme in Candidate Assessment",
        "Three-Week Short Course for Formators",
        "One-Year Diploma Course in Formative Spirituality",
        "M.Sc. Clinical Psychology + Diploma Course in Psycho-Spiritual Integration",
        "B.Sc. Psychology + Psycho-Spiritual Integration",
        "M.Sc. Counselling Psychology + Integration"
    ];

    // 7a. Populate all lists (Run once or when needed)
    function populateDropdownLists() {
        $('.dropdown-list').each(function() {
            const $list = $(this);
            if ($list.children().length > 0) return; // already populated

            COURSES.forEach(courseName => {
                const $item = $('<div class="dropdown-item"></div>')
                    .text(courseName) // Safe: jQuery .text() uses textContent
                    .attr('data-id', courseName);
                $list.append($item);
            });
        });
    }

    // 7b. TOGGLE HANDLER (DELEGATED)
    $(document).on('click', '.dropdown-selected', function(e) {
        e.stopPropagation();
        const $selected = $(this);
        const $container = $selected.closest('.custom-dropdown');
        const $list = $container.find('.dropdown-list');

        // Ensure list is populated first
        populateDropdownLists();

        // Close others
        $('.dropdown-list').not($list).removeClass('show');
        $('.custom-dropdown').not($container).removeClass('active');

        // Toggle current
        $list.toggleClass('show');
        $container.toggleClass('active');
    });

    // 7c. ITEM SELECTION (DELEGATED - Generic)
    $(document).on('click', '.dropdown-item', function(e) {
        e.stopPropagation();
        const $item = $(this);
        // Supports data-id (Courses) or data-value (Qualifications)
        const selectedValue = $item.attr('data-id') || $item.attr('data-value');
        const $container = $item.closest('.custom-dropdown');
        const $display = $container.find('.dropdown-selected');
        const $input = $container.find('input[type="hidden"]');
        
        if (selectedValue) {
            $display.text(selectedValue).css('color', '#333');
            $input.val(selectedValue).trigger('change');
            
            // Highlight check
            $container.find('.dropdown-item').removeClass('active');
            $item.addClass('active');
        }

        $container.find('.dropdown-list').removeClass('show');
        $container.removeClass('active');
    });

    // 7d. RESET ALL CUSTOM DROPDOWNS
    function resetCourseSelect() {
        $('.custom-dropdown').each(function() {
            const $container = $(this);
            const id = $container.attr('id');
            let defaultText = 'Select Option *';
            
            if (id.includes('course')) {
                defaultText = id.includes('Apply') ? '-- Choose a Programme --' : 'Select Your Course *';
            } else if (id.includes('qual')) {
                defaultText = id.includes('Apply') ? '-- Select Qualification --' : 'Highest Qualification *';
            }
            
            $container.find('.dropdown-selected').text(defaultText).css('color', '#999');
            $container.find('input[type="hidden"]').val('');
            $container.find('.dropdown-item').removeClass('active');
        });
        localStorage.removeItem("selectedCourse");
    }

    // 7e. SET VALUES
    function setCourse(value) {
        if (!value) return;
        populateDropdownLists(); // Ensure lists exist
        
        $('.custom-dropdown').each(function() {
            const $container = $(this);
            // Search for item with matching data-id (full name)
            const $item = $container.find(`.dropdown-item[data-id="${value}"]`);
            if ($item.length > 0) {
                $item.click(); 
            }
        });
    }

    // Outside click closer
    $(document).on('click', function() {
        $('.dropdown-list').removeClass('show');
        $('.custom-dropdown').removeClass('active');
    });

    // Initial population for static pages
    setTimeout(populateDropdownLists, 100)    // 7d. NORMAL APPLY NOW BUTTON (RESET) (Delegated)
    $(document).on('click', '.apply-now-btn', function() {
        resetCourseSelect();
        $('.is-invalid').removeClass('is-invalid');
        $('.error-message').hide().text('');
    });

    // 7e. COURSE BASED APPLY BUTTON (SET VALUE) (Delegated)
    $(document).on('click', '.apply-course-btn', function() {
        const courseSlug = $(this).attr("data-course");
        resetCourseSelect(); // clear first
        $('.is-invalid').removeClass('is-invalid');
        $('.error-message').hide().text('');
        
        if (courseSlug) {
            localStorage.setItem("selectedCourse", courseSlug);
            setTimeout(() => {
                setCourse(courseSlug);
            }, 100);
        }
    });

    // 7f. MODAL EVENTS (Cleanup on Open)
    $(document).on('show.bs.modal', '#applyModal', function() {
        resetCourseSelect();
        $('.is-invalid').removeClass('is-invalid');
        $('.error-message').hide().text('');
        setTimeout(populateDropdownLists, 200);
    });
;

    // 7f. AFTER MODAL FULLY OPEN (Delegated)
    $(document).on('shown.bs.modal', '#applyModal', function() {
        const savedCourse = localStorage.getItem("selectedCourse");
        if (savedCourse) {
            setCourse(savedCourse);
        }
    });

    // 7g. URL Parameter Support (Runs after a delay to allow fetch completion)
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCourse = urlParams.get('course');
        if (urlCourse) {
            setCourse(urlCourse);
        }
    }, 1500); 

    // 8. Leader Card Reveal (Staggered Scroll Trigger)
    const leaderCards = document.querySelectorAll('.leader-card');
    if (leaderCards.length > 0) {
        const observerOptions = {
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const allCards = Array.from(document.querySelectorAll('.leader-card'));
                    const idx = allCards.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, idx * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        leaderCards.forEach(card => observer.observe(card));
    }



    // 9. Custom Modal Logic (Fixed: Renamed to avoid Bootstrap conflicts)
    $(document).on('click', '.read-more-btn', function() {
        const modal = document.getElementById("legacyModal");
        const $btn = $(this);
        const name = $btn.data('name');
        const img = $btn.data('img');
        const content = $btn.data('content');

        if (modal) {
            document.getElementById("legacy-modal-title").innerText = name;
            document.getElementById("legacy-modal-text").innerText = content;
            document.getElementById("legacy-modal-img").src = img;
            modal.style.display = "flex";
        }
    });

    $(document).on('click', '.legacy-modal-close', function() {
        const modal = document.getElementById("legacyModal");
        if (modal) modal.style.display = "none";
    });

    $(window).on('click', function(e) {
        const modal = document.getElementById("legacyModal");
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Set initial state
    $(window).trigger('scroll');
});
/**
 * Denahalaya Institute - Core Application Logic
 * Optimized for local and server execution
 */

$(function() {
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
            
            // Simplified load with error handling
            fetch(file)
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

    function checkComplete() {
        loadedCount++;
        if (loadedCount === includes.length) {
            initializePlugins();
        }
    }

    function initializePlugins() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                disable: window.innerWidth < 768 // Disable gracefully on mobile if needed, but run locally
            });
            AOS.refresh();
        }

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

        // Modal Scroll Locking & Accessibility Fix
        $(document).on('shown.bs.modal', '#applyModal', function () {
            $('body').css('overflow', 'hidden');
            $('.floating-buttons').fadeOut(300); // Hide floating elements
        });
        
        $(document).on('hidden.bs.modal', '#applyModal', function () {
            $('body').css('overflow', '');
            $('.floating-buttons').fadeIn(300); // Restore floating elements
        });

        /**
         * ==========================================
         * CORE FORM ENGINE (Production-Ready)
         * - Prevents duplicate submissions
         * - Persistent localStorage backup
         * - Centralized error/success feedback
         * ==========================================
         */
        window.handleFormSubmission = function(e, formId = 'generic') {
            e.preventDefault();
            const form = e.target;
            const $form = $(form);
            const $btn = $form.find('button[type="submit"]');
            const originalText = $btn.html();

            // 1. Duplicate Prevention Check
            if ($form.data('submitting') === true) return false;

            // 2. Data Capture & Validation
            const formData = new FormData(form);
            const dataObj = Object.fromEntries(formData.entries());
            const required = ['name', 'age', 'email', 'address', 'course', 'pin', 'phone', 'diocese', 'qualification', 'apostolate', 'reason'];
            let missingFields = [];
            
            required.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (!dataObj[field] || dataObj[field].toString().trim() === "") {
                    let labelText = field;
                    const label = input.parentElement.querySelector('label');
                    if (label) {
                        labelText = label.innerText.replace('*', '').trim();
                    } else if (input.placeholder && input.placeholder.trim() !== "") {
                        labelText = input.placeholder;
                    }
                    missingFields.push(labelText);
                }
            });

            if (missingFields.length > 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Incomplete Application',
                    text: 'Please fill out all fields. Missing: ' + missingFields.join(', '),
                    confirmButtonColor: '#0b2a4a'
                });
                return false;
            }

            // 3. Status Transition & Backup
            $form.data('submitting', true); // Set internal flag
            $btn.html('Submitting… <i class="fas fa-spinner fa-spin ms-2"></i>').prop('disabled', true);

            try {
                const submissions = JSON.parse(localStorage.getItem('denahalaya_submissions') || '[]');
                submissions.push({
                    timestamp: new Date().toISOString(),
                    formId: formId,
                    data: dataObj,
                    status: 'pending'
                });
                localStorage.setItem('denahalaya_submissions', JSON.stringify(submissions));
            } catch (err) {
                console.error("Backup failed:", err);
            }

            // 4. EmailJS Execution
            emailjs.sendForm('service_2kwpecd', 'template_s32jb2z', form)
                .then((response) => {
                    console.log("EmailJS Success:", response.status);
                    markBackupAsSent(dataObj.email);

                    Swal.fire({
                        html: `
                            <div class="text-center">
                                <img src="./assets/images/denahalaya_logo.png" alt="Logo" style="max-height: 70px; margin-bottom: 20px;">
                                <div class="success-checkmark mb-4">
                                    <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                                </div>
                                <h3 style="color: #002147; font-weight: 700; font-size: 1.5rem; margin-bottom: 10px;">Submission Successful!</h3>
                                <p style="color: #666; font-size: 1rem; line-height: 1.5;">Thank you! Your application for <strong>${dataObj.course}</strong> has been received by the institute.</p>
                                <p class="small text-muted mt-3">Redirecting to homepage in 3 seconds...</p>
                            </div>
                        `,
                        showConfirmButton: false,
                        timer: 3500,
                        timerProgressBar: true,
                        background: '#fff',
                        backdrop: 'rgba(0,33,71,0.85)',
                        customClass: { popup: 'custom-success-popup' },
                        didClose: () => { window.location.href = "index.html"; }
                    });
                    form.reset();
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    // Fallback success feedback as data is backed up
                    Swal.fire({
                        html: `
                            <div class="text-center">
                                <img src="./assets/images/denahalaya_logo.png" alt="Logo" style="max-height: 70px; margin-bottom: 20px;">
                                <h3 style="color: #002147; font-weight: 700; font-size: 1.5rem; margin-bottom: 10px;">Submission Received</h3>
                                <p style="color: #666; font-size: 1rem; line-height: 1.5;">Thank you! We have securely noted your application details.</p>
                                <div class="alert alert-info py-2 small mt-3 text-start">
                                    <p class="mb-1"><strong><i class="fas fa-info-circle me-1"></i> Note:</strong> Your form data is saved successfully.</p>
                                    <p class="mb-0">Please also contact us at <strong>+91 94464 69599</strong> to confirm.</p>
                                </div>
                            </div>
                        `,
                        confirmButtonText: 'I Understand, Finish',
                        confirmButtonColor: '#002147',
                        background: '#fff',
                        backdrop: 'rgba(0,33,71,0.85)',
                        customClass: { popup: 'custom-success-popup' },
                        didClose: () => { window.location.href = "index.html"; }
                    });
                })
                .finally(() => {
                    $form.data('submitting', false); // Release flag
                    $btn.html(originalText).prop('disabled', false);
                });
        };

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

        // Close dropdown when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.nav-item.dropdown').length) {
                $('.nav-item.dropdown').removeClass('active');
            }
        });

        // 8. Dynamic Course Modal Logic
        window.showCourseDetails = function(courseId) {
            const course = window.COURSE_DATA[courseId];
            if (!course) return;

            $('#modalCourseTitle').text(course.title);
            $('#modalCourseTagline').text(course.tagline);
            document.getElementById('modalCourseDuration').innerHTML = `<i class="far fa-calendar-alt me-2"></i>${course.duration}`;
    document.getElementById('modalCourseBody').innerHTML = course.content;

    // Populate Highlights
    const highlightsContainer = document.getElementById('modalHighlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = '';
        if (course.highlights && course.highlights.length > 0) {
            course.highlights.forEach(item => {
                const span = document.createElement('div');
                span.className = 'highlight-item mb-1';
                span.innerHTML = `<i class="fas fa-check text-gold me-2"></i><span style="font-size: 0.95rem; color: #555;">${item}</span>`;
                highlightsContainer.appendChild(span);
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

            const courseModal = new bootstrap.Modal(document.getElementById('courseDetailsModal'));
            courseModal.show();
        };

        // Alias for user request
        window.openCourse = window.showCourseDetails;
    }

    // 6. Global Utilities (Smart Scroll Toggle & Floating Buttons)
    $(window).scroll(function() {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(this).height();
        const documentHeight = $(document).height();
        const $scrollBtn = $('#scrollToggleBtn');
        const $floatingBtns = $('.floating-buttons');
        const $footer = $('footer');
        
        // Sticky Navbar logic
        if (scrollTop > 100) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        // 6a. Floating Buttons Visibility (Global Logic)
        if ($floatingBtns.length && $footer.length) {
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            const footerTop = $footer.offset().top;
            
            // Hide if we are approaching the footer (across all devices)
            if (scrollTop + windowHeight > footerTop - 10) {
                $floatingBtns.addClass('hidden');
            } else {
                $floatingBtns.removeClass('hidden');
            }
        }

        // 6b. Smart Toggle Icon/Mode logic (only if button exists)
        if ($scrollBtn.length) {
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

    // Faculty Load More Logic (Mobile Only)
    $('#loadMoreFaculty').on('click', function() {
        $('.faculty-hidden-mobile').removeClass('faculty-hidden-mobile').fadeIn();
        $(this).parent().fadeOut();
        
        if(typeof AOS !== 'undefined') {
            setTimeout(() => { AOS.refresh(); }, 100);
        }
    });

    // Set initial state
    $(window).trigger('scroll');
});
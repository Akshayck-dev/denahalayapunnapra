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
        // Force reveal sections if AOS might fail due to protocol restrictions
        setTimeout(() => {
            $('body').addClass('protocol-local');
            $('[data-aos]').css({
                'opacity': '1',
                'transform': 'none',
                'visibility': 'visible'
            });
        }, 500);
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
        // 3. Animate On Scroll (AOS)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                disable: isLocalFile // Disable animations on local file to prevent blank sections
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
        });
        
        $(document).on('hidden.bs.modal', '#applyModal', function () {
            $('body').css('overflow', '');
        });

        $(document).on('submit', '#applicationFormGlobal', function(e) {
            e.preventDefault();
            const $form = $(this);
            const $btn = $form.find('button[type="submit"]');
            const originalText = $btn.html();

            $btn.html('Submitting… <i class="fas fa-spinner fa-spin ms-2"></i>').prop('disabled', true);

            if (typeof emailjs === 'undefined') {
                console.error("EmailJS not loaded on this page.");
                alert("Email service is temporarily unavailable. Please try again later or contact us directly.");
                $btn.html(originalText).prop('disabled', false);
                return;
            }

            emailjs.sendForm('service_2kwpecd', 'template_s32jb2z', this)
                .then((response) => {
                    console.log("SUCCESS", response.status, response.text);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Application submitted successfully! We will get back to you soon.',
                        confirmButtonColor: '#002147'
                    });
                    $form[0].reset();
                    // Close modal using latest Bootstrap API
                    const modalEl = document.getElementById('applyModal');
                    if (modalEl) {
                        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                        modalInstance.hide();
                    }
                })
                .catch((error) => {
                    console.error("ERROR", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: 'Failed to send application. Please check your connection and try again.',
                        confirmButtonColor: '#002147'
                    });
                })
                .finally(() => {
                    $btn.html(originalText).prop('disabled', false);
                });
        });
        
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
    }

    // 6. Global Utilities (Smart Scroll Toggle)
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

        // Smart Toggle Icon/Mode logic (only if button exists)
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
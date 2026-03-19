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

        // 6. Global Application Form Submission
        if (typeof emailjs !== 'undefined') {
            emailjs.init("RmgrNAAYbmB8BvIJ2");
        }

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
                    // Close modal
                    const modalEl = document.getElementById('applyModal');
                    if (modalEl) {
                        const modal = bootstrap.Modal.getInstance(modalEl);
                        if (modal) modal.hide();
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
    }

    // 6. Global Utilities
    $('.backToTop').click(function() {
        if ($(this).hasClass('down')) {
            $('html, body').animate({ scrollTop: $(document).height() }, 1000);
        } else {
            $('html, body').animate({ scrollTop: 0 }, 800);
        }
        return false;
    });

    $(window).scroll(function() {
        // Sticky Navbar
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }

        // Toggle Scroll Button (Up/Down)
        if ($(this).scrollTop() > 400) {
            $('.backToTop').removeClass('down');
        } else {
            $('.backToTop').addClass('down');
        }
    });

    // Set initial state
    $(window).trigger('scroll');
});
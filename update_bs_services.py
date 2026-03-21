import re

html_content = """<div class="row g-4 justify-content-center">
    <!-- Program 1 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #d4af37, #b8860b); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-graduation-cap"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">ONE-YEAR DIPLOMA</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Formators' Diploma</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Jun 2026 &ndash; Mar 2027
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                Formative Course (One-Year Diploma Course in Formative Spirituality & Pastoral Counselling).
            </p>
            <button onclick="openCourse('diploma_counselling')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 2 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #0d6efd, #0b5ed7); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-university"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">TWO-YEAR MASTER'S</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Clinical Psychology</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Jun 2026 &ndash; Mar 2028
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                Two-Year master's Programme in Clinical Psychology and Pastoral Counselling (IGNOU).
            </p>
            <button onclick="openCourse('master_psyc')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 3 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #198754, #157347); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-heart-pulse"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">ONE-YEAR DIPLOMA</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Psycho-Spiritual Integration</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Jun 2026 &ndash; Mar 2027
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                One-Year Diploma Course in Psycho-Spiritual Integration for Junior Religious Sisters.
            </p>
            <button onclick="openCourse('junior_sisters')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 4 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #0d6efd, #0b5ed7); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-sync-alt"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">ONE-YEAR INTENSIVE</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Personal Renewal</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Jun 2026 &ndash; Mar 2027
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                One-year intensive programme for personal transformation through holistic Christian anthropology.
            </p>
            <button onclick="openCourse('renewal')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 5 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #d4af37, #b8860b); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-file-medical-alt"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">CERTIFICATE COURSE</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Motivational Assessment</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Jun &ndash; Sep 2026
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                Specialization in psychological assessment of candidates for religious life and spiritual growth.
            </p>
            <button onclick="openCourse('certificate')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 6 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #0d6efd, #0b5ed7); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-hands-helping"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">ONGOING FORMATION</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Socio-Pastoral Leadership</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Ongoing
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                Empowering leaders for effective pastoral ministry and social transformation.
            </p>
            <button onclick="openCourse('leadership')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 7 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="0">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #198754, #157347); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-users"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">SHORT COURSE</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Community Building</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> Flexible Dates
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                Techniques and spirituality for fostering healthy religious and parish communities.
            </p>
            <button onclick="openCourse('community')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>

    <!-- Program 8 -->
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
        <div class="card h-100 border-0 text-center p-4" style="background: rgba(244, 245, 247, 0.95); backdrop-filter: blur(10px); border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'">
            <div class="d-flex justify-content-center mb-4 mt-2">
                <div class="text-white d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 20px; font-size: 32px; background: linear-gradient(135deg, #d4af37, #b8860b); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fas fa-pray"></i>
                </div>
            </div>
            <span class="d-block mb-3 fw-bold text-uppercase" style="color: #d4af37; font-size: 0.75rem; letter-spacing: 1.5px;">RETREAT MODULE</span>
            <h3 class="card-title fw-bold mb-3" style="font-family: 'Playfair Display', serif; color: #0b2c4d; font-size: 26px; line-height: 1.3;">Guided Ignatian Retreats</h3>
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4" style="color: #6c757d; font-size: 0.85rem; font-weight: 600;">
                <i class="far fa-calendar-alt"></i> By Request
            </div>
            <p class="card-text text-start flex-grow-1 px-2" style="color: #495057; font-size: 0.95rem; line-height: 1.6; margin-bottom: 35px;">
                8-day and 30-day guided retreats based on the Spiritual Exercises of St. Ignatius.
            </p>
            <button onclick="openCourse('retreat')" class="btn w-100 fw-bold text-uppercase rounded-pill border-0" style="background: linear-gradient(135deg, #f4c542, #e6bc42); color: #0b2c4d; font-size: 0.85rem; letter-spacing: 1px; padding: 15px 20px; box-shadow: 0 5px 15px rgba(244, 197, 66, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(244, 197, 66, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(244, 197, 66, 0.3)'">
                READ MORE <i class="fas fa-chevron-right ms-1" style="font-size: 10px;"></i>
            </button>
        </div>
    </div>
</div>"""

try:
    with open('services.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the generic wrapper to replace
    start_tag = '<div class="services-grid-premium">'
    if start_tag not in html:
        start_tag = '<div class="programs-grid-premium">' # Fallback if it wasn't replaced yet
    
    end_tag = '</section>'
    
    start_idx = html.find(start_tag)
    end_idx = html.find(end_tag, start_idx)
    
    if start_idx != -1 and end_idx != -1:
        # Before the wrapper, there might be a <div class="container">. We keep that by replacing string exactly
        new_html = html[:start_idx] + html_content + "\n            </div>\n        " + html[end_idx:]
        
        # Remove the custom reveal script since we are using AOS now
        script_pattern = r'// Course Reveal Animation - Robust Implementation.*?(</script>)'
        new_html = re.sub(script_pattern, r'\1', new_html, flags=re.DOTALL)
        
        with open('services.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("BOOTSTRAP GRID SUCCESS")
    else:
        print("COULD NOT FIND TAGS")

except Exception as e:
    print(f"Error: {e}")

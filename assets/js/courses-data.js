/**
 * Denahalaya Institute - Course Database
 * Centralized content for dynamic modals
 */

const COURSE_DATA = {
    diploma_counselling: {
        title: "One-Year Diploma in Formative Spirituality & Pastoral Counselling",
        tagline: "Specifically for Formators, Superiors & Spiritual Directors",
        duration: "15 June 2026 – 31 March 2027",
        content: `
            <p>This is a postgraduate diploma course of one academic year. It is mainly intended for those who are involved in the ministry of formation and leadership. The course attempts at providing an interdisciplinary-integrated-Christian anthropology.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Core Modules</h5>
            <ul>
                <li>Anthropology of Christian Vocation</li>
                <li>Personal Accompaniment (Vocation Growth Sessions – VGS)</li>
                <li>School Counselling: One-month intensive training</li>
                <li>Developmental and Social Psychology</li>
                <li>Philosophy and Theology of Religious Life</li>
                <li>Psycho-Sexual Integration & Group Dynamics</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 20</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 45 preferred</p>
            </div>
        `
    },
    master_psyc: {
        title: "Two-Year Master's Programme in Clinical Psychology (IGNOU)",
        tagline: "Integrated with Formators' Course",
        duration: "15 June 2026 – 31 March 2028",
        content: `
            <p>This programme is intended for those who already have a basic degree and want to acquire a Master's degree in Psychology from IGNOU, while undergoing the Formators’ course at Denahalaya.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Key Features</h5>
            <ul>
                <li>Integrated IGNOU M.A. Psychology Curriculum</li>
                <li>Specialized focus on Clinical Psychology</li>
                <li>Theology – Psychology Integration sessions</li>
                <li>Intensive Clinical Internship & Supervision</li>
                <li>Vocation Growth Sessions (VGS)</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 15</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 45</p>
            </div>
        `
    },
    junior_sisters: {
        title: "One-Year Diploma in Psycho-Spiritual Integration",
        tagline: "Exclusively for Junior Sisters",
        duration: "15 June 2026 – 31 March 2027",
        content: `
            <p>This programme is specifically designed to accompany the junior religious sisters in their vocational journey through psycho-spiritual integration courses.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Programme Highlights</h5>
            <ul>
                <li>Intensive Vocation Growth Sessions (VGS)</li>
                <li>Personal Healing and Growth Workshops</li>
                <li>Basic Counselling Skills training</li>
                <li>Understanding Attachment and Relationship Patterns</li>
                <li>Christian Spirituality and Modern Psychology</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 10</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 50</p>
            </div>
        `
    },
    renewal: {
        title: "One-Year Diploma in Psycho-Spiritual Renewal",
        tagline: "For Personal Growth and Transformation",
        duration: "15 June 2026 – 31 March 2027",
        content: `
            <p>This is an intensive one-year programme mainly intended for personal renewal through an interdisciplinary-integrated-Christian anthropology.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Core Areas</h5>
            <ul>
                <li>Neuro-Linguistic Programming (NLP)</li>
                <li>Active Memory Regeneration (AMR)</li>
                <li>Gestalt Therapy and Enneagram</li>
                <li>Interdisciplinary Anthropology</li>
                <li>Clinical Supervision and Practicum</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 10</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 45</p>
            </div>
        `
    },
    certificate: {
        title: "Three-Month Certificate Programme in Motivational Assessment",
        tagline: "Advanced Specialization for Religious Sisters",
        duration: "15 June – 15 September 2026",
        content: `
            <p>This course is designed exclusively for religious sisters who have already undergone some training in the field and want to specialize in the psychological assessment of candidates.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Specialization Topics</h5>
            <ul>
                <li>Structural-Dynamics of Vocation-Motivation</li>
                <li>Advanced Psychopathology and Diagnostics</li>
                <li>Transactional Analysis (TA) & CBT</li>
                <li>Administration and interpretation of psychological tests</li>
                <li>Practical Assessment Training</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 10</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 50</p>
            </div>
        `
    },
    short_course: {
        title: "Three-Week Short Course for Formators",
        tagline: "Intensive Psychological Skills for Vocation Guardians",
        duration: "April 29 – May 19, 2026",
        content: `
            <p>This three-week course is specially designed for formators. It attempts at dealing with internal psychological blocks that can affect a candidate's motivation.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Session Topics</h5>
            <ul>
                <li>Models of Formation & Anthropology of Vocation</li>
                <li>Psychopathology and Personality Styles</li>
                <li>Relationship Patterns and Attachment Issues</li>
                <li>Diagnostic Tests and Basic Counselling Skills</li>
                <li>Spiritual Direction & Community Dynamics</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 30</p>
                <p><strong><i class="fas fa-infinity me-2"></i>No Age Limit</strong></p>
            </div>
        `
    },
    msc: {
        title: "M.Sc. in Counselling Psychology + Psycho-Spiritual Integration",
        tagline: "Two-Year Integrated Degree Programme",
        duration: "15 June 2026 – 30 June 2028",
        content: `
            <p>Designed for religious sisters to accompany them in their vocational journey through psycho-spiritual integration courses, while earning a regular M.Sc. at Mar Gregorios College, Punnapra.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Integrated Features</h5>
            <ul>
                <li>Intensive VGS Accompaniment</li>
                <li>Psycho-Sexual Integration Programme</li>
                <li>Psychotherapy Practicum (150 hours)</li>
                <li>Clinical Supervision (30 hours)</li>
                <li>Regular M.Sc. Psychology Classes</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 3</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 40</p>
            </div>
        `
    },
    bsc: {
        title: "Three/Four-Year B.Sc. in Psychology + Psycho-Spiritual Integration",
        tagline: "Junior Sisters Integrated Degree",
        duration: "15 June 2026 – 30 June 2029",
        content: `
            <p>This programme is designed to accompany junior religious sisters in their vocational journey through structured psycho-spiritual integration courses, while pursuing a regular B.Sc. from University of Kerala.</p>
            
            <h5 class="mt-4"><i class="fas fa-list-ul me-2 text-success"></i>Core Components</h5>
            <ul>
                <li>University of Kerala B.Sc. Curriculum</li>
                <li>Ongoing Psycho-Spiritual Accompaniment</li>
                <li>Personal Awareness and Growth Modules</li>
                <li>Basic Psychological Foundation</li>
                <li>Vocation Growth Sessions</li>
            </ul>

            <div class="modal-info-box mt-4">
                <p><strong><i class="fas fa-users me-2"></i>Total Seats:</strong> 5</p>
                <p><strong><i class="fas fa-user-clock me-2"></i>Age Limit:</strong> Under 35</p>
            </div>
        `
    }
};

window.COURSE_DATA = COURSE_DATA;

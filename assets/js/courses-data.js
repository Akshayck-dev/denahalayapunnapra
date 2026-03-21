/**
 * Denahalaya Institute - Course Database
 * Centralized content for dynamic modals
 */

const COURSE_DATA = {
    diploma_counselling: {
        title: "Diploma in Formative Spirituality & Pastoral Counselling",
        tagline: "One-Year Diploma Course",
        duration: "Jun 2026 – Mar 2027",
        seats: "20",
        age: "< 45",
        highlights: [
            "Christian Vocation Anthropology",
            "Personal Accompaniment",
            "School Counselling Training"
        ],
        content: `
            <p>This is a one-year full-time residential course for priests and religious. It aims at developing a holistic vision of the person, integrating the insights of psychology and Christian anthropology.</p>
            <ul>
                <li>Self-awareness and Personal growth</li>
                <li>Basic Counselling Skills</li>
                <li>Human Development & Psycho-Pathology</li>
                <li>Anthropology of Christian Vocation</li>
                <li>Sexuality and Celibacy</li>
                <li>Spiritual Direction</li>
                <li>Supervised Practicum</li>
            </ul>
        `
    },
    master_psyc: {
        title: "M.A. in Clinical Psychology + Formators' Course",
        tagline: "Two-Year Master's Programme",
        duration: "Jun 2026 – Mar 2028",
        seats: "15",
        age: "< 45",
        highlights: [
            "IGNOU M.A. Curriculum",
            "Theology & Psychology",
            "Clinical Internship"
        ],
        content: `
            <p>This course integrates the IGNOU M.A. Psychology syllabus with the specialized Formators’ training of Denahalaya. It is designed for those who wish to have a professional degree in Psychology along with formative skills.</p>
            <ul>
                <li>Cognitive Psychology, Learning and Memory</li>
                <li>Lifespan Psychology</li>
                <li>Personality: Theories and Assessment</li>
                <li>Advanced Social Psychology</li>
                <li>Psychopathology</li>
                <li>Research Methods and Statistics</li>
                <li>Clinical Internship & Field Work</li>
            </ul>
        `
    },
    junior_sisters: {
        title: "Psycho-Spiritual Integration for Junior Sisters",
        tagline: "One-Year Residential Course",
        duration: "Jun 2026 – Mar 2027",
        seats: "10",
        age: "< 50",
        highlights: [
            "Vocation Growth Sessions",
            "Personal Healing Workshops",
            "Basic Counselling Skills"
        ],
        content: `
            <p>This course is specifically designed for junior religious sisters to help them integrate their psycho-spiritual lives and grow in their religious vocation.</p>
            <ul>
                <li>Foundations of Religious Life</li>
                <li>Inner Child Healing</li>
                <li>Emotional Intelligence</li>
                <li>Inter-personal Relationships</li>
                <li>Community Living Dynamics</li>
                <li>Prayer and Discernment</li>
            </ul>
        `
    },
    renewal: {
        title: "Psycho-Spiritual Renewal Course",
        tagline: "One-Year Intensive Programme",
        duration: "Jun 2026 – Mar 2027",
        seats: "10",
        age: "< 45",
        highlights: [
            "NLP, AMR, Gestalt Therapy",
            "Interdisciplinary Anthropology",
            "Clinical Supervision"
        ],
        content: `
            <p>An intensive programme for personal renewal and professional growth. It uses various therapeutic tools to help participants deal with their own blocks and become effective accompaniers.</p>
            <ul>
                <li>NLP and Gestalt Therapy</li>
                <li>Healing of Memories</li>
                <li>Addiction Counselling</li>
                <li>Crisis Intervention</li>
                <li>Family Systems</li>
                <li>Grief Work</li>
            </ul>
        `
    },
    certificate: {
        title: "Certificate in Vocational-Motivational Assessment",
        tagline: "Three-Month Specialization",
        duration: "Jun 2026 – Sep 2026",
        seats: "10",
        age: "< 50",
        highlights: [
            "Psychopathology Fundamentals",
            "Transactional Analysis",
            "Advanced Specialization"
        ],
        content: `
            <p>This course trains formators in the psychological assessment of candidates for priesthood and religious life. It focuses on identifying vocational suitability and motivational patterns.</p>
            <ul>
                <li>Principles of Psychological Assessment</li>
                <li>Diagnostic Tools and Tests</li>
                <li>Interview Techniques</li>
                <li>Report Writing</li>
                <li>Ethics in Assessment</li>
            </ul>
        `
    },
    short_course: {
        title: "Short Course for Formators",
        tagline: "Three-Week Intensive",
        duration: "Apr 29 – May 19, 2026",
        seats: "30",
        age: "No Limit",
        highlights: [
            "Models of Formation",
            "Attachment Patterns",
            "Spiritual Direction"
        ],
        content: `
            <p>This is a three-week course specially designed for formators. It attempts at dealing with the question of how freedom to respond responsibly to one’s vocation is hampered by certain internal psychological blocks that can affect their motivation.</p>
            <ul>
                <li>Models of Formation, Anthropology of Christian Vocation</li>
                <li>Psychopathology, Personality Styles</li>
                <li>Relationship Patterns, Attachment Issues Among the Candidates</li>
                <li>Diagnostic Tests, Counselling Skills</li>
                <li>Spiritual Direction & Psychotherapy</li>
                <li>Community Dynamics</li>
            </ul>
        `
    },
    bsc: {
        title: "B.Sc. Psychology + Psycho-Spiritual Course",
        tagline: "Integrated Degree Programme",
        duration: "Jun 2026 – Jun 2029",
        seats: "5",
        age: "< 35",
        highlights: [
            "Univ of Kerala Curriculum",
            "Intensive Accompaniment",
            "Psycho-Sexual Integration"
        ],
        content: `
            <p>A unique program where students pursue a regular B.Sc. in Psychology from Mar Gregorios College (University of Kerala) while staying at Denahalaya for psycho-spiritual accompaniment.</p>
            <ul>
                <li>University Curriculum Mastery</li>
                <li>Character Formation</li>
                <li>Study and Research Skills</li>
                <li>Social and Emotional Learning</li>
                <li>Spiritual Foundation</li>
            </ul>
        `
    },
    msc: {
        title: "M.Sc. in Counselling Psychology",
        tagline: "Two-Year Integrated Degree",
        duration: "Jun 2026 – Jun 2028",
        seats: "3",
        age: "< 40",
        highlights: [
            "Psychotherapy Practicum",
            "Clinical Supervision",
            "Regular M.Sc. Classes"
        ],
        content: `
            <p>This program combines a regular Master's degree in Counselling Psychology with Denahalaya's expert supervision and spiritual integration. Students attend classes at Mar Gregorios College.</p>
            <ul>
                <li>Advanced Counselling Theories</li>
                <li>Neuro-Psychology</li>
                <li>Family and Marital Therapy</li>
                <li>Child and Adolescent Psychology</li>
                <li>Hospital Postings and Clinical Exposure</li>
                <li>Thesis and Research</li>
            </ul>
        `
    }
};

window.COURSE_DATA = COURSE_DATA;

/**
 * Denahalaya Institute - Course Database
 * Centralized content for dynamic modals
 */

const COURSE_DATA = {
    diploma_counselling: {
        title: "One-Year Diploma in Formative Spirituality & Pastoral Counselling",
        tagline: "Formators' Diploma",
        duration: "15 June 2026 to 15 March 2027",
        seats: "20 (15 Religious Sisters and 5 Priests)",
        age: "Under 45",
        highlights: [
            "Anthropology of Christian Vocation",
            "Intensive Personal Accompaniment",
            "NLP, AMR, Gestalt, REBT, Psychodynamic",
            "School Counselling & Clinical Internship"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>Formators, Superiors, Spiritual Directors, or those in/aspiring to Pastoral Ministry.</p>
            
            <h5 class="text-navy mb-3">Purpose</h5>
            <p>Developing skills for assessing and accompanying future candidates to priesthood and religious life.</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Anthropology of Christian Vocation and Intensive Personal Accompaniment.</li>
                <li>Psychotherapies (NLP, AMR, Gestalt, REBT, Psychodynamic Therapy).</li>
                <li>Various Psycho-Spiritual and Theological courses.</li>
                <li>Special Training in School Counselling and Clinical Internship with Guided Supervision.</li>
            </ul>
        `
    },
    master_psyc: {
        title: "Two-Year Master's Programme in Clinical Psychology (IGNOU)",
        tagline: "M.A. Clinical Psychology + Diploma",
        duration: "15 June 2026 to 30 March 2028",
        seats: "15 (10 Religious Sisters and 5 Priests)",
        age: "Under 45",
        highlights: [
            "Nationally Recognized Degree",
            "Christian Anthropological Perspective",
            "Intensive Personal Accompaniment",
            "Clinical Internship & Special Training"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>Formators, Superiors, Teachers, Counsellors, and Therapists.</p>

            <h5 class="text-navy mb-3">Details</h5>
            <p>Students register for M.A. Psychology (specialization Clinical) with IGNOU for a nationally recognized degree while taking the Denahalaya Diploma.</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Integrated vision of clinical psychology from a Christian anthropological perspective.</li>
                <li>Anthropology of Christian Vocation and Intensive Personal Accompaniment.</li>
                <li>Psychotherapies (NLP, AMR, Gestalt, REBT, Psychodynamic Therapy etc.).</li>
                <li>Clinical Internship, Guided Supervision, and Special Training in School Counselling.</li>
            </ul>
        `
    },
    junior_sisters: {
        title: "One-Year Diploma in Psycho-Spiritual Integration (Junior Sisters)",
        tagline: "For Junior Religious Sisters",
        duration: "15 June 2026 to 15 March 2027",
        seats: "10",
        age: "N/A",
        highlights: [
            "Vocational Journey Accompaniment",
            "Vocation Growth Sessions (VGS)",
            "Personal Healing Workshops",
            "Psycho-Sexual Integration"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>Designed for junior religious sisters to accompany them in their vocational journey.</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Intensive Psycho-Spiritual Accompaniment and Vocation Growth Sessions (VGS).</li>
                <li>Workshops for Personal Healing including inner child therapy, intensive journaling, and transactional analysis.</li>
                <li>Basic Psychological Courses, Counselling Skills, and Psychopathology.</li>
                <li>Psycho-Sexual Integration Programme.</li>
                <li>Psychotherapy practicum and clinical supervision.</li>
            </ul>
        `
    },
    renewal: {
        title: "One-Year Diploma in Psycho-Spiritual Renewal",
        tagline: "Intensive Renewal Programme",
        duration: "15 June 2026 to 15 March 2027",
        seats: "10",
        age: "Under 45",
        highlights: [
            "Intensive Accompaniment (VGS)",
            "Interdisciplinary Anthropology",
            "Advanced Psychotherapies",
            "Clinical Supervision"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>For religious sisters and priests.</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Intensive Psycho-Spiritual Accompaniment and Vocation Growth Sessions (VGS).</li>
                <li>Anthropology of Christian Vocation (interdisciplinary).</li>
                <li>Psychotherapies including NLP, AMR, Gestalt, REBT, and Psychodynamic Therapy.</li>
                <li>Various psycho-spiritual and theological courses.</li>
                <li>Psychotherapy practicum and clinical supervision.</li>
            </ul>
        `
    },
    certificate: {
        title: "Three-Month Certificate Programme in Motivational & Psychological Assessment",
        tagline: "Formators & Superiors Specialization",
        duration: "15 June 2026 to 15 September 2026",
        seats: "10",
        age: "Under 50",
        highlights: [
            "Gregorian University Methodology",
            "Psychodynamic Interview Techniques",
            "Attachment Issue Insights",
            "Motivational suitability assessment"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>For religious sisters only; specifically designed for formators and superiors.</p>

            <h5 class="text-navy mb-3">Purpose</h5>
            <p>To enable assessment of candidates' motivations for religious life and priesthood through psychometric tests.</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Follows the assessment methodology of the Institute of Psychology, Pontifical Gregorian University, Rome.</li>
                <li>Models of Formation and Anthropology of Christian Vocation.</li>
                <li>Attachment Issues Among the Candidates and in-depth interviews based on a psychodynamic approach.</li>
                <li>Psychopathology, Transaction Analysis, and Counselling Techniques.</li>
            </ul>
        `
    },
    short_course: {
        title: "Three-Week Short Course for Formators",
        tagline: "Short Intensive Training",
        duration: "April 29 – May 19, 2026",
        seats: "30",
        age: "No Limit",
        highlights: [
            "Address Internal Psychological Blocks",
            "Growth-oriented Helping Techniques",
            "Relationship Patterns & Attachment",
            "Community Dynamics Study"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>Specially designed for formators.</p>

            <h5 class="text-navy mb-3">Purpose</h5>
            <p>To deal with internal psychological blocks affecting the freedom to respond to one's vocation.</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Healing and growth-oriented helping techniques like counselling and spiritual direction.</li>
                <li>Models of Formation, Anthropology of Christian Vocation, and Psychopathology.</li>
                <li>Personality Styles, Relationship Patterns, and Attachment Issues.</li>
                <li>Diagnostic Tests, Counselling Skills, and Community Dynamics.</li>
                <li>Spiritual Direction and Psychotherapy.</li>
            </ul>
        `
    },
    bsc: {
        title: "B.Sc. Psychology Plus Psycho-Spiritual Integration",
        tagline: "Integrated B.Sc. Programme",
        duration: "15 June 2026 to 30 June 2029",
        seats: "5",
        age: "Under 35",
        highlights: [
            "Regular Univ. of Kerala Students",
            "Parallel formation at Denahalaya",
            "VGS and Character Formation",
            "Psycho-Sexual Integration"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>Designed for junior religious sisters only.</p>

            <h5 class="text-navy mb-3">Details</h5>
            <p>Enrolled as regular students at Mar Gregorios College, Punnapra (affiliated with the University of Kerala), while undergoing formation at Denahalaya.</p>

            <h5 class="text-navy mb-3">Eligibility</h5>
            <p>Plus Two/50% (VHSE, CBSE, ICSE/HSE).</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Regular B.Sc. Psychology classes.</li>
                <li>Anthropology of Christian Vocation and Vocation Growth Sessions (VGS).</li>
                <li>Psycho-Sexual Integration Programme.</li>
            </ul>
        `
    },
    msc: {
        title: "M.Sc. Counselling Psychology Plus Psycho-Spiritual Integration",
        tagline: "Integrated Master's Programme",
        duration: "15 June 2026 to 30 June 2028",
        seats: "3",
        age: "Under 40",
        highlights: [
            "Mar Gregorios College Enrollment",
            "Intensive Accompaniment (VGS)",
            "Psycho-Sexual Integration",
            "Clinical Internship & Supervision"
        ],
        content: `
            <h5 class="text-navy mb-3">Target Audience</h5>
            <p>Designed for religious sisters only.</p>

            <h5 class="text-navy mb-3">Details</h5>
            <p>Enrolled as regular students at Mar Gregorios College while undergoing formation at Denahalaya.</p>

            <h5 class="text-navy mb-3">Eligibility</h5>
            <p>Bachelor's degree in Psychology (min 60%) or related subjects like child development, statistics, etc..</p>

            <h5 class="text-navy mb-3">Course Components</h5>
            <ul>
                <li>Regular M.Sc. Psychology classes.</li>
                <li>Intensive Psycho-Spiritual Accompaniment (VGS).</li>
                <li>Psycho-Sexual Integration Programme.</li>
                <li>Psychotherapy practicum and clinical supervision.</li>
            </ul>
        `
    }
};

window.COURSE_DATA = COURSE_DATA;

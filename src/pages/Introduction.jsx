import "./Introduction.css";

export default function Introduction() {
  return (
    <div className="page-container introduction-page">
      <h1 className="page-title">📘 Introduction</h1>

      {/* ===== OVERVIEW ===== */}
      <section className="intro-section">
        <p>
          In recent years, <b>Massive Open Online Courses (MOOCs)</b> have grown
          rapidly, with tens of thousands of courses provided by platforms such
          as <b>XueTangX</b>, <b>Coursera</b>, and <b>edX</b>. While these
          platforms significantly expand access to education, they also create
          substantial challenges for educational institutions and instructors
          in <b>evaluating, comparing, and improving course quality</b>
          effectively.
        </p>

        <p>
          The lack of comprehensive analytical tools and early-stage evaluation
          mechanisms often delays course optimization, negatively impacting
          learner engagement, completion rates, and overall satisfaction.
        </p>
      </section>

      {/* ===== NECESSITY ===== */}
      <section className="intro-section highlight-section">
        <h2 className="section-title">🔥 Necessity of the Study</h2>

        <ul className="intro-list">
          <li>
            The rapid expansion of MOOCs platforms (e.g., XueTangX, Coursera,
            edX) has resulted in a large number of courses with{" "}
            <b>uneven quality</b>, making it difficult for institutions and
            instructors to monitor and improve teaching effectiveness.
          </li>

          <li>
            Traditional evaluation methods such as surveys and interviews are{" "}
            <b>time-consuming, costly, and difficult to scale</b>, and often
            reflect course quality only after the course has ended.
          </li>

          <li>
            The absence of data-driven analytics and early prediction tools
            prevents timely intervention, leading to reduced completion rates
            and learner satisfaction.
          </li>

          <li>
            Therefore, building an <b>automated, early-stage, and data-driven
            course quality evaluation system</b> has become an urgent
            requirement in modern online education.
          </li>
        </ul>
      </section>

      {/* ===== PROBLEM STATEMENT ===== */}
      <section className="intro-section">
        <h2 className="section-title">🎯 Problem Statement</h2>

        <p>
          The key challenge addressed in this work is the ability to{" "}
          <b>predict course quality as early as possible</b> using
          multi-dimensional behavioral and feedback data, enabling educational
          stakeholders to proactively adjust course content and instructional
          strategies.
        </p>
      </section>

      {/* ===== NOVELTY ===== */}
      <section className="intro-section highlight-section">
        <h2 className="section-title">✨ Novelty of the Approach</h2>

        <ul className="intro-list">
          <li>
            We propose a framework for <b>early-stage course quality prediction</b>,
            rather than post-hoc evaluation after course completion, as commonly
            adopted in previous studies.
          </li>

          <li>
            The approach integrates <b>multi-dimensional features</b>, including
            engagement behavior, sentiment analysis, learning progress, and
            instructor-related signals.
          </li>

          <li>
            Advanced models such as <b>XGBoost</b> and <b>BiLSTM</b> are employed,
            with model decisions explained using <b>SHAP</b> and <b>LIME</b>,
            ensuring transparency and interpretability.
          </li>
        </ul>
      </section>

      {/* ===== SYSTEM ===== */}
      <section className="intro-section">
        <h2 className="section-title">🖥️ System Implementation</h2>

        <p>
          The proposed system is implemented as an interactive web-based
          platform built on <b>ExpressJS</b>, <b>ReactJS</b>, and <b>MongoDB</b>.
          It supports data upload, visualization, course comparison, early risk
          detection, and cloud deployment for scalability.
        </p>
      </section>

      {/* ===== OBJECTIVE ===== */}
      <section className="intro-section">
        <h2 className="section-title">🚀 Research Objective</h2>

        <p>
          The ultimate goal is to provide educational institutions with a{" "}
          <b>scalable, interpretable, and practical solution</b> for monitoring
          and improving course quality, thereby enhancing learner experience
          and learning outcomes.
        </p>
      </section>
    </div>
  );
}

import { Download, Github, Mail } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { education, experience, profile, projects } from "@/content/profile";

export const metadata = {
  title: "Recruiter View | Aditya Choubey",
  description: "Fast professional summary, projects, experience, education and contact details for Aditya Choubey.",
};

export default function RecruiterPage() {
  const topProjects = projects.slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="route-shell recruiter-page">
        <section className="recruiter-hero">
          <span className="eyebrow">Recruiter view</span>
          <h1>Aditya Choubey</h1>
          <p>
            Electrical & Electronics Engineering student building practical software, AI automation workflows and
            industrial technology interfaces.
          </p>
          <div className="recruiter-actions">
            <a href={profile.resume.href} download="Aditya-Choubey-Resume.pdf">
              <Download size={16} />
              Download resume
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={16} />
              Email
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} />
              GitHub
            </a>
          </div>
        </section>

        <section className="recruiter-grid">
          <article>
            <h2>Strongest Skills</h2>
            <ul>
              <li>Python, JavaScript, HTML, CSS and SQL/DBMS fundamentals</li>
              <li>AI productivity, prompt engineering and automation thinking</li>
              <li>n8n workflow automation and data-routing concepts</li>
              <li>Industrial monitoring concepts, RS485 awareness and hardware/software integration</li>
            </ul>
          </article>
          <article>
            <h2>Education</h2>
            <p>{education.degree}</p>
            <p>{education.institute}</p>
            <p>{education.status}, {education.graduation}</p>
          </article>
          <article className="recruiter-wide">
            <h2>Top Projects</h2>
            <div className="recruiter-projects">
              {topProjects.map((project) => (
                <a key={project.slug} href={`/work/${project.slug}`}>
                  <span>{project.number}</span>
                  <strong>{project.title}</strong>
                  <p>{project.summary}</p>
                </a>
              ))}
            </div>
          </article>
          <article className="recruiter-wide">
            <h2>Employment History</h2>
            <div className="compact-timeline">
              {experience.map((item) => (
                <div key={item.company}>
                  <span>{item.duration}</span>
                  <strong>{item.company}</strong>
                  <p>{item.focus}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

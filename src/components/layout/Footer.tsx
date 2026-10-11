import { Github, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-mark">AC</div>
      <div>
        <p>Aditya Choubey</p>
        <span>Software, AI automation and connected industrial systems.</span>
      </div>
      <div className="footer-links" aria-label="Footer contact links">
        <a href={`mailto:${profile.email}`} aria-label="Email Aditya">
          <Mail size={16} />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub">
          <Github size={16} />
        </a>
        <a href={`tel:${profile.phone.replace(/\s/g, "")}`} aria-label="Call Aditya">
          <Phone size={16} />
        </a>
        <span aria-label={profile.location}>
          <MapPin size={16} />
        </span>
      </div>
      <small>© 2026 Aditya Choubey. Built as a living portfolio system.</small>
    </footer>
  );
}

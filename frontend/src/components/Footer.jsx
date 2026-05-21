const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm">
            © 2026 EduFlow University System. Built with <span className="text-white">Spring Boot 4</span> & <span className="text-white">React Vite</span>.
          </div>
          <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
            <span className="hover:text-white transition">JWT Security</span>
            <span className="hover:text-white transition">Tailwind CSS</span>
            <span className="hover:text-white transition">JPA Hibernate</span>
          </div>
        </div>
      </footer>
    );
}
export default Footer;
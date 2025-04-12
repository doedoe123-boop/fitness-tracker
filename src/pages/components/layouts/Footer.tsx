function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-slate-900 text-slate-400">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="font-medium">&copy; {currentYear} Fitness Tracker. All rights reserved.</p>
          </div>
          <div className="text-sm md:text-right">
            <p className="mb-2">
              Disclaimer: This website is a personal project and is not affiliated with or endorsed by 
              any official entities. It is intended for educational and demonstration purposes only.
            </p>
            <p>
              Built with care by <a href="https://github.com" className="text-teal-500 hover:text-teal-400 transition-colors">Fitness Tracker Team</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

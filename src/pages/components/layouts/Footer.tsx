function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-gray-800 text-gray-400 text-center">
      <p>&copy; {currentYear} Fitness Tracker. All rights reserved.</p>
      <p className="mt-2 text-sm">
        Disclaimer: This website is a personal project and is not affiliated with or endorsed by any official entities. It is intended for educational and demonstration purposes only.
      </p>
    </footer>
  );
}

export default Footer;

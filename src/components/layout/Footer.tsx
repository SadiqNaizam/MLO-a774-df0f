import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom
import { Github, Linkedin, Twitter } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">LinkedIn</span><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">GitHub</span><Github className="h-5 w-5" /></a>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {currentYear} LinguaLex. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;
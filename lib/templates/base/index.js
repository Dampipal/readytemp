import { generateIndexHtml } from '../../generators/htmlGenerator.js';
import { getFileExtension } from '../../utils/fileHelpers.js';

export function getBaseTemplate(projectName, language) {
  const ext = getFileExtension(language);
  
  return {
    'public/index.html': generateIndexHtml(projectName),
    [`src/index.${ext}`]: getIndexFile(),
    [`src/App.${ext}`]: getAppFile(language),
    [`src/components/layout/Header.${ext}`]: getHeaderComponent(language),
    [`src/components/layout/Footer.${ext}`]: getFooterComponent(language),
    [`src/pages/Home.${ext}`]: getHomePage(language),
    [`src/pages/About.${ext}`]: getAboutPage(language),
  };
}

function getIndexFile() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`;
}

function getAppFile(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';

const App${ext} = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;`;
}

function getHeaderComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { Link } from 'react-router-dom';

const Header${ext} = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            ReadyTemp App
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;`;
}

function getFooterComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';

const Footer${ext} = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Created with ❤️ using ReadyTemp CLI</p>
      </div>
    </footer>
  );
};

export default Footer;`;
}

function getHomePage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';

const Home${ext} = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your App! 🚀</h1>
      <p className="text-lg">
        This app was created using ReadyTemp CLI. Start editing to begin your journey!
      </p>
    </div>
  );
};

export default Home;`;
}

function getAboutPage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';

const About${ext} = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-lg">
        This is a production-ready React application created with ReadyTemp CLI.
      </p>
    </div>
  );
};

export default About;`;
} 
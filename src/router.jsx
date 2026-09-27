import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ProcessPage from './pages/ProcessPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiePage from './pages/CookiePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,             element: <HomePage /> },
      { path: 'services',        element: <ServicesPage /> },
      { path: 'services/:slug',  element: <ServiceDetailPage /> },
      { path: 'portfolio',       element: <PortfolioPage /> },
      { path: 'portfolio/:slug', element: <ProjectDetailPage /> },
      { path: 'about',           element: <AboutPage /> },
      { path: 'process',         element: <ProcessPage /> },
      { path: 'pricing',         element: <PricingPage /> },
      { path: 'blog',            element: <BlogPage /> },
      { path: 'blog/:slug',      element: <BlogPostPage /> },
      { path: 'contact',         element: <ContactPage /> },
      { path: 'privacy',         element: <PrivacyPage /> },
      { path: 'terms',           element: <TermsPage /> },
      { path: 'cookies',         element: <CookiePage /> },
    ],
  },
]);

import { useState, useEffect, useMemo } from 'react';
import { initialPortfolioData } from './data/defaultPortfolio';
import { PortfolioData, ProjectItem } from './types';
import { loadAllProjects, getCategoriesWithFeatured } from './lib/projectRegistry';
import { useRoute } from './hooks/useRoute';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { FeaturedWork } from './components/FeaturedWork';
import { RecentGallery } from './components/RecentGallery';
import { CategoryLibrary } from './components/CategoryLibrary';
import { CaseStudyPage } from './components/CaseStudyPage';
import { Services } from './components/Services';
import { TechStack } from './components/TechStack';
import { About } from './components/About';
import { Process } from './components/Process';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { EditDrawer } from './components/EditDrawer';

const LOCAL_STORAGE_KEY = 'ai_specialist_portfolio_data_v6';

export default function App() {
  const { route, navigate } = useRoute();

  // Dynamically discovered projects from GitHub projects/[category]/[project]/ folders
  const discoveredProjects = useMemo(() => loadAllProjects(), []);
  const [videoOverrides, setVideoOverrides] = useState<Record<string, string>>({});

  // Merge discovered projects with session video attachments
  const allProjects = useMemo(() => {
    return discoveredProjects.map((p) => ({
      ...p,
      videoUrl: videoOverrides[p.id] || p.videoUrl,
    }));
  }, [discoveredProjects, videoOverrides]);

  // Group by category and resolve the featured project for each category
  const categories = useMemo(() => getCategoriesWithFeatured(allProjects), [allProjects]);

  // Overall site branding and text metadata
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      ['ai_specialist_portfolio_data_v1', 'ai_specialist_portfolio_data_v2', 'ai_specialist_portfolio_data_v3', 'ai_specialist_portfolio_data_v4', 'ai_specialist_portfolio_data_v5'].forEach((k) => {
        localStorage.removeItem(k);
      });
    } catch {
      // ignore
    }

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return initialPortfolioData;
  });

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactScope, setContactScope] = useState<string | undefined>(undefined);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Sync site config to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const handleUpdateData = (updated: PortfolioData) => {
    setData(updated);
  };

  const handleUpdateProjectVideo = (projectId: string, videoUrl: string) => {
    setVideoOverrides((prev) => ({
      ...prev,
      [projectId]: videoUrl,
    }));
  };

  const handleResetData = () => {
    setData(initialPortfolioData);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleOpenContact = (scope?: string) => {
    setContactScope(scope);
    setIsContactOpen(true);
  };

  const handleViewWork = () => {
    if (route.type !== 'home') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdatePortrait = (newUrl: string) => {
    setData((prev) => ({
      ...prev,
      portraitUrl: newUrl,
    }));
  };

  const handleNavigateHome = (sectionHash?: string) => {
    navigate('/');
    if (sectionHash) {
      setTimeout(() => {
        const el = document.querySelector(sectionHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Resolve category and project for subpage routing
  const activeCategory = useMemo(() => {
    if (!route.categorySlug) return categories[0];
    return categories.find((c) => c.slug === route.categorySlug) || categories[0];
  }, [categories, route.categorySlug]);

  const activeProject = useMemo(() => {
    if (!route.projectSlug) return allProjects[0];
    return (
      allProjects.find(
        (p) => p.slug === route.projectSlug && p.categorySlug === route.categorySlug
      ) ||
      allProjects.find((p) => p.slug === route.projectSlug) ||
      allProjects[0]
    );
  }, [allProjects, route.projectSlug, route.categorySlug]);

  return (
    <div className="min-h-screen bg-[#08080A] text-[#E8E8ED] selection:bg-white/20 selection:text-white font-sans antialiased relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Top Navigation */}
      <Navbar
        initials={data.initials}
        name={data.name}
        onOpenContact={() => handleOpenContact()}
        onToggleEdit={() => setIsEditOpen((prev) => !prev)}
        isEditOpen={isEditOpen}
        isSubpage={route.type !== 'home'}
        onNavigateHome={handleNavigateHome}
      />

      {/* Route Views */}
      {route.type === 'category' ? (
        <CategoryLibrary
          currentCategory={activeCategory}
          allCategories={categories}
          onSelectProject={(project) =>
            navigate(project.path || `/projects/${project.categorySlug}/${project.slug}`)
          }
          onNavigateCategory={(catSlug) => navigate(`/projects/${catSlug}`)}
          onBackToHome={() => navigate('/')}
        />
      ) : route.type === 'project' ? (
        <CaseStudyPage
          project={activeProject}
          category={activeCategory}
          onBackToCategory={() => navigate(`/projects/${activeCategory.slug}`)}
          onBackToHome={() => navigate('/')}
          onSelectProject={(p) => navigate(p.path || `/projects/${p.categorySlug}/${p.slug}`)}
          onOpenInquiry={(title) => handleOpenContact(`Workflow based on ${title}`)}
          onUpdateVideo={handleUpdateProjectVideo}
        />
      ) : (
        /* Standard Homepage View */
        <main>
          {/* Hero Section */}
          <Hero
            eyebrow={data.heroEyebrow}
            heading1={data.heroHeadingLine1}
            heading2={data.heroHeadingLine2}
            heading3={data.heroHeadingLine3}
            heading4={data.heroHeadingLine4 || 'SPECIALIST'}
            professionalTitle={data.title}
            supportingText={data.heroSupportingText}
            availabilityText={data.availabilityText}
            portraitUrl={data.portraitUrl}
            onViewWork={handleViewWork}
            onContact={() => handleOpenContact()}
            onUpdatePortrait={handleUpdatePortrait}
          />

          {/* Horizontal Stats Bar */}
          <StatsBar stats={data.stats} />

          {/* Selected Work Showcase */}
          <FeaturedWork
            categories={categories}
            projects={allProjects}
            onSelectProject={(project) =>
              navigate(project.path || `/projects/${project.categorySlug}/${project.slug}`)
            }
          />

          {/* Rapid Visual Scan Gallery */}
          <RecentGallery
            projects={allProjects}
            onSelectProject={(project) =>
              navigate(project.path || `/projects/${project.categorySlug}/${project.slug}`)
            }
            onOpenInquiry={(title) => handleOpenContact(title)}
          />

          {/* Services & Core Capabilities */}
          <Services
            services={data.services}
            onSelectService={(serviceTitle) => handleOpenContact(serviceTitle)}
          />

          {/* Tools & Technologies Stack */}
          <TechStack tools={data.tools} />

          {/* About Section */}
          <About
            name={data.name}
            title={data.title}
            bioHeadline={data.bioHeadline}
            bioParagraph1={data.bioParagraph1}
            bioParagraph2={data.bioParagraph2}
            portraitUrl={data.portraitUrl}
            onOpenContact={() => handleOpenContact('Strategic Advisory')}
          />

          {/* 5-Step Process */}
          <Process steps={data.process} />

          {/* CTA Section */}
          <CtaSection
            onStartProject={() => handleOpenContact()}
            onViewWork={handleViewWork}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        name={data.name}
        title={data.title}
        email={data.email}
        location={data.location}
        socials={data.socials}
      />

      {/* Contact & Project Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultScope={contactScope}
        recipientEmail={data.email}
      />

      {/* Live Customizer / Edit Drawer */}
      <EditDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={data}
        onChange={handleUpdateData}
        onReset={handleResetData}
      />
    </div>
  );
}

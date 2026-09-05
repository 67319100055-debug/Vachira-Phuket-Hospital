/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  PublicNavSection,
  AdminSection,
  DrugItem,
  NewsItem,
  KnowledgeArticle,
  DocumentDownload,
  AdminUser,
  StepInfographic,
  BannerConfig,
} from './types';
import {
  INITIAL_DRUGS,
  INITIAL_STEP_INFOGRAPHICS,
  INITIAL_BANNER,
  INITIAL_NEWS,
  INITIAL_KNOWLEDGE,
  INITIAL_DOCUMENTS,
  INITIAL_USERS,
  INITIAL_QUEUES,
} from './data/initialData';

// Public Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { QuickCards } from './components/QuickCards';
import { DispensingSteps } from './components/DispensingSteps';
import { NewsSection } from './components/NewsSection';
import { DrugKnowledgeSection } from './components/DrugKnowledgeSection';
import { ContactFooter } from './components/ContactFooter';
import { PublicSubViews } from './components/PublicSubViews';

// Public Modals
import { DrugSearchModal } from './components/DrugSearchModal';
import { QueueCheckModal } from './components/QueueCheckModal';
import { PharmacistConsultModal } from './components/PharmacistConsultModal';
import {
  DrugDetailModal,
  ArticleDetailModal,
  NewsDetailModal,
} from './components/DetailModals';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { AdminInfographicsManager } from './components/admin/AdminInfographicsManager';
import { AdminDrugManager } from './components/admin/AdminDrugManager';
import { AdminBannerManager } from './components/admin/AdminBannerManager';
import { AdminNewsAndKnowledge } from './components/admin/AdminNewsAndKnowledge';
import { AdminServicesAndDocs } from './components/admin/AdminServicesAndDocs';

export default function App() {
  // Application Mode: 'public' | 'admin_login' | 'admin_dashboard'
  const [appMode, setAppMode] = useState<'public' | 'admin_login' | 'admin_dashboard'>('public');

  // Public Navigation State
  const [activeSection, setActiveSection] = useState<PublicNavSection>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<DrugItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Admin State
  const [adminSection, setAdminSection] = useState<AdminSection>('dashboard');
  const [currentAdminUser, setCurrentAdminUser] = useState<string>('ภก.อดิศักดิ์ (Admin)');

  // Dynamic Data Store (can be edited in Admin, changes reflect instantly)
  const [drugs, setDrugs] = useState<DrugItem[]>(INITIAL_DRUGS);
  const [infographics, setInfographics] = useState<StepInfographic[]>(INITIAL_STEP_INFOGRAPHICS);
  const [bannerConfig, setBannerConfig] = useState<BannerConfig>(INITIAL_BANNER);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [articles, setArticles] = useState<KnowledgeArticle[]>(INITIAL_KNOWLEDGE);
  const [documents, setDocuments] = useState<DocumentDownload[]>(INITIAL_DOCUMENTS);
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);

  // Quick Handlers
  const handleSelectPublicSection = (section: PublicNavSection) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = (username: string) => {
    setCurrentAdminUser(username);
    setAppMode('admin_dashboard');
    setAdminSection('dashboard');
  };

  // =========================================================================
  // VIEW: ADMIN LOGIN
  // =========================================================================
  if (appMode === 'admin_login') {
    return (
      <AdminLogin
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToPublic={() => setAppMode('public')}
      />
    );
  }

  // =========================================================================
  // VIEW: ADMIN DASHBOARD & MANAGEMENT CONSOLE
  // =========================================================================
  if (appMode === 'admin_dashboard') {
    return (
      <AdminLayout
        currentSection={adminSection}
        onSelectSection={setAdminSection}
        currentUser={currentAdminUser}
        onLogout={() => setAppMode('public')}
        onViewPublicSite={() => {
          setAppMode('public');
          setActiveSection('home');
        }}
      >
        {adminSection === 'dashboard' && (
          <AdminDashboardOverview
            drugs={drugs}
            news={news}
            articles={articles}
            documents={documents}
            users={users}
            onNavigateSection={(sec) => setAdminSection(sec)}
          />
        )}

        {adminSection === 'infographics' && (
          <AdminInfographicsManager
            infographics={infographics}
            onUpdateInfographics={setInfographics}
          />
        )}

        {adminSection === 'drugs' && (
          <AdminDrugManager drugs={drugs} onUpdateDrugs={setDrugs} />
        )}

        {adminSection === 'banner' && (
          <AdminBannerManager
            bannerConfig={bannerConfig}
            onUpdateBanner={setBannerConfig}
          />
        )}

        {adminSection === 'news' && (
          <AdminNewsAndKnowledge
            type="news"
            news={news}
            articles={articles}
            onUpdateNews={setNews}
            onUpdateArticles={setArticles}
          />
        )}

        {adminSection === 'knowledge' && (
          <AdminNewsAndKnowledge
            type="knowledge"
            news={news}
            articles={articles}
            onUpdateNews={setNews}
            onUpdateArticles={setArticles}
          />
        )}

        {(adminSection === 'documents' ||
          adminSection === 'users' ||
          adminSection === 'stats' ||
          adminSection === 'settings') && (
          <AdminServicesAndDocs
            section={adminSection}
            documents={documents}
            users={users}
            onUpdateDocuments={setDocuments}
            onUpdateUsers={setUsers}
          />
        )}
      </AdminLayout>
    );
  }

  // =========================================================================
  // VIEW: PUBLIC PORTAL (โรงพยาบาลวชิระภูเก็ต - กลุ่มงานเภสัชกรรม)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        activeSection={activeSection}
        onNavigate={handleSelectPublicSection}
        onOpenQueueModal={() => setIsQueueOpen(true)}
        onOpenSearchModal={() => setIsSearchOpen(true)}
        onOpenConsultModal={() => setIsConsultOpen(true)}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={handleSelectPublicSection}
        onOpenAdminLogin={() => {
          setIsSidebarOpen(false);
          setAppMode('admin_login');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeSection === 'home' ? (
          <>
            {/* 2. Hero Banner */}
            <HeroBanner
              bannerConfig={bannerConfig}
              onOpenDrugGuide={() => handleSelectPublicSection('drugs_usage')}
              onOpenConsult={() => setIsConsultOpen(true)}
            />

            {/* 3. Quick Action Cards (6 Cards) */}
            <QuickCards
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenQueue={() => setIsQueueOpen(true)}
              onOpenConsult={() => setIsConsultOpen(true)}
              onNavigate={handleSelectPublicSection}
            />

            {/* 5. 3-Column Dispensing Step Infographics (Admin editable!) */}
            <DispensingSteps infographics={infographics} />

            {/* 6. News & Announcements Section */}
            <NewsSection
              news={news}
              onViewAllNews={() => handleSelectPublicSection('news')}
            />

            {/* 7. Drug & Health Knowledge Section */}
            <DrugKnowledgeSection
              articles={articles}
              onViewAll={() => handleSelectPublicSection('knowledge')}
            />
          </>
        ) : (
          /* Sub-Pages for specific menu items */
          <PublicSubViews
            section={activeSection}
            onBackHome={() => handleSelectPublicSection('home')}
            drugs={drugs}
            news={news}
            articles={articles}
            documents={documents}
            onOpenDrugDetail={(drug) => setSelectedDrug(drug)}
            onOpenArticleDetail={(art) => setSelectedArticle(art)}
            onOpenNewsDetail={(n) => setSelectedNews(n)}
          />
        )}
      </main>

      {/* 8. Footer with Contact & discreet Admin Access */}
      <ContactFooter
        onOpenConsult={() => setIsConsultOpen(true)}
        onOpenAdminLogin={() => setAppMode('admin_login')}
      />

      {/* Modals */}
      <DrugSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        drugs={drugs}
      />

      <QueueCheckModal
        isOpen={isQueueOpen}
        onClose={() => setIsQueueOpen(false)}
        queues={INITIAL_QUEUES}
      />

      <PharmacistConsultModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      <DrugDetailModal
        drug={selectedDrug}
        onClose={() => setSelectedDrug(null)}
      />

      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </div>
  );
}


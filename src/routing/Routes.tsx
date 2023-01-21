import React from 'react';
import { Navigate, Route, Routes as RoutesRouter } from 'react-router-dom';
import { SiteNavigation } from './SiteNavigation';
import { AboutMePage } from 'pages/AboutMePage';
import { ContactPage } from 'pages/ContactPage';
import { EducationPage } from 'pages/EducationPage';
import { ExperiencePage } from 'pages/ExperiencePage';
import { NotFoundPage } from 'pages/NotFoundPage';

export const Routes = () => {
    return <RoutesRouter>
        <Route path={SiteNavigation.about.path} element={<AboutMePage />} />
        <Route path={'/'} element={<AboutMePage />} />
        <Route path={SiteNavigation.experience.path} element={<ExperiencePage />} />
        <Route path={SiteNavigation.education.path} element={<EducationPage />} />
        <Route path={SiteNavigation.contact.path} element={<ContactPage />} />
        <Route path="*" element={<Navigate to={SiteNavigation.notFound.path} />} />
        <Route path={SiteNavigation.notFound.path} element={<NotFoundPage />} />
    </RoutesRouter>;
};

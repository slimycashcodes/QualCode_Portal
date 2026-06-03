import React from 'react';
import { 
  Header, HeaderContainer, HeaderName, HeaderMenuButton, HeaderGlobalBar, HeaderGlobalAction,
  SkipToContent, SideNav, SideNavItems, SideNavLink 
} from '@carbon/react';
import { Enterprise, Logout } from '@carbon/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Suppress application layouts for generic login/landing pages
  const isPublicPage = location.pathname === '/' || location.pathname === '/login';
  if (isPublicPage) return <>{children}</>;

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Mental Health Resources Portal">
            <SkipToContent />
            <HeaderMenuButton aria-label="Toggle Menu" isCollapsible onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
            <HeaderName onClick={() => navigate('/dashboard')} prefix="Self Talk" style={{ cursor: 'pointer' }}>
              Psychologist Matrix
            </HeaderName>
            
            <HeaderGlobalBar>
              <div style={{ display: 'flex', alignItems: 'center', color: '#e0e0e0', fontSize: '0.85rem', paddingRight: '1rem' }}>
                {user?.name} ({user?.role}) | {user?.campus}
              </div>
              <HeaderGlobalAction aria-label="Sign Out" onClick={() => { logout(); navigate('/'); }}>
                <Logout size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
          
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false} onOverlayClick={onClickSideNavExpand}>
            <SideNavItems>
              <SideNavLink renderIcon={() => <Enterprise size={16} />} onClick={() => { navigate('/dashboard'); onClickSideNavExpand(); }} isActive={location.pathname === '/dashboard'}>
                Review Workspace
              </SideNavLink>
            </SideNavItems>
          </SideNav>
          
          <main className="main-content" style={{ padding: '5rem 2rem 2rem' }}>{children}</main>
        </>
      )}
    />
  );
}  
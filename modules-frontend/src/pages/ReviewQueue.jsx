import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  Dropdown, 
  Search,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction
} from '@carbon/react';
import { 
  Filter, 
  Renew, 
  OverflowMenuVertical, 
  ChevronRight, 
  CheckmarkFilled,
  WarningFilled,
  Help,
  Notification,
  User,
  Catalog,
  ChevronDown
} from '@carbon/icons-react';

export default function ReviewQueue() {
  const navigate = useNavigate();

  // 1. Core State Managers - Initialized with default Figma blueprint records
  const [modules, setModules] = useState([
    { id: "rev-1", name: "Anti Bullying Methods", author: "Rashika Jeyakumar", approver: "Saranya Loganathan", category: "Mind Matters Jr.", status: "Pending Review", date: "19 Nov 2025" },
    { id: "rev-2", name: "Handing Depression in Minors", author: "Rashika Jeyakumar", approver: "Saranya Loganathan", category: "Mind Matters Jr.", status: "Pending Review", date: "23 Nov 2025" },
    { id: "rev-3", name: "Handing Depression in Minors", author: "Rashika Jeyakumar", approver: "Saranya Loganathan", category: "Mind Matters Jr.", status: "Needs Changes", date: "23 Nov 2025" },
    { id: "rev-4", name: "Handing Depression in Minors", author: "Tooba Farheen", approver: "Saranya Loganathan", category: "Mind Matters Jr.", status: "Pending Review", date: "23 Nov 2025" },
    { id: "rev-5", name: "Handing Depression in Minors", author: "Tooba Farheen", approver: "Saranya Loganathan", category: "Mind Matters Jr.", status: "Pending Review", date: "23 Nov 2025" },
    { id: "rev-6", name: "Sexuality in Young Adults", author: "Tooba Farheen", approver: "Saranya Loganathan", category: "Mind Matters Jr.", status: "Approved", date: "23 Nov 2025" }
  ]);
  
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Role Identity Tracking (Set default to ADMIN to clear image_d2c3bf.png view state)
  const [userRole, setUserRole] = useState('ADMIN'); 
  const [activeTab, setActiveTab] = useState(0); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');

  const isAdmin = userRole === 'ADMIN';
  const adminTabs = ['Pending', 'Approved', 'Rejected'];
  const userTabs = ['Submitted', 'Needs Changes', 'Approved'];
  const activeTabsList = isAdmin ? adminTabs : userTabs;

  // 3. API Fetch pipeline with automated header passing
  const fetchReviewQueue = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/modules', {
        headers: { 'X-Authenticated-Role': userRole }
      });
      
      let rawData = response.data;
      if (rawData && !Array.isArray(rawData)) {
        rawData = rawData.content || rawData.modules || rawData.data || [rawData];
      }

      const safeArray = Array.isArray(rawData) ? rawData : [];
      if (safeArray.length > 0) {
        const normalizedData = safeArray.map((item, idx) => ({
          id: item?.id || item?._id || idx.toString(),
          name: item?.name || item?.moduleName || 'Untitled Review Item',
          author: item?.author || (item?.collaborators && item?.collaborators[0]) || 'Rashika Jeyakumar',
          approver: item?.approver || 'Saranya Loganathan',
          category: item?.category || item?.programName || 'Mind Matters Jr.',
          status: item?.status || 'Pending Review',
          date: item?.date || item?.publishDate || '23 Nov 2025'
        }));
        setModules(normalizedData);
      }
    } catch (err) {
      console.warn("Backend connection unavailable. Maintaining workspace evaluation sample dataset.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewQueue();
  }, [userRole]);

  // 4. Client Side Filtration Pipeline
  useEffect(() => {
    let result = [...modules];

    // Status filtration alignment mapping
    if (activeTab === 1) {
      result = result.filter(m => m.status.toLowerCase().includes('change') || m.status.toLowerCase().includes('need'));
    } else if (activeTab === 2) {
      result = result.filter(m => m.status.toLowerCase() === 'approved');
    }

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(m => m.name.toLowerCase().includes(q) || m.author.toLowerCase().includes(q));
    }

    setFilteredModules(result);
  }, [searchTerm, activeTab, modules]);

  // Metric Calculation Wrappers
  const pendingCount = modules.filter(m => m.status.toLowerCase().includes('pending') || m.status.toLowerCase().includes('submit')).length;
  const criticalCount = modules.filter(m => m.status.toLowerCase().includes('change') || m.status.toLowerCase().includes('need')).length;
  const approvedCount = modules.filter(m => m.status.toLowerCase() === 'approved').length;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingTop: '3rem', fontFamily: '"IBM Plex Sans", sans-serif' }}>
      
      {/* 1. Global Header Navigation Wrapper */}
      <Header aria-label="Self Talk Psychologist" style={{ background: '#161616', borderBottom: '1px solid #393939' }}>
        <HeaderName onClick={() => navigate('/dashboard')} prefix="" style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
          Self Talk Psychologist
        </HeaderName>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '2rem', maxWidth: '400px' }}>
          <Search id="global-search" placeholder="Search resources and products" size="sm" light />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#c6c6c6', fontSize: '0.875rem', marginLeft: '2rem' }}>
          <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Catalog size={16}/> Catalog</span>
          <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Select Campus <ChevronDown size={12}/></span>
          <span style={{ color: '#fff' }}>Dr. B Ramesh</span>
        </div>
        
        {/* Quick Identity Role Switcher Button */}
        <button 
          onClick={() => { setActiveTab(0); setUserRole(isAdmin ? 'USER' : 'ADMIN'); }}
          style={{ marginLeft: 'auto', background: '#393939', color: '#fff', border: 'none', padding: '4px 12px', fontSize: '0.75rem', cursor: 'pointer', height: '24px', borderRadius: '2px' }}
        >
          Switch View: {isAdmin ? 'User Mode' : 'Admin Mode'}
        </button>

        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Help"><Help size={20} /></HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Calendar"><Notification size={20} /></HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Profile"><User size={20} /></HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <div className="cds--grid" style={{ padding: '2rem 2rem', maxWidth: '100%' }}>
        
        {/* Breadcrumb Row */}
        <div className="cds--row" style={{ marginBottom: '1rem' }}>
          <div className="cds--col">
            <Breadcrumb noTrailingSlash>
              <BreadcrumbItem href="#">Bread Crumb</BreadcrumbItem>
              <BreadcrumbItem href="#">Bread Crumb</BreadcrumbItem>
              <BreadcrumbItem href="#">Bread Crumb</BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>Modules</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        {/* 2. Page Title Header & Top Summary Status Indicators */}
        <div className="cds--row" style={{ alignItems: 'center', marginBottom: '2rem' }}>
          <div className="cds--col-lg-8">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#161616', margin: 0 }}>Review Queue</h1>
          </div>
          
          <div className="cds--col-lg-8" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', color: '#0f62fe', fontWeight: 500 }}>Review Summary</div>
              <div style={{ fontSize: '0.75rem', color: '#525252' }}>{pendingCount} modules {isAdmin ? 'awaiting review' : 'under review'}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '2.25rem', fontWeight: 300 }}>
              <WarningFilled size={24} style={{ color: '#f1c21b' }} /> {criticalCount}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '2.25rem', fontWeight: 300 }}>
              <CheckmarkFilled size={24} style={{ color: '#24a148' }} /> {approvedCount}
            </div>
          </div>
        </div>

        {/* 3. Operational Segment Tab Buttons */}
        <div className="cds--row" style={{ marginBottom: '1.5rem' }}>
          <div className="cds--col">
            <div style={{ display: 'flex' }}>
              {activeTabsList.map((tabLabel, idx) => (
                <button
                  key={tabLabel}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    padding: '0.65rem 2rem', fontSize: '0.875rem', cursor: 'pointer',
                    border: '1px solid #e0e0e0', marginRight: '-1px', fontWeight: 400,
                    background: activeTab === idx ? '#161616' : '#fff',
                    color: activeTab === idx ? '#fff' : '#161616',
                  }}
                >
                  {tabLabel}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Stripe Info Subtitle Banner */}
        <div className="cds--row" style={{ marginBottom: '1.5rem' }}>
          <div className="cds--col" style={{ fontSize: '0.875rem', color: '#161616', fontWeight: 500 }}>
            {isAdmin ? 'Pending: 10 | Approved: 2 | Rejected: 5' : 'Submitted: 10 | Needs Changes: 2 | Approved: 5'}
          </div>
        </div>

        {/* 4. Filter Controls Row Block */}
        <div className="cds--row" style={{ border: '1px solid #e0e0e0', borderBottom: 'none', background: '#fff', alignItems: 'center', minHeight: '48px', display: 'flex', margin: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', borderRight: '1px solid #e0e0e0', height: '48px' }}>
            <Filter size={16} />
          </div>
          <div style={{ width: '160px', borderRight: '1px solid #e0e0e0' }}>
            <Dropdown id="review-program-dropdown" label={selectedProgram} items={['All Programs', 'Mind Matters', 'Mind Matters Jr.']} onChange={({ selectedItem }) => setSelectedProgram(selectedItem)} style={{ border: 'none', background: 'transparent' }} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <Search id="review-search" labelText="Search" placeholder="Find module by name, author or category" size="md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', background: 'transparent' }} />
          </div>
          <div onClick={fetchReviewQueue} style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', height: '48px', cursor: 'pointer', borderLeft: '1px solid #e0e0e0' }}>
            <Renew size={16} />
          </div>
        </div>

        {/* 5. Matrix Core Data Grid Table */}
        <div style={{ overflowX: 'auto', border: '1px solid #e0e0e0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#e0e0e0', color: '#161616', fontWeight: 600, height: '40px' }}>
                <th style={{ width: '40px', paddingLeft: '1rem' }}></th>
                <th style={{ padding: '0.5rem 1rem' }}>Module Name</th>
                <th style={{ padding: '0.5rem 1rem' }}>{isAdmin ? 'Author' : 'Approver'}</th>
                <th style={{ padding: '0.5rem 1rem' }}>Category</th>
                <th style={{ padding: '0.5rem 1rem' }}>Status</th>
                <th style={{ padding: '0.5rem 1rem' }}>Publish Date</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.length === 0 ? (
                <tr style={{ height: '48px' }}>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#525252', background: '#fff', padding: '2rem' }}>
                    No queue modules active under this tab criteria.
                  </td>
                </tr>
              ) : (
                filteredModules.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0', height: '48px', background: '#fff' }}>
                    <td style={{ paddingLeft: '1rem', verticalAlign: 'middle', width: '40px', color: '#c6c6c6' }}>
                      <ChevronRight size={16} />
                    </td>
                    <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#0f62fe', textDecoration: 'underline', cursor: 'pointer' }}>
                      {row.name}
                    </td>
                    <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#161616' }}>
                      {isAdmin ? row.author : row.approver}
                    </td>
                    <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#161616' }}>
                      {row.category}
                    </td>
                    <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {row.status === 'Approved' ? (
                          <><CheckmarkFilled size={16} style={{ color: '#24a148' }} /><span style={{ color: '#161616' }}>Approved</span></>
                        ) : row.status === 'Needs Changes' || row.status === 'Requested Change' ? (
                          <><WarningFilled size={16} style={{ color: '#f1c21b' }} /><span style={{ color: '#161616' }}>{isAdmin ? 'Requested Change' : 'Needs Changes'}</span></>
                        ) : (
                          <><div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#6f6f6f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '2px', background: '#fff' }}></div></div><span style={{ color: '#161616' }}>Pending Review</span></>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#161616' }}>{row.date}</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', color: '#525252' }}><OverflowMenuVertical size={16} style={{ cursor: 'pointer' }} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
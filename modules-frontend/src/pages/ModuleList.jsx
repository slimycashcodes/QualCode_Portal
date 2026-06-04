import React, { useState, useEffect } from 'react';
import { 
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
  TableContainer, TableToolbar, TableToolbarContent, Button, 
  Pagination, Tag, Loading, Search, ContentSwitcher, Switch
} from '@carbon/react';
// Replace your old icons import statement with this:
// Ensure line 5-7 of pages/ModuleList.jsx looks EXACTLY like this:
import { 
  Add, 
  Filter, 
  Edit, 
  ChevronDown, 
  ChevronRight, 
  CheckmarkFilled, 
  WarningFilled, // <-- MAKE SURE THIS IS DEFINED HERE
  ErrorFilled 
} from '@carbon/icons-react';import { useNavigate } from 'react-router-dom';
import { moduleService } from '../services/api';
import { useAuth } from '../services/AuthContext';
import ModuleDetailDrawer from '../components/ModuleDetailDrawer';

export default function ModuleList() {
  const navigate = useNavigate();
  const { role, setRole, user } = useAuth();
  
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  
  // UI Tab selection map tracker states
  const [activeTab, setActiveTab] = useState(0); 
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Define tab mappings based on role configurations from image references
  const adminTabs = ['PENDING_REVIEW', 'APPROVED', 'REJECTED'];
  const userTabs = ['PENDING_REVIEW', 'REQUESTED_CHANGE', 'APPROVED'];
  const currentStatusFilter = role === 'ADMIN' ? adminTabs[activeTab] : userTabs[activeTab];

  useEffect(() => { fetchModules(); }, [currentPage, pageSize, search, activeTab, role]);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const res = await moduleService.getAll({
        page: currentPage - 1, size: pageSize, search: search || undefined,
        status: currentStatusFilter
      });
      setModules(res.data.content);
      setTotalItems(res.data.totalElements);
    } catch (err) {
      console.error("Data syncing error");
    } finally { setLoading(false); }
  };

  const getStatusIndicator = (status) => {
    switch(status) {
      case 'APPROVED': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#24a148', fontWeight: 500 }}><CheckmarkFilled size={16}/> Active / Approved</span>;
      case 'REQUESTED_CHANGE': 
      case 'REQUESTED_CHANGE': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#da1e28', fontWeight: 500 }}><WarningAltFilled size={16}/> Needs Changes</span>;
      case 'REJECTED': return <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6f6f6f', fontWeight: 500 }}><MisuseFilled size={16}/> Rejected</span>;
      default: return <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4589ff', fontWeight: 500 }}>● Pending Review</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
    
    

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
      <div>
        <h2 style={{ fontWeight: 400 }}>Review Queue {role === 'ADMIN' && '- Admin'}</h2>
        <p style={{ color: '#525252', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          {role === 'ADMIN' ? 'Audit incoming submissions against validation criteria.' : 'Track your submitted resource lifecycle statuses.'}
        </p>
      </div>
      
      {/* Metric Overview Analytics Cards */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', background: '#fff', padding: '1rem 1.5rem', border: '1px solid #e0e0e0' }}>
        <div style={{ fontSize: '0.85rem' }}><span style={{ color: '#525252' }}>Review Summary</span><p style={{ fontWeight: 600 }}>{totalItems} items matched</p></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 300 }}><WarningFilled style={{ color: '#f1c21b' }}/> 1</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 300 }}><CheckmarkFilled style={{ color: '#24a148' }}/> 2</div>
      </div>
    </div>

      {/* Dynamic Content Switcher Tabs */}
      <div style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
        <ContentSwitcher selectedIndex={activeTab} onChange={({ index }) => { setActiveTab(index); setExpandedRows({}); }}>
          {role === 'ADMIN' ? (
            ['Pending Queue', 'Approved Docs', 'Rejected Logs'].map((t, idx) => <Switch key={idx} text={t} />)
          ) : (
            ['Submitted Modules', 'Needs Changes', 'Approved Records'].map((t, idx) => <Switch key={idx} text={t} />)
          )}
        </ContentSwitcher>
      </div>

      <TableContainer>
        <TableToolbar>
          <TableToolbarContent style={{ gap: '1rem' }}>
            <Search id="filter-search" placeholder="Find module by name, author, or category..." size="md" onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: '400px' }} />
            <Button renderIcon={() => <Edit size={16} />} onClick={() => navigate('/create')}>Create Modules</Button>
          </TableToolbarContent>
        </TableToolbar>

        {loading ? <Loading withOverlay={false} /> : (
          <Table size="lg" useZebraStyles>
            <TableHead style={{ background: '#f4f4f4' }}>
              <TableRow>
                <TableHeader style={{ width: '40px' }} />
                <TableHeader>Module Name</TableHeader>
                <TableHeader>{role === 'ADMIN' ? 'Author' : 'Approver Lead'}</TableHeader>
                <TableHeader>Service Component</TableHeader>
                <TableHeader>Program Name</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Publish Date</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.map(row => {
                const isExpanded = !!expandedRows[row.id];
                return (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell style={{ cursor: 'pointer' }} onClick={() => setExpandedRows(prev => ({ ...prev, [row.id]: !prev[row.id] }))}>
                        {isExpanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                      </TableCell>
                      <TableCell>
                        <span onClick={() => { setSelectedModule(row); setDrawerOpen(true); }} style={{ color: '#0f62fe', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell>{row.collaborators?.join(', ') || 'Saranya Loganathan'}</TableCell>
                      <TableCell>{row.serviceComponent || 'Workshop'}</TableCell>
                      <TableCell>{row.programName || 'Mind Matters Jr.'}</TableCell>
                      <TableCell>{getStatusIndicator(row.status)}</TableCell>
                      <TableCell style={{ color: '#525252' }}>
                        {row.createdOn ? new Date(row.createdOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '22 Nov 2025'}
                      </TableCell>
                    </TableRow>

                    {/* Inline Expanded Drawer Details Pane - Replicating image_d804a4.png */}
                    {isExpanded && (
                      <TableRow style={{ background: '#f0f4f8' }}>
                        <TableCell colSpan={7} style={{ padding: '1.5rem 2.5rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '2rem' }}>
                            <div>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#525252' }}>Generated Summary <Tag size="sm" type="purple">AI</Tag></span>
                              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#161616', lineHeight: '1.5' }}>{row.description}</p>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#525252' }}>Taxonomy Specs</span>
                              <p style={{ marginTop: '0.5rem' }}>Category: <strong>{row.category || 'CBSE'}</strong></p>
                              <p>Target Group: <strong>{row.targetGroup || '12th Grade'}</strong></p>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#525252' }}>Ecosystem Tags</span>
                              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                {row.tags?.map(t => <Tag key={t} type="blue">{t}</Tag>) || <Tag type="cool-gray">General</Tag>}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        )}
        <Pagination totalItems={totalItems} backwardText="Prev" forwardText="Next" pageSize={pageSize} pageSizes={[5, 10, 20]} onChange={({ page, pageSize }) => { setCurrentPage(page); setPageSize(pageSize); }} />
      </TableContainer>

      <ModuleDetailDrawer isOpen={drawerOpen} module={selectedModule} onClose={() => setDrawerOpen(false)} onEdit={(id) => navigate(`/edit/${id}`)} />
    </div>
  );
}
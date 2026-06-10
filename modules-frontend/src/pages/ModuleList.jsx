import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  Button, 
  Dropdown, 
  Search,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Accordion,
  AccordionItem
} from '@carbon/react';
import { 
  Add, 
  Filter, 
  Renew, 
  OverflowMenuVertical, 
  ChevronRight, 
  ChevronDown,
  CheckmarkFilled,
  Close,
  Help,
  Notification,
  User,
  Catalog,
  Launch
} from '@carbon/icons-react';

export default function ModuleList() {
  const navigate = useNavigate();

  // 1. Core State Handlers - Initialized with the 3 Figma sample records by default
  const [modules, setModules] = useState([
    {
      id: "sample-1",
      name: "Child Wellbeing",
      author: "Saranya Loganathan",
      program: "Mind Matters",
      status: "Active",
      date: "22 Nov 2025",
      serviceComponent: "Workshop",
      category: "CBSE",
      targetGroup: "12th Grade",
      summary: 'This session, designed for college students facing transitions, focuses on understanding and embracing change psychologically and emotionally. Learners engage in interactive activities like "Switch Sides!" and "The Unfold Game" to explore fears, strengths, and opportunities in change.',
      generatedSummary: "Supports emotional, social, and psychological wellbeing in children. Focuses on healthy growth and positive development."
    },
    {
      id: "sample-2",
      name: "Anti Bullying Methods",
      author: "Saranya Loganathan",
      program: "Mind Matters Jr.",
      status: "Draft",
      date: "19 Nov 2025",
      serviceComponent: "Workshop",
      category: "CBSE",
      targetGroup: "12th Grade",
      summary: "Focuses on identifying bullying behavior early and implementing corrective social methodologies among school students.",
      generatedSummary: "Uses interactive frameworks to eliminate schoolyard bullying and promote student collaboration."
    },
    {
      id: "sample-3",
      name: "Handing Depression in Minors",
      author: "Janice Anthony",
      program: "Mind Matters Jr.",
      status: "Draft",
      date: "23 Nov 2025",
      serviceComponent: "Workshop",
      category: "CBSE",
      targetGroup: "12th Grade",
      summary: "An introduction to identifying early clinical symptoms of mood changes and withdrawal patterns in early development.",
      generatedSummary: "Encourages constructive peer support channels and early baseline therapy tracking models."
    }
  ]);
  
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 2. Structural Interaction Layout States
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');

  // 3. Expandable Row & Sliding Inspection Drawer States
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [selectedDrawerModule, setSelectedDrawerModule] = useState(null);

  // 4. API Data Fetch Pipeline with Automated Dynamic Array Unpacker
  const fetchModules = async () => {
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/modules', {
        headers: { 
          'X-Authenticated-Role': 'USER' 
        }
      });
      
      let rawData = response.data;
      
      // Auto-detect wrap structures (handles raw array, pagination objects, or nested data)
      if (rawData && !Array.isArray(rawData)) {
        rawData = rawData.content || rawData.modules || rawData.data || [rawData];
      }

      if (Array.isArray(rawData) && rawData.length > 0) {
        // If live DB data is present, map it cleanly and overwrite the static layout list
        const normalizedData = rawData.map((item, idx) => ({
          id: item?.id || item?._id || idx.toString(),
          name: item?.name || item?.moduleName || 'Untitled Module',
          author: item?.author || (item?.collaborators && item?.collaborators[0]) || 'Saranya Loganathan', 
          program: item?.program || item?.programName || 'Mind Matters Jr.',
          status: item?.status || 'Active',
          date: item?.date || item?.publishDate || '22 Nov 2025',
          serviceComponent: item?.serviceComponent || 'Workshop',
          category: item?.category || 'CBSE',
          targetGroup: item?.targetGroup || '12th Grade',
          summary: item?.summary || 'This session, designed for college students facing transitions, focuses on understanding and embracing change psychologically and emotionally.',
          generatedSummary: item?.generatedSummary || 'Supports emotional, social, and psychological wellbeing.'
        }));
        setModules(normalizedData);
      }
    } catch (err) {
      console.warn("Backend connection unavailable. Maintaining frontend workspace sample fallback dataset.", err);
      // We don't block the UI with a red error screen anymore; we just log it and leave samples active.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // 5. Stable Filtering Logic Engine
  useEffect(() => {
    const safeModules = Array.isArray(modules) ? modules : [];
    let result = [...safeModules];

    // Filter by Active Layout Tab
    if (activeTab === 1) {
      result = result.filter(m => m.author === "Saranya Loganathan");
    }
    
    // Filter by Dropdown Scope Selection
    if (selectedProgram !== 'All Programs') {
      result = result.filter(m => m.program.toLowerCase() === selectedProgram.toLowerCase());
    }
    
    // Filter by Query Search Inputs
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(query) || 
        m.author.toLowerCase().includes(query)
      );
    }
    setFilteredModules(result);
  }, [searchTerm, selectedProgram, activeTab, modules]);

  // 6. Router Navigation Event Handlers
  const handleCreateClick = () => navigate('/create');
  const handleReviewQueueClick = () => navigate('/review-queue');
  const handleRowClick = (row) => navigate(`/edit/${row.id}`);
  const toggleRowExpand = (id) => setExpandedRowId(expandedRowId === id ? null : id);
  const openInspectionDrawer = (row) => setSelectedDrawerModule(row);
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedProgram('All Programs');
    setActiveTab(0);
  };

  // Metrics Metric State Counters Computations
  const liveCount = filteredModules.filter(m => m.status.toLowerCase() === 'active' || m.status.toLowerCase() === 'approved').length;
  const draftCount = filteredModules.filter(m => m.status.toLowerCase() === 'draft' || m.status.toLowerCase() === 'pending_review').length;

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingTop: '3rem', fontFamily: '"IBM Plex Sans", sans-serif', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. Global Carbon Layout App Header Bar */}
      <Header aria-label="Self Talk Psychologist" style={{ background: '#161616', borderBottom: '1px solid #393939', zIndex: 9000 }}>
        <HeaderName onClick={() => navigate('/')} prefix="" style={{ color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
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

        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Help"><Help size={20} /></HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Calendar"><Notification size={20} /></HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Profile"><User size={20} /></HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      {/* Main Container Content Canvas Frame */}
      <div 
        className="cds--grid" 
        style={{ 
          padding: '2rem 1rem', 
          maxWidth: '100%', 
          marginRight: selectedDrawerModule ? '380px' : '0px', 
          transition: 'margin-right 0.2s ease-in-out' 
        }}
      >
        
        {/* 2. Breadcrumb Row Header */}
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

        {/* 3. Operational Grid Header Title & Actions Block */}
        <div className="cds--row" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-8">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#161616', margin: 0 }}>Modules</h1>
          </div>
          <div className="cds--col-sm-4 cds--col-md-4 cds--col-lg-8" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1px' }}>
            <Button kind="secondary" onClick={handleReviewQueueClick} style={{ backgroundColor: '#393939', color: '#fff', width: '160px', border: 'none' }}>
              Review Queue
            </Button>
            <Button kind="primary" renderIcon={Add} onClick={handleCreateClick} style={{ width: '160px' }}>
              Create Modules
            </Button>
          </div>
        </div>

        {/* 4. Functional Tab Filter Segment Blocks */}
        <div className="cds--row" style={{ marginBottom: '1.5rem' }}>
          <div className="cds--col">
            <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
              <button onClick={() => setActiveTab(0)} style={{ padding: '0.75rem 1.5rem', border: 'none', background: activeTab === 0 ? '#161616' : 'transparent', color: activeTab === 0 ? '#fff' : '#525252', cursor: 'pointer', fontWeight: 500 }}>
                All Modules
              </button>
              <button onClick={() => setActiveTab(1)} style={{ padding: '0.75rem 1.5rem', border: '1px solid #e0e0e0', borderBottom: 'none', background: activeTab === 1 ? '#161616' : '#fff', color: activeTab === 1 ? '#fff' : '#161616', cursor: 'pointer', fontWeight: 500 }}>
                My Modules
              </button>
            </div>
          </div>
        </div>

        {/* 5. Live Counter Summary Stripe Bar */}
        <div className="cds--row" style={{ background: '#f4f4f4', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
          <div className="cds--col" style={{ color: '#525252', fontSize: '0.875rem' }}>
            Live Modules: {liveCount} | Draft modules: {draftCount}
          </div>
        </div>

        {/* 6. Main Workspace Multi-Panel Dynamic Flex Split Grid */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDEPANEL: Structural Filter Tree Accordions */}
          {isFilterPanelOpen && (
            <div style={{ width: '260px', minWidth: '260px', border: '1px solid #e0e0e0', background: '#fff', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 240px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ fontWeight: 600, color: '#161616', fontSize: '1rem' }}>Filter</span>
                <Close size={16} style={{ cursor: 'pointer', color: '#525252' }} onClick={() => setIsFilterPanelOpen(false)} />
              </div>
              <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <Accordion align="end" style={{ width: '100%' }}>
                  <AccordionItem title="Collaborators" style={{ borderBottom: '1px solid #e0e0e0', fontSize: '0.875rem' }}><div style={{ padding: '0.5rem 1rem', color: '#161616' }}>Saranya Loganathan</div></AccordionItem>
                  <AccordionItem title="Created on" style={{ borderBottom: '1px solid #e0e0e0', fontSize: '0.875rem' }}><div style={{ padding: '0.5rem 1rem', color: '#525252' }}>All timelines</div></AccordionItem>
                  <AccordionItem title="Category" style={{ borderBottom: '1px solid #e0e0e0', fontSize: '0.875rem' }}><div style={{ padding: '0.5rem 1rem', color: '#525252' }}>CBSE</div></AccordionItem>
                  <AccordionItem title="Tags" style={{ borderBottom: '1px solid #e0e0e0', fontSize: '0.875rem' }}><div style={{ padding: '0.5rem 1rem', color: '#525252' }}>Psychology</div></AccordionItem>
                </Accordion>
              </div>
              <div onClick={handleResetFilters} style={{ padding: '1rem', borderTop: '1px solid #e0e0e0', background: '#f4f4f4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.875rem', color: '#525252' }}>
                <span>Reset filters</span><Renew size={16} />
              </div>
            </div>
          )}

          {/* RIGHT GRID PANEL: Inputs Toolbar Header + Custom Data Matrix Table */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* Horizontal Input Action Form Stripe */}
            <div style={{ border: '1px solid #e0e0e0', borderBottom: 'none', background: '#fff', alignItems: 'center', minHeight: '48px', display: 'flex' }}>
              <div onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)} style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', borderRight: '1px solid #e0e0e0', height: '48px', cursor: 'pointer', background: isFilterPanelOpen ? '#f4f4f4' : 'transparent' }}>
                <Filter size={16} />
              </div>
              <div style={{ width: '160px', borderRight: '1px solid #e0e0e0' }}>
                <Dropdown id="program-dropdown" label={selectedProgram} items={['All Programs', 'Mind Matters', 'Mind Matters Jr.']} onChange={({ selectedItem }) => setSelectedProgram(selectedItem)} style={{ border: 'none', background: 'transparent' }} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <Search id="module-search" labelText="Search" placeholder="Find module by name, author or category" size="md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', background: 'transparent' }} />
              </div>
              <div onClick={fetchModules} style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', height: '48px', cursor: 'pointer', borderLeft: '1px solid #e0e0e0' }}><Renew size={16} /></div>
            </div>

            {/* Core Segment Layout Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e0e0e0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#e0e0e0', color: '#161616', fontWeight: 600, height: '40px' }}>
                    <th style={{ width: '40px', paddingLeft: '1rem' }}></th>
                    <th style={{ padding: '0.5rem 1rem' }}>Module Name</th>
                    <th style={{ padding: '0.5rem 1rem' }}>Author</th>
                    <th style={{ padding: '0.5rem 1rem' }}>Service Component</th>
                    <th style={{ padding: '0.5rem 1rem' }}>Program</th>
                    <th style={{ padding: '0.5rem 1rem' }}>Status</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModules.map((row) => (
                    <React.Fragment key={row.id}>
                      <tr style={{ borderBottom: '1px solid #e0e0e0', height: '48px', background: expandedRowId === row.id ? '#f4f4f4' : '#fff' }}>
                        <td style={{ paddingLeft: '1rem', verticalAlign: 'middle', width: '40px' }}>
                          {expandedRowId === row.id ? (
                            <ChevronDown size={16} style={{ cursor: 'pointer', color: '#161616' }} onClick={() => toggleRowExpand(row.id)} />
                          ) : (
                            <ChevronRight size={16} style={{ cursor: 'pointer', color: '#525252' }} onClick={() => toggleRowExpand(row.id)} />
                          )}
                        </td>
                        <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle' }}>
                          <a href="#" onClick={(e) => { e.preventDefault(); openInspectionDrawer(row); }} style={{ color: '#0f62fe', textDecoration: 'underline', fontWeight: 400 }}>
                            {row.name}
                          </a>
                        </td>
                        <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#161616' }}>{row.author}</td>
                        <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#161616' }}>{row.serviceComponent}</td>
                        <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle', color: '#161616' }}>{row.program}</td>
                        <td style={{ padding: '0.5rem 1rem', verticalAlign: 'middle' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            {row.status.toLowerCase() === 'active' || row.status.toLowerCase() === 'approved' ? (
                              <><CheckmarkFilled size={16} style={{ color: '#24a148' }} /><span style={{ color: '#161616' }}>Active</span></>
                            ) : (
                              <><div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#6f6f6f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '6px', height: '2px', background: '#fff' }}></div></div><span style={{ color: '#161616' }}>Draft</span></>
                            )}
                          </div>
                        </td>
                        <td style={{ textAlign: 'center', verticalAlign: 'middle', color: '#525252' }}>
                          <OverflowMenuVertical size={16} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(row)} />
                        </td>
                      </tr>

                      {/* Expandable Inner Sub-Row Nested Detail Section Block */}
                      {expandedRowId === row.id && (
                        <tr style={{ background: '#f4f4f4', borderBottom: '1px solid #e0e0e0' }}>
                          <td></td>
                          <td colSpan="6" style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#525252', fontWeight: 600 }}>
                                  Generated Summary <span style={{ background: '#e0e0e0', color: '#161616', fontSize: '0.65rem', padding: '1px 4px', borderRadius: '2px', display: 'inline-flex', alignItems: 'center', fontWeight: 'bold' }}>✦ AI</span>
                                </div>
                                <p style={{ color: '#161616', margin: 0, lineHeight: '1.4' }}>{row.generatedSummary}</p>
                              </div>
                              <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div><span style={{ color: '#525252', display: 'inline-block', width: '100px' }}>Category</span><span style={{ color: '#161616', fontWeight: 500 }}>{row.category}</span></div>
                                <div><span style={{ color: '#525252', display: 'inline-block', width: '100px' }}>Target Group</span><span style={{ color: '#161616', fontWeight: 500 }}>{row.targetGroup}</span></div>
                              </div>
                              <div style={{ alignSelf: 'center' }}>
                                <span style={{ background: '#d0e1fd', color: '#0043ce', padding: '0.35rem 0.75rem', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 500 }}>Maharishi Chetpat</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>

      {/* 7. SLIDING RIGHT SIDE CONTEXT INSPECTOR DRAWER SYSTEM */}
      {selectedDrawerModule && (
        <div style={{ position: 'fixed', top: '3rem', right: 0, width: '380px', height: 'calc(100vh - 3rem)', background: '#fff', borderLeft: '1px solid #e0e0e0', boxShadow: '-2px 0 8px rgba(0,0,0,0.05)', zIndex: 8000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1rem', borderBottom: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#161616', margin: 0 }}>{selectedDrawerModule.name}</h2>
            <Close size={20} style={{ cursor: 'pointer', color: '#525252' }} onClick={() => setSelectedDrawerModule(null)} />
          </div>

          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#161616', margin: 0 }}>Summary</h3>
                <span style={{ background: '#e0e0e0', color: '#161616', fontSize: '0.75rem', padding: '2px 6px', borderRadius: '2px', fontWeight: 'bold' }}>AI</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#161616', lineHeight: '1.5', margin: 0 }}>{selectedDrawerModule.summary}</p>
            </div>

            <Accordion align="start" style={{ width: '100%', borderTop: '1px solid #e0e0e0' }}>
              <AccordionItem title="Module" style={{ fontSize: '0.875rem', borderBottom: '1px solid #e0e0e0' }}>
                <div style={{ padding: '0.5rem 0', color: '#525252' }}>Core technical variable frameworks...</div>
              </AccordionItem>
              <AccordionItem title="Facilitator guide" open style={{ fontSize: '0.875rem', borderBottom: '1px solid #e0e0e0' }}>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#161616', fontSize: '0.875rem', lineHeight: '1.4' }}>
                  <li>Helps participants understand and embrace change by identifying fears, strengths, support systems, and opportunities.</li>
                  <li>Uses interactive activities, self reflection, team collaboration, and grounding techniques to build self awareness and resilience.</li>
                  <li>Encourages participants to take meaningful actions and confidently navigate transitions with mindfulness and support.</li>
                </ul>
              </AccordionItem>
            </Accordion>

            <div style={{ marginTop: 'auto', borderTop: '1px solid #e0e0e0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#161616', margin: '0 0 0.25rem 0' }}>Overview</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#525252' }}>Publish Date</span><span style={{ color: '#161616' }}>{selectedDrawerModule.date}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#525252' }}>Author</span><span style={{ color: '#161616' }}>{selectedDrawerModule.author}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#525252' }}>Category</span><span style={{ color: '#161616' }}>{selectedDrawerModule.program}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#525252' }}>Status</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#161616' }}>
                  <CheckmarkFilled size={16} style={{ color: '#24a148' }} /> Approved
                </span>
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#fff' }}>
            <Button kind="primary" renderIcon={Launch} onClick={() => handleRowClick(selectedDrawerModule)} style={{ width: '100%', justifyContent: 'space-between' }}>
              Open Module Editor
            </Button>
            <button style={{ width: '100%', background: 'none', border: 'none', color: '#0f62fe', textDecoration: 'underline', fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}>
              Duplicate module
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
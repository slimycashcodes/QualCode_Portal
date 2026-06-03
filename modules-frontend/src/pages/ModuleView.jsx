import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Loading, Tag, Stack, Section } from '@carbon/react';
import { Edit, ArrowLeft } from '@carbon/icons-react';
import { moduleService } from '../services/api';

export default function ModuleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mod, setMod] = useState(null);

  useEffect(() => {
    moduleService.getById(id).then(res => setMod(res.data));
  }, [id]);

  if (!mod) return <Loading />;

  return (
    <div style={{ backgroundColor: 'white', padding: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#6f6f6f', textTransform: 'uppercase', tracking: '0.1em' }}>Structural Architecture Node ID: #{id}</span>
          <h2 style={{ marginTop: '0.25rem' }}>{mod.name}</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button kind="secondary" renderIcon={ArrowLeft} onClick={() => navigate('/')}>Dashboard Home</Button>
          <Button renderIcon={Edit} onClick={() => navigate(`/edit/${id}`)}>Refactor Archetype Node</Button>
        </div>
      </div>

      <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '2rem 0' }} />
<div>
  <span style={{ fontSize: '0.85rem', color: '#6f6f6f', textTransform: 'uppercase' }}>Directory Reference Key: #{id}</span>
  <h2 style={{ marginTop: '0.25rem' }}>{mod.name}</h2>
</div>

<Stack gap={7}>
  <div>
    <h5 style={{ marginBottom: '0.5rem', color: '#525252' }}>Program Objectives & Resource Scope</h5>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>{mod.description}</p>
  </div>

  <div style={{ display: 'flex', gap: '4rem' }}>
    <div>
      <h5 style={{ marginBottom: '0.5rem', color: '#525252' }}>Directory Category</h5>
      <p style={{ fontWeight: 500 }}>{mod.category}</p>
    </div>
    <div>
      <h5 style={{ marginBottom: '0.5rem', color: '#525252' }}>Ecosystem Status</h5>
      <Tag type={mod.status === 'ACTIVE' ? 'success' : mod.status === 'UNDER_REVIEW' ? 'warning' : 'high-contrast'}>{mod.status}</Tag>
    </div>
  </div>

  <div>
    <h5 style={{ marginBottom: '0.5rem', color: '#525252' }}>Indexed Keywords</h5>
    {/* Map tags logic remains same */}
  </div>

  <div>
    <h5 style={{ marginBottom: '0.5rem', color: '#525252' }}>Program Leads & Verified Contributors</h5>
    <p>{mod.collaborators || 'Community-Sourced Public Domain Data'}</p>
  </div>
</Stack>
    </div>
  );
}
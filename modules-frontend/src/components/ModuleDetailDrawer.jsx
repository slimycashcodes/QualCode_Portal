import React, { useState } from 'react';
import { Button, Tag, Stack, Accordion, AccordionItem } from '@carbon/react';
import { Close, Launch } from '@carbon/icons-react';

export default function ModuleDetailDrawer({ module, isOpen, onClose, onEdit }) {
  if (!isOpen || !module) return null;

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: '420px',
      background: '#ffffff', zIndex: 10000, padding: '2rem',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.15)', borderLeft: '1px solid #e0e0e0',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ fontWeight: 600, maxWidth: '85%' }}>{module.name}</h4>
        <Button kind="ghost" hasIconOnly renderIcon={() => <Close size={16} />} iconDescription="Close Drawer" onClick={onClose} />
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        <div style={{ background: '#f4f4f4', padding: '1rem', marginBottom: '1.5rem', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>AI Summary Extract</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#393939' }}>{module.description}</p>
        </div>

        <Accordion style={{ marginBottom: '2rem' }}>
          <AccordionItem title="Module Structure Specs" open>
            <p style={{ fontSize: '0.85rem', color: '#525252' }}>
              Core informational curriculum content mapping metrics, exercises, and intervention timelines.
            </p>
          </AccordionItem>
          <AccordionItem title="Facilitator Implementation Guide">
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#525252', listStyleType: 'disc' }}>
              <li>Encourage active breakout dialogue circles.</li>
              <li>Utilize validation framework mechanics.</li>
            </ul>
          </AccordionItem>
        </Accordion>

        <Stack gap={4} style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem' }}>
          <h6 style={{ color: '#525252' }}>Overview Data Matrix</h6>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: '#8d8d8d' }}>Author Lead</span>
              <p style={{ fontWeight: 500 }}>{module.collaborators?.join(', ') || 'Staff Clinical'}</p>
            </div>
            <div>
              <span style={{ color: '#8d8d8d' }}>Category Class</span>
              <p style={{ fontWeight: 500 }}>{module.category}</p>
            </div>
            <div>
              <span style={{ color: '#8d8d8d' }}>Target Scope</span>
              <p style={{ fontWeight: 500 }}>{module.targetGroup || 'General Demographics'}</p>
            </div>
            <div>
              <span style={{ color: '#8d8d8d' }}>Status Lifecycle</span>
              <div><Tag type={module.status === 'ACTIVE' ? 'success' : 'warning'}>{module.status}</Tag></div>
            </div>
          </div>
        </Stack>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button renderIcon={() => <Launch size={16} />} onClick={() => onEdit(module.id)} style={{ width: '100%' }}>
          Open Module Editor
        </Button>
        <Button kind="secondary" onClick={() => alert("Blueprint configuration layout duplicated.")} style={{ width: '100%' }}>
          Duplicate Module Node
        </Button>
      </div>
    </div>
  );
}
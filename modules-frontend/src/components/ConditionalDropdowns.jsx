import React, { useEffect } from 'react';
import { Dropdown } from '@carbon/react';

const HIERARCHY_MAP = {
  'Workshop': {
    programs: ['Mind Matters Jr.', 'Teen Resiliency Core', 'Campus Mindfulness Lab'],
    categories: ['CBSE', 'International Baccalaureate', 'State Board Development']
  },
  'Counseling Program': {
    programs: ['Individual Intake Pathway', 'Crisis Stabilization Net'],
    categories: ['Clinical Intervention', 'Academic Consultation']
  },
  'Educational Content': {
    programs: ['Self-Guided Toolkits', 'Video Masterclass Series'],
    categories: ['Stress Management', 'Anxiety Grounding', 'Sleep Hygiene']
  }
};

export default function ConditionalDropdowns({ values, setFieldValue, errors, touched }) {
  
  const handleComponentChange = ({ selectedItem }) => {
    setFieldValue('serviceComponent', selectedItem);
    // Reset child dependent nodes instantly upon parent mutation
    setFieldValue('programName', '');
    setFieldValue('category', '');
  };

  const currentOptions = HIERARCHY_MAP[values.serviceComponent] || { programs: [], categories: [] };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Primary Dropdown Component - Custom Style Rules Embedded */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', width: '391px' }}>
        <Dropdown
          id="serviceComponent"
          titleText="Service Component Type"
          label="Choose option"
          items={Object.keys(HIERARCHY_MAP)}
          selectedItem={values.serviceComponent || null}
          onChange={handleComponentChange}
          style={{ background: '#F4F4F4', height: '40px' }}
        />
      </div>

      {/* Dependent Program Context Dropdown */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', width: '391px' }}>
        <Dropdown
          id="programName"
          titleText="Program Context Framework"
          label={values.serviceComponent ? "Choose sub-program" : "Awaiting Service Component selection..."}
          items={currentOptions.programs}
          selectedItem={values.programName || null}
          onChange={({ selectedItem }) => setFieldValue('programName', selectedItem)}
          disabled={!values.serviceComponent}
          style={{ background: '#F4F4F4', height: '40px' }}
        />
      </div>

      {/* Dependent Taxonomy Category Dropdown */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', width: '391px' }}>
        <Dropdown
          id="category"
          titleText="Category Tracking Classification Domain"
          label={values.programName ? "Choose classification group" : "Awaiting Program selection..."}
          items={currentOptions.categories}
          selectedItem={values.category || null}
          onChange={({ selectedItem }) => setFieldValue('category', selectedItem)}
          disabled={!values.programName}
          style={{ background: '#F4F4F4', height: '40px' }}
        />
      </div>
    </div>
  );
}
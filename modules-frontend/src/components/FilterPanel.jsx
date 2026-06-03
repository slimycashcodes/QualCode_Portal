import React from 'react';
import { Stack, Select, SelectItem, Button, Loading } from '@carbon/react';
const CATEGORIES = ['Educational Content', 'Support Groups', 'Workshops', 'Crisis Resources'];
const STATUSES = ['ACTIVE', 'UNDER_REVIEW', 'ARCHIVED'];

// Inside FilterPanel component, make sure text matches:
<h4 style={{ marginBottom: '1.5rem' }}>Filter Directory</h4>

export default function FilterPanel({ filters, setFilters, onApply, onClear, isOpen }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', right: 0, top: '3rem', bottom: 0, width: '320px',
      background: '#fff', borderLeft: '1px solid #e0e0e0', zIndex: 9000, padding: '2rem',
      boxShadow: '-4px 0 16px rgba(0,0,0,0.1)'
    }}>
<h4 style={{ marginBottom: '1.5rem' }}>Filter Directory</h4>      <Stack gap={6}>
        <Select
          id="filter-category"
          labelText="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <SelectItem value="" text="Choose option" />
          {CATEGORIES.map(c => <SelectItem key={c} value={c} text={c} />)}
        </Select>

        <Select
          id="filter-status"
          labelText="Status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <SelectItem value="" text="Choose option" />
          {STATUSES.map(s => <SelectItem key={s} value={s} text={s} />)}
        </Select>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Button kind="secondary" onClick={onClear} style={{ width: '50%' }}>Reset</Button>
          <Button kind="primary" onClick={onApply} style={{ width: '50%' }}>Apply</Button>
        </div>
      </Stack>
    </div>
  );
}
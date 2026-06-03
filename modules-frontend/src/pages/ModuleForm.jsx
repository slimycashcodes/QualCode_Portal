import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextArea, Select, SelectItem, Button, Stack, ActionableNotification, Loading } from '@carbon/react';
import { useNavigate, useParams } from 'react-router-dom';
import { moduleService } from '../services/api';
import ConditionalDropdowns from '../components/ConditionalDropdowns';

const ModuleSchema = Yup.object().shape({
  name: Yup.string().required('Resource program title identity is required.'),
  description: Yup.string().required('Provide an explicit structural description profile.'),
  serviceComponent: Yup.string().required('Parent structural component path selection is required.'),
  programName: Yup.string().required('Program classification is required.'),
  category: Yup.string().required('Target category domain grouping mapping is required.')
});

export default function ModuleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [initialValues, setInitialValues] = useState({
    name: '', description: '', category: '', status: 'PENDING_REVIEW',
    tags: '', collaborators: '', serviceComponent: '', programName: '', targetGroup: '12th Grade'
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      moduleService.getById(id)
        .then(res => {
          const data = res.data;
          setInitialValues({
            ...data,
            tags: data.tags ? data.tags.join(', ') : '',
            collaborators: data.collaborators ? data.collaborators.join(', ') : ''
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formattedPayload = {
      ...values,
      tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      collaborators: values.collaborators ? values.collaborators.split(',').map(c => c.trim()).filter(Boolean) : []
    };

    try {
      if (id) {
        await moduleService.update(id, formattedPayload);
      } else {
        await moduleService.create(formattedPayload);
      }
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      alert("Pipeline compilation transmission block fault.");
    } finally { setSubmitting(false); }
  };

  if (loading) return <Loading />;

  return (
    <div className="form-container" style={{ maxWidth: '800px', background: '#fff', padding: '2rem' }}>
      <h3>{id ? 'Refactor Clinical Program Definition Blueprint' : 'Synthesize Novel Operations Module'}</h3>
      <p style={{ color: '#525252', marginBottom: '2rem' }}>Configure systemic resource attributes using architectural cascade controls.</p>
      
      {success && <ActionableNotification kind="success" inline title="Data Matrix Synced" subtitle="Changes committed safely to MongoDB collection records." />}

      <Formik initialValues={initialValues} validationSchema={ModuleSchema} enableReinitialize onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap={6}>
              <TextInput id="name" name="name" labelText="Program Resource Title" value={values.name} onChange={handleChange} onBlur={handleBlur} invalid={touched.name && !!errors.name} invalidText={errors.name} />
              <TextArea id="description" name="description" labelText="Objective Scope & Detailed Summary Description" value={values.description} onChange={handleChange} onBlur={handleBlur} invalid={touched.description && !!errors.description} invalidText={errors.description} />
              
              {/* Inserted Cascading Dropdown Architecture Field Controls */}
              <ConditionalDropdowns values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />

              <Select id="targetGroup" name="targetGroup" labelText="Target Demographic Age Cohort Group" value={values.targetGroup} onChange={handleChange}>
                <SelectItem value="10th Grade" text="10th Grade Cohort Segment" />
                <SelectItem value="11th Grade" text="11th Grade Cohort Segment" />
                <SelectItem value="12th Grade" text="12th Grade Cohort Segment" />
                <SelectItem value="College UG" text="University Undergrad Student Demographics" />
              </Select>

              <TextInput id="tags" name="tags" labelText="Search Key Classification Routing Keywords (Comma-separated)" placeholder="anxiety, coping, mindfulness" value={values.tags} onChange={handleChange} />
              <TextInput id="collaborators" name="collaborators" labelText="Author Leads / Verified Clinical Contributors (Comma-separated)" placeholder="Saranya Loganathan, Rashika Jeyakumar" value={values.collaborators} onChange={handleChange} />

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <Button kind="secondary" onClick={() => navigate('/')}>Abort Configurations</Button>
                <Button type="submit" disabled={isSubmitting}>Commit Resource Module</Button>
              </div>
            </Stack>
          </form>
        )}
      </Formik>
    </div>
  );
}
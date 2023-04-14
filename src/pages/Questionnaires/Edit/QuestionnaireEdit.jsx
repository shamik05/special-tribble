/* eslint-disable */
import React from 'react';
import {
  Box, LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_QUESTIONNAIRE } from '../../../api/questionnaires';
import EditForm from './EditForm';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem auto',
  maxWidth: '600px',
});

function QuestionnaireEdit() {
  const { questionnaireId } = useParams();
  const { data, loading, error } = useQuery(FETCH_QUESTIONNAIRE, { variables: { id: questionnaireId } });

  if (loading) return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );

  if (error) {
    return (
      <Box sx={{ width: '100%' }}>
        Error:
        {' '}
        {error?.message}
      </Box>
    );
  }

  const { questionnaire } = data;
  if (!questionnaire) redirect('/home')

  return (
    <Container>
      <EditForm questionnaire={questionnaire} />
    </Container>
  );
}

export default QuestionnaireEdit;

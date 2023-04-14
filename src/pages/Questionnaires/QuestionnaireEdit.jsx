import React from 'react';
import {
  Box, LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_QUESTIONNAIRE } from '../../api/questionnaires';
import EditHeader from './QuestionnaireEdit/EditHeader';
import EditForm from './QuestionnaireEdit/EditForm';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem auto',
  maxWidth: '1000px',
});

function QuestionnaireEdit() {
  const { questionnaireId } = useParams();
  const { data, loading, error } = useQuery(
    FETCH_QUESTIONNAIRE,
    { variables: { id: questionnaireId } },
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

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
  if (!questionnaire) redirect('/home');

  return (
    <Container>
      <EditHeader questionnaire={questionnaire} />
      <EditForm
        questions={questionnaire.questions}
        order={questionnaire.questionsOrder}
        questionnaireId={questionnaire.id}
      />
    </Container>
  );
}

export default QuestionnaireEdit;

import React from 'react';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import {
  Box, LinearProgress, Button,
} from '@mui/material';
import { FETCH_QUESTIONNAIRE } from '../../api/questionnaires';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem auto',
  maxWidth: '1000px',
});

function QuestionnaireComplete() {
  const { questionnaireId } = useParams();
  const navigate = useNavigate();
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
      <Button
        type="button"
        variant="contained"
        sx={{ mr: 1 }}
        onClick={navigate(-1)}
      >
        Previous
      </Button>

      <Button
        type="button"
        variant="contained"
        onClick={navigate(+1)}
      >
        Next
      </Button>
    </Container>
  );
}

export default QuestionnaireComplete;

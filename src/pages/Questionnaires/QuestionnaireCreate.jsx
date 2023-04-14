import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box, Button, TextField,
} from '@mui/material';
import { Create, ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FETCH_QUESTIONNAIRES, INSERT_QUESTIONNAIRE } from '../../api/questionnaires';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem auto',
  maxWidth: '600px',
});

function QuestionnaireCreate() {
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { isDirty, isValid, isSubmitting } } = useForm({
    defaultValues: {
      questionnaireName: 'Untitled Questionnaire',
      questionnaireDescription: '',
    },
  });

  const [insertQuestionnaire, { loading, called, error }] = useMutation(INSERT_QUESTIONNAIRE, {
    onCompleted: () => { navigate('/home'); },
    refetchQueries: [{ query: FETCH_QUESTIONNAIRES }],
  });

  const onSubmit = (data) => {
    const obj = {
      name: data.questionnaireName.trim(),
      description: data.questionnaireDescription.trim(),
    };

    insertQuestionnaire({
      variables: {
        obj,
      },
    });
  };

  let buttonText;
  if (error) {
    buttonText = 'Error during creation';
  } else if (isSubmitting || loading || called) {
    buttonText = 'Creating Questionnaire';
  } else {
    buttonText = 'Create New Questionnaire';
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box sx={{ width: '100%', marginBottom: '1rem' }}>
          <Controller
            render={({ field }) => (
              <TextField
                required
                fullWidth
                id="questionnaireName"
                label="Questionnaire Name"
                {...field}
              />
            )}
            name="questionnaireName"
            control={control}
          />
        </Box>
        <Box sx={{ width: '100%', marginBottom: '1rem' }}>
          <Controller
            render={({ field }) => (
              <TextField
                fullWidth
                id="questionnaireDescription"
                label="Questionnaire Description"
                {...field}
              />
            )}
            name="questionnaireDescription"
            control={control}
          />
        </Box>
        <Button
          startIcon={<Create />}
          disabled={!isDirty || !isValid}
          variant="contained"
          type="submit"
          color={error && 'error'}
        >
          {buttonText}
        </Button>

        <Button startIcon={<ArrowBack />} variant="contained" onClick={() => navigate('/home')} style={{ marginLeft: '1rem' }}>
          Go Back
        </Button>
      </form>
    </Container>
  );
}

export default QuestionnaireCreate;

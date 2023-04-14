import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box, TextField, Paper, Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Save } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { UPDATE_QUESTIONNAIRE } from '../../../api/questionnaires';

const QuestionItem = styled(Paper)({
  padding: '1rem',
  marginBottom: '1rem',
  width: '100%',
  borderTop: '16px solid rgb(103, 58, 183)',
});

function EditHeader({ questionnaire }) {
  const { handleSubmit, control, formState: { isDirty, isValid, isSubmitting } } = useForm({
    values: {
      questionnaireName: questionnaire?.name,
      questionnaireDescription: questionnaire?.description,
    },
  });

  const [updateQuestionnaire, { loading, error }] = useMutation(UPDATE_QUESTIONNAIRE);

  const onSubmit = (data) => {
    const obj = {
      name: data.questionnaireName.trim(),
      description: data.questionnaireDescription.trim(),
    };

    updateQuestionnaire({
      variables: {
        id: questionnaire.id,
        obj,
      },
    });
  };

  let buttonText;
  if (error) {
    buttonText = 'Error during Save';
  } else if (isSubmitting || loading) {
    buttonText = 'Saving';
  } else {
    buttonText = 'Save';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      {/* Handle Questionnaire Name and Description */}
      <QuestionItem elevation={3}>
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
          startIcon={<Save />}
          disabled={!isDirty || !isValid}
          variant="contained"
          type="submit"
          color={error && 'error'}
        >
          {buttonText}
        </Button>
      </QuestionItem>
    </form>
  );
}

export default EditHeader;

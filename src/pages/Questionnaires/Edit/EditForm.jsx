/* eslint-disable */
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box, TextField, Select, MenuItem, Checkbox, FormControlLabel, Button, Icon, Divider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ShortText, Subject, CheckBox,
} from '@mui/icons-material';
import { UPDATE_QUESTIONNAIRE } from '../../../api/questionnaires';
import { useMutation } from '@apollo/client';

const QuestionItem = styled(Paper)({
  padding: '1rem',
  marginBottom: '1rem',
  width: '100%',
});

function EditForm({ questionnaire }) {
  console.log(questionnaire);
  const { handleSubmit, control, formState: { isDirty, isValid, isSubmitting } } = useForm({
    // defaultValues: {
    //   questionName: '',
    //   questionType: 'shortAnswer',
    //   required: false,
    // },
    values: {
      questionnaireName: questionnaire?.name,
      questionnaireDescription: questionnaire?.description
    },
  });

  const [updateQuestionnaire, { loading, called, error }] = useMutation(UPDATE_QUESTIONNAIRE);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      {/* Handle Questionnaire Name and Description */}
      <QuestionItem elevation={2} sx={{ borderTop: '16px solid rgb(103, 58, 183)'}}>
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
      </QuestionItem>

      <QuestionItem elevation={2}>
        <Box sx={{ width: '100%', marginBottom: '1rem' }}>
          <Controller
            render={({ field }) => (
              <TextField
                required
                fullWidth
                id="questionName"
                label="Question"
                placeholder='Type your Question'
                {...field}
              />
            )}
            name="questionName"
            control={control}
          />
        </Box>

        <Box sx={{ width: '100%', marginBottom: '1rem' }}>
          <Controller
            render={({ field }) => (
              <Select
                fullWidth
                labelId="questionType-label"
                id="questionType"
                defaultValue="shortAnswer"
                {...field}
              >
                <MenuItem value="shortAnswer">
                  <Icon sx={{ mr: 1 }}><ShortText /></Icon>
                  Short Answer
                </MenuItem>
                <MenuItem value="paragraph">
                  <Icon sx={{ mr: 1 }}><Subject /></Icon>
                  Paragraph
                </MenuItem>
                <Divider />
                <MenuItem value="multipleChoice">
                  <Icon sx={{ mr: 1 }}><CheckBox /></Icon>
                  Multiple Choice
                </MenuItem>
              </Select>
            )}
            name="questionType"
            control={control}
          />
        </Box>

        <Box sx={{ width: '100%', marginBottom: '1rem' }}>
          <FormControlLabel
            control={(
              <Controller
                render={({ field }) => (
                  <Checkbox
                    id="required"
                    {...field}
                  />
                )}
                name="required"
                control={control}
              />
              )}
            label="Required"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || !isDirty || isSubmitting}
        >
          Add Question
        </Button>

      </QuestionItem>
    </form>
  );
}

export default EditForm;

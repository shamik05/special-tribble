import React from 'react';
import { styled } from '@mui/material/styles';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Paper, Box, TextField, Select, MenuItem, Icon, Divider, FormControlLabel, Button, Checkbox,
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import {
  ShortText, Subject, CheckBox, DragHandle,
} from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { DELETE_QUESTION, UPDATE_QUESTION } from '../../../api/questions';
import { FETCH_QUESTIONNAIRE } from '../../../api/questionnaires';

const QuestionItem = styled(Paper)({
  padding: '1rem',
  marginBottom: '1rem',
  width: '100%',
  borderLeft: '8px solid #4285f4',
});

function SortableItem({ id, question, questionsOrder }) {
  // Check if question includes options
  const values = {
    questionName: question.question,
    questionType: question.type,
    required: question.required,
  };

  if (question.type === 'multipleChoice') {
    values.options = question.options.join('; ');
    // console.log(values);
  }

  const {
    handleSubmit, control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm({
    values,
  });
  // const watchType = watch('questionType');
  const watchType = useWatch({ control, name: 'questionType' });

  const [updateQuestion, { loading, error }] = useMutation(UPDATE_QUESTION);
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [{ query: FETCH_QUESTIONNAIRE, variables: { id: question.questionnaireId } }],
  });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = (data) => {
    const {
      questionName, questionType, required, options,
    } = data;
    const obj = {
      question: questionName.trim(),
      type: questionType.trim(),
      required,
    };
    if (question.type === 'multipleChoice') obj.options = options.split('; ');

    updateQuestion({
      variables: {
        id,
        obj,
      },
    });
  };

  const handleDelete = () => {
    deleteQuestion({
      variables: {
        questionId: question.id,
        questionnaireId: question.questionnaireId,
        questionsOrder: questionsOrder.filter((e) => e !== question.id),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <div ref={setNodeRef} style={style}>
        <QuestionItem elevation={2}>
          {/* Drag Handle */}
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '1rem',
          }}
          >
            <DragHandle
              style={{
                cursor: 'grab',
                fontSize: '2rem',
                width: '2rem',
              }}
              {...attributes}
              {...listeners}
            />
          </Box>

          {/* Question Name */}
          <Box sx={{ width: '100%', marginBottom: '1rem' }}>
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  id="questionName"
                  label="Question"
                  placeholder="Type your Question"
                  {...field}
                />
              )}
              name="questionName"
              control={control}
            />
          </Box>

          {/* Question Type */}
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

          {/* Options for Multiple Choice Selection */}
          {
            watchType === 'multipleChoice' && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Choices"
                      placeholder="Type your choices seperated by semicolon. EX: choice1;choice2"
                      {...field}
                    />
                  )}
                  name="options"
                  control={control}
                />
              </Box>
            )
          }

          {/* Required Checkbox */}
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

          {/* Form Controls */}
          <Divider sx={{ width: '100%', marginBottom: '1rem' }} />
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || !isDirty || isSubmitting}
            sx={{ mr: 1 }}
          >
            Save
            {' '}
            { id }
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={handleDelete}
          >
            Remove
          </Button>
        </QuestionItem>

      </div>
    </form>
  );
}

export default SortableItem;

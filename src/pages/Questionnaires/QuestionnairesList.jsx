import React, { useState } from 'react';
import {
  Card, CardContent, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction,
  ListItemText, Typography, Tooltip, Fab, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, DialogContentText, LinearProgress, Box,
} from '@mui/material';
import {
  Delete, Edit, Share, Add, Publish,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { DELETE_QUESTIONNAIRE, FETCH_QUESTIONNAIRES } from '../../api/questionnaires';

function QuestionnairesList() {
  const navigate = useNavigate();
  const { data, loading: queryLoading, error: queryError } = useQuery(FETCH_QUESTIONNAIRES);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteConfirmationValue, setDeleteConfirmationValue] = useState('');
  const [questionnaireToDelete, setQuestionnaireToDelete] = useState(null);

  const [deleteQuestionnaire] = useMutation(DELETE_QUESTIONNAIRE, {
    refetchQueries: [{ query: FETCH_QUESTIONNAIRES }],
  });

  const handleDeleteConfirmationOpen = (id) => {
    setQuestionnaireToDelete(id);
    setDeleteConfirmationValue('');
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
    setQuestionnaireToDelete(null);
  };

  const handleDeleteConfirmationValueChange = (event) => {
    setDeleteConfirmationValue(event.target.value);
  };

  const handleDeleteQuestionnaire = () => {
    if (deleteConfirmationValue === questionnaireToDelete.name) {
      deleteQuestionnaire({
        variables: {
          id: questionnaireToDelete.id,
        },
      });
      handleDeleteConfirmationClose();
    }
  };

  const handleActionClick = (id) => (event) => {
    const label = event.currentTarget.getAttribute('aria-label');

    if (label === 'Edit') {
      navigate(`../edit/${id}`);
    } else if (label === 'Delete') {
      deleteQuestionnaire({
        variables: {
          id,
        },
      });
    }
  };

  if (queryLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }
  if (queryError) {
    return (
      <Box sx={{ width: '100%' }}>
        Error:
        {' '}
        {queryError.message}
      </Box>
    );
  }

  const { questionnaires } = data;

  return (
    <Grid container component="main" spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Questionnaires</Typography>
            {questionnaires.length === 0 ? (
              <Typography variant="subtitle1">No questionnaires yet! Click + to create a new questionnaire</Typography>
            ) : (
              <List>
                {questionnaires.map((questionnaire) => (
                  <ListItem
                    key={questionnaire.id}
                    sx={{
                      '&:hover': { bgcolor: 'grey.100', cursor: 'pointer' },
                    }}
                    aria-label={`Questionnaire: ${questionnaire.name}`}
                    role="button"
                    tabIndex="0"
                    onClick={(e) => navigate(`../edit/${questionnaire.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar>{questionnaire.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={questionnaire.name}
                      secondary={questionnaire.description}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="Edit"
                          onClick={handleActionClick(questionnaire.id)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Publish">
                        <IconButton
                          aria-label="Publish"
                          onClick={handleActionClick(questionnaire.id)}
                        >
                          <Publish />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton aria-label="Delete" onClick={handleActionClick(questionnaire.id)}>
                          {/* <IconButton aria-label="Delete"
                          onClick={() =>
                          handleDeleteConfirmationOpen(questionnaire.id, questionnaire.name)}> */}
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton
                          aria-label="Share"
                          onClick={handleActionClick(questionnaire.id)}
                        >
                          <Share />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>

                    <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                      <DialogTitle>Delete Questionnaire</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To confirm your deletion, please type the quesionnaire name
                          {' '}
                          <b><i>{deleteConfirmationValue}</i></b>
                          {' '}
                          in the field below
                        </DialogContentText>
                        <TextField
                          label="delete"
                          value={deleteConfirmationValue}
                          onChange={handleDeleteConfirmationValueChange}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
                        <Button onClick={handleDeleteQuestionnaire} variant="contained" color="error">Delete</Button>
                      </DialogActions>
                    </Dialog>

                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>

          <Tooltip title="Create new questionnaire" aria-label="Create new questionnaire">
            <Fab sx={{ position: 'absolute', bottom: 16, right: 16 }} color="primary" href="/create">
              <Add />
            </Fab>
          </Tooltip>

        </Card>
      </Grid>
    </Grid>
  );
}

export default QuestionnairesList;

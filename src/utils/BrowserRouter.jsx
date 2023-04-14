import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import ErrorPage from '../pages/ErrorPage';
import QuestionnairesList from '../pages/Questionnaires/QuestionnairesList';
import QuestionnaireCreate from '../pages/Questionnaires/QuestionnaireCreate';
import QuestionForm from '../pages/Questionnaires/QuestionnaireEdit';
import QuestionnaireComplete from '../pages/Questionnaires/QuestionnaireComplete';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <QuestionnairesList />,
      },
      {
        path: '/create',
        element: <QuestionnaireCreate />,
      },
      {
        path: '/:questionnaireId/edit',
        element: <QuestionForm />,
      },
      {
        path: '/:questionnaireId/complete',
        element: <QuestionnaireComplete />,
      },
    ],
  },
]);

export default router;

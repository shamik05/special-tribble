import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import ErrorPage from '../pages/ErrorPage';
import QuestionnairesList from '../pages/Questionnaires/QuestionnairesList';
import QuestionnaireCreate from '../pages/Questionnaires/QuestionnaireCreate';
import QuestionForm from '../pages/Questionnaires/Edit/QuestionnaireEdit';

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
        path: '/edit/:questionnaireId',
        element: <QuestionForm />,
      },
    ],
  },
]);

export default router;

import { gql } from '@apollo/client';
import { FRAGMENT_QUESTIONS } from './questions';

const FRAGMENT_QUESTIONNAIRES = gql`
fragment FragmentQuestionnaires on borderbass_questionnaires {
  id
  name
  description
  published
  updatedAt: updated_at
  createdAt: created_at
}`;

const FETCH_QUESTIONNAIRES = gql`
query FetchQuestionnaires {
  questionnaires: borderbass_questionnaires (order_by: {updated_at: desc}) {
    ...FragmentQuestionnaires
  }
}
${FRAGMENT_QUESTIONNAIRES}
`;

const FETCH_QUESTIONNAIRE = gql`
query FetchQuestionnaires($id: String!) {
  questionnaire: borderbass_questionnaires_by_pk(id: $id) {
    ...FragmentQuestionnaires
    questionsOrder: questions_order
    questions {
      ...FragmentQuestions
    }
  }
}
${FRAGMENT_QUESTIONNAIRES}
${FRAGMENT_QUESTIONS}
`;

const INSERT_QUESTIONNAIRE = gql`
mutation InsertQuestionnaire($obj: borderbass_questionnaires_insert_input!) {
  insertQuestionnaire: insert_borderbass_questionnaires_one(object: $obj) {
    ...FragmentQuestionnaires
  }
}
${FRAGMENT_QUESTIONNAIRES}
`;

const DELETE_QUESTIONNAIRE = gql`
mutation DeleteQuestionnaire($id: String!) {
  deleteQuestionnaire: delete_borderbass_questionnaires_by_pk(id: $id) {
    ...FragmentQuestionnaires
  }
}
${FRAGMENT_QUESTIONNAIRES}
`;

const UPDATE_QUESTIONNAIRE = gql`
mutation UPDATE_QUESTIONNAIRE($id: String!, $obj: borderbass_questionnaires_set_input) {
  questionnaire: update_borderbass_questionnaires_by_pk(pk_columns: {id: $id}, _set: $obj) {
    ...FragmentQuestionnaires
    questionsOrder: questions_order
    questions {
      ...FragmentQuestions
    }
  }
}
${FRAGMENT_QUESTIONNAIRES}
${FRAGMENT_QUESTIONS}
`;

export {
  FETCH_QUESTIONNAIRES, FRAGMENT_QUESTIONNAIRES, INSERT_QUESTIONNAIRE, DELETE_QUESTIONNAIRE,
  FETCH_QUESTIONNAIRE, UPDATE_QUESTIONNAIRE,
};

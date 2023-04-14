import { gql } from '@apollo/client';

const FRAGMENT_QUESTIONS = gql`
fragment FragmentQuestions on borderbass_questions {
  id
  question
  type
  options
  required
  questionnaireId: questionnaire_id
  updatedAt: updated_at
  createdAt: created_at
}`;

const INSERT_QUESTION = gql`
mutation INSERT_QUESTION($obj: borderbass_questions_insert_input!) {
  question: insert_borderbass_questions_one(object: $obj) {
    ...FragmentQuestion
  }
}
${FRAGMENT_QUESTIONS}
`;

const UPDATE_QUESTION = gql`
mutation UPDATE_QUESTION($id: Int!, $obj: borderbass_questions_set_input) {
  question: update_borderbass_questions_by_pk(pk_columns: {id: $id}, _set: $obj) {
    ...FragmentQuestions
  }
}
${FRAGMENT_QUESTIONS}
`;

const DELETE_QUESTION = gql`
mutation DELETE_QUESTION($questionId: Int!, $questionsOrder: jsonb, $questionnaireId: String!) {
  question: delete_borderbass_questions_by_pk(id: $questionId) {
    id
  }
  questionnaire: update_borderbass_questionnaires_by_pk(pk_columns: {id: $questionnaireId}, _set: {questions_order: $questionsOrder}) {
    id
  }
}
`;

export {
  UPDATE_QUESTION, INSERT_QUESTION, FRAGMENT_QUESTIONS, DELETE_QUESTION,
};

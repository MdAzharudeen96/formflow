import { sendSuccess } from '../utils/apiResponse.js';
import {
  createDraft,
  getPublicForm,
  getSubmission,
  submitSubmission,
} from '../services/submissionService.js';

export async function getPublicFormController(request, response) {
  const form = await getPublicForm(request.params.id);
  return sendSuccess(response, 'Form fetched successfully', { form });
}

export async function createSubmission(request, response) {
  const submission = await createDraft(request.body?.formId, request.body?.data);
  return sendSuccess(response, 'Draft saved successfully', { submission });
}

export async function getSubmissionController(request, response) {
  const submission = await getSubmission(request.params.id);
  return sendSuccess(response, 'Submission fetched successfully', { submission });
}

export async function submitSubmissionController(request, response) {
  const submission = await submitSubmission(request.params.id);
  return sendSuccess(response, 'Form submitted successfully', { submission });
}

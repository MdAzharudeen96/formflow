import { sendSuccess } from '../utils/apiResponse.js';
import {
  getPublicForm,
  createDraft,
  getSubmission,
  submitSubmission,
  getAdminSubmissions,
  getAdminSubmission,
  approveSubmission,
  rejectSubmission,
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

export async function getAdminSubmissionsController(request, response) {
  const submissions = await getAdminSubmissions();

  return response.json({
    success: true,
    data: submissions,
  });
}

export async function getAdminSubmissionController(request, response) {
  const submission = await getAdminSubmission(request.params.id);

  if (!submission) {
    return response.status(404).json({
      success: false,
      message: 'Submission not found',
    });
  }

  return response.json({
    success: true,
    data: submission,
  });
}

export async function approveSubmissionController(request, response) {
  const submission = await approveSubmission(request.params.id);

  return response.json({
    success: true,
    message: 'Submission approved successfully',
    data: submission,
  });
}

export async function rejectSubmissionController(request, response) {
  const submission = await rejectSubmission(request.params.id, request.body?.comment);

  return response.json({
    success: true,
    message: 'Submission rejected successfully',
    data: submission,
  });
}

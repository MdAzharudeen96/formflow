import { sendSuccess } from '../utils/apiResponse.js';
import { createForm, getForm, listForms, updateForm } from '../services/formService.js';

export async function getForms(request, response) {
  const forms = await listForms(request.user.userId);
  return sendSuccess(response, 'Forms fetched successfully', { forms });
}

export async function createFormController(request, response) {
  const form = await createForm(request.user.userId, request.body ?? {});
  return sendSuccess(response, 'Form created successfully', { form });
}

export async function getFormController(request, response) {
  const form = await getForm(request.user.userId, request.params.id);
  return sendSuccess(response, 'Form fetched successfully', { form });
}

export async function updateFormController(request, response) {
  const form = await updateForm(request.user.userId, request.params.id, request.body ?? {});
  return sendSuccess(response, 'Form updated successfully', { form });
}

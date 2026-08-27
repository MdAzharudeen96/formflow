import mongoose from 'mongoose';
import Form from '../models/Form.js';
import Submission from '../models/Submission.js';

function validationError(message) {
  return Object.assign(new Error(message), { statusCode: 400 });
}

function getFormId(formId) {
  if (!mongoose.isValidObjectId(formId)) {
    throw Object.assign(new Error('Form not found'), { statusCode: 404 });
  }

  return formId;
}

function validateData(form, data, requireRequiredFields) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw validationError('Submission data must be an object');
  }

  const fieldIds = new Set(form.fields.map((field) => field._id.toString()));
  const unknownField = Object.keys(data).find((fieldId) => !fieldIds.has(fieldId));
  if (unknownField) {
    throw validationError('Submission contains an unknown field');
  }

  if (requireRequiredFields) {
    for (const field of form.fields) {
      const value = data[field._id.toString()];
      if (field.required && (value === undefined || value === null || String(value).trim() === '')) {
        throw validationError(`${field.label} is required`);
      }
    }
  }

  for (const field of form.fields) {
    const value = data[field._id.toString()];
    if (value === undefined || value === null || value === '') continue;
    if (field.type === 'number' && Number.isNaN(Number(value))) {
      throw validationError(`${field.label} must be a number`);
    }
    if (field.type === 'dropdown' && !field.options.includes(String(value))) {
      throw validationError(`${field.label} has an invalid option`);
    }
  }
}

function normalizeData(form, data) {
  return Object.fromEntries(Object.entries(data).map(([fieldId, value]) => {
    const field = form.fields.id(fieldId);
    return [fieldId, field?.type === 'number' && value !== '' ? Number(value) : value];
  }));
}

async function ensureFieldIds(form) {
  const storedForm = await Form.collection.findOne(
    { _id: form._id },
    { projection: { fields: 1 } },
  );
  const missingIds = storedForm?.fields?.some((field) => !field._id);
  if (!missingIds) return form;

  form.fields = form.fields.map((field) => ({
    ...field.toObject(),
    _id: field._id ?? new mongoose.Types.ObjectId(),
  }));
  form.markModified('fields');
  await form.save();
  return form;
}

export async function getPublicForm(formId) {
  const form = await Form.findById(getFormId(formId));
  if (!form) throw Object.assign(new Error('Form not found'), { statusCode: 404 });
  await ensureFieldIds(form);

  return {
    id: form._id,
    title: form.title,
    description: form.description,
    fields: form.fields,
  };
}

export async function createDraft(formId, data) {
  const form = await Form.findById(getFormId(formId));

  if (!form) {
    throw Object.assign(new Error('Form not found'), {
      statusCode: 404,
    });
  }

  validateData(form, data, false);

  return Submission.create({
    formId: form._id,
    data: normalizeData(form, data),
    status: 'draft',
    draftAt: new Date(),
  });
}

export async function updateSubmission(submissionId, data) {
  const submission = await getSubmission(submissionId);

  if (!['draft', 'rejected'].includes(submission.status)) {
    throw validationError(
      'Only draft or rejected submissions can be edited'
    );
  }

  const form = await Form.findById(submission.formId);

  if (!form) {
    throw Object.assign(new Error('Form not found'), {
      statusCode: 404,
    });
  }

  validateData(form, data, false);

  submission.data = normalizeData(form, data);

  // Editing a rejected submission moves it back to draft.
  submission.status = 'draft';
  submission.draftAt = new Date();

  await submission.save();

  return submission;
}

export async function getSubmission(submissionId) {
  if (!mongoose.isValidObjectId(submissionId)) {
    throw Object.assign(new Error('Submission not found'), { statusCode: 404 });
  }

  const submission = await Submission.findById(submissionId);
  if (!submission) throw Object.assign(new Error('Submission not found'), { statusCode: 404 });
  return submission;
}

export async function submitSubmission(submissionId) {
  const submission = await getSubmission(submissionId);
  const form = await Form.findById(submission.formId);
  if (!form) throw Object.assign(new Error('Form not found'), { statusCode: 404 });
  validateData(form, submission.data, true);

  submission.status = 'submitted';
  submission.submittedAt = new Date();

  return submission.save();
}

export async function getAdminSubmissions() {
  return Submission.find()
    .populate('formId', 'title')
    .sort({ createdAt: -1 });
}

export async function getAdminSubmission(submissionId) {
  return Submission.findById(submissionId)
    .populate('formId', 'title fields');
}

export async function approveSubmission(submissionId) {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    const error = new Error('Submission not found');
    error.statusCode = 404;
    throw error;
  }

  if (submission.status !== 'submitted') {
    const error = new Error('Only submitted forms can be approved');
    error.statusCode = 400;
    throw error;
  }

  submission.status = 'approved';
  submission.approvedAt = new Date();

  await submission.save();

  return submission;
}

export async function rejectSubmission(submissionId, comment) {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    const error = new Error('Submission not found');
    error.statusCode = 404;
    throw error;
  }

  if (submission.status !== 'submitted') {
    const error = new Error('Only submitted forms can be rejected');
    error.statusCode = 400;
    throw error;
  }

  if (!comment?.trim()) {
    const error = new Error('Rejection comment is required');
    error.statusCode = 400;
    throw error;
  }

  submission.rejectionComment = comment.trim();
  submission.status = 'rejected';
  submission.rejectedAt = new Date();

  await submission.save();

  return submission;
}

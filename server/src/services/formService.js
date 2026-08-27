import mongoose from 'mongoose';
import Form from '../models/Form.js';
import Submission from '../models/Submission.js';

const allowedFieldTypes = new Set(['text', 'number', 'dropdown', 'date']);

function createValidationError(message) {
  return Object.assign(new Error(message), { statusCode: 400 });
}

function validateFormInput({ title, fields }) {
  if (typeof title !== 'string' || !title.trim()) {
    throw createValidationError('Form title is required');
  }

  if (!Array.isArray(fields) || fields.length === 0) {
    throw createValidationError(
      'At least one field is required to create a form'
    );
  }

  fields.forEach((field) => {
    if (!field || typeof field.label !== 'string' || !field.label.trim()) {
      throw createValidationError('Field label is required');
    }

    if (!allowedFieldTypes.has(field.type)) {
      throw createValidationError('Field type is invalid');
    }

    if (field.type === 'dropdown' && (!Array.isArray(field.options) || field.options.length === 0 || field.options.some((option) => typeof option !== 'string' || !option.trim()))) {
      throw createValidationError('Dropdown must have at least one option');
    }
  });
}

function notFoundError() {
  return Object.assign(new Error('Form not found'), { statusCode: 404 });
}

export async function listForms() {
  return Form.find().sort({ createdAt: -1 });
}

export async function createForm(userId, input) {
  validateFormInput(input);

  return Form.create({
    title: input.title.trim(),
    description: typeof input.description === 'string' ? input.description.trim() : '',
    fields: input.fields.map((field) => ({
      label: field.label.trim(),
      type: field.type,
      required: Boolean(field.required),
      ...(field.type === 'dropdown' ? { options: field.options.map((option) => option.trim()) } : {}),
    })),
    createdBy: userId,
  });
}

export async function getForm(userId, formId) {
  if (!mongoose.isValidObjectId(formId)) {
    throw notFoundError();
  }

  const form = await Form.findOne({ _id: formId, createdBy: userId });
  if (!form) {
    throw notFoundError();
  }

  return form;
}

export async function updateForm(userId, formId, input) {
  validateFormInput(input);

  if (!mongoose.isValidObjectId(formId)) {
    throw notFoundError();
  }

  const form = await Form.findOne({ _id: formId, createdBy: userId });
  if (!form) {
    throw notFoundError();
  }

  form.title = input.title.trim();
  form.description = typeof input.description === 'string' ? input.description.trim() : '';
  form.fields = input.fields.map((field) => ({
    label: field.label.trim(),
    type: field.type,
    required: Boolean(field.required),
    ...(field.type === 'dropdown' ? { options: field.options.map((option) => option.trim()) } : {}),
  }));

  return form.save();
}

export async function deleteForm(userId, formId) {
  if (!mongoose.isValidObjectId(formId)) {
    throw notFoundError();
  }

  const form = await Form.findOne({
    _id: formId,
    createdBy: userId,
  });

  if (!form) {
    throw notFoundError();
  }

  const submissionExists = await Submission.exists({
    formId: form._id,
  });

  if (submissionExists) {
    throw createValidationError(
      'This form cannot be deleted because it has submissions.'
    );
  }

  await Form.deleteOne({ _id: form._id });

  return form;
}

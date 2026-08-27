import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('formflow_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function loginRequest(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function logoutRequest() {
  const { data } = await api.post('/auth/logout');
  return data;
}

export async function getForms() {
  const { data } = await api.get('/forms');
  return data;
}

export async function createForm(form) {
  const { data } = await api.post('/forms', form);
  return data;
}

export async function getForm(formId) {
  const { data } = await api.get(`/forms/${formId}`);
  return data;
}

export async function updateForm(formId, form) {
  const { data } = await api.put(`/forms/${formId}`, form);
  return data;
}

export async function deleteForm(formId) {
  const { data } = await api.delete(`/forms/${formId}`);
  return data;
}

export async function getPublicForm(formId) {
  const { data } = await api.get(`/public/forms/${formId}`);
  return data;
}

export async function createSubmission(submission) {
  const { data } = await api.post('/submissions', submission);
  return data;
}

export async function getSubmission(submissionId) {
  const { data } = await api.get(`/submissions/${submissionId}`);
  return data;
}

export async function submitSubmission(submissionId) {
  const { data } = await api.post(`/submissions/${submissionId}/submit`);
  return data;
}

export async function getAdminSubmissions() {
  const { data } = await api.get('/admin/submissions');
  return data;
}

export async function getAdminSubmission(submissionId) {
  const { data } = await api.get(`/admin/submissions/${submissionId}`);
  return data;
}

export async function approveSubmission(submissionId) {
  const { data } = await api.put(`/admin/submissions/${submissionId}/approve`);
  return data;
}

export async function rejectSubmission(submissionId, comment) {
  const { data } = await api.put(`/admin/submissions/${submissionId}/reject`, {comment});
  return data;
}

export async function updateSubmission(submissionId, data) {
  const { data: response } = await api.put(
    `/submissions/${submissionId}`,
    { data }
  );

  return response;
}
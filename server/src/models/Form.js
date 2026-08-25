import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['shortText', 'longText', 'email', 'number', 'phone', 'date', 'select', 'radio', 'checkbox', 'file'],
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  placeholder: String,
  helpText: String,
  required: {
    type: Boolean,
    default: false,
  },
  options: [String],
  validation: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  order: {
    type: Number,
    required: true,
  },
}, { _id: false });

const formSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'draft',
  },
  fields: {
    type: [fieldSchema],
    default: [],
  },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;

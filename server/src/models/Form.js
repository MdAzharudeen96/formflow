import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'dropdown', 'date'],
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [String],
    required: function requiredOptions() {
      return this.type === 'dropdown';
    },
    validate: {
      validator: function validOptions(options) {
        return this.type !== 'dropdown' || options?.length > 0 && options.every((option) => option.trim().length > 0);
      },
      message: 'Dropdown fields require at least one non-empty option',
    },
  },
}, { _id: false });

const formSchema = new mongoose.Schema({
  createdBy: {
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
  fields: {
    type: [fieldSchema],
    default: [],
  },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;

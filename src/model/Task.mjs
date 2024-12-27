import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],  // Enforcing specific values for the status
        default: 'Pending'  // Optional: Set default value
    },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Task', taskSchema);

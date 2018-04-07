const mongoose = require('mongoose');
const {Schema} = mongoose;

const alarmSchema = new mongoose.Schema({
  hour: {
    type: Number,
    min: 0,
    max: 24,
    required: true
  },
  minute: {
    type: Number,
    min: 0,
    max: 60,
    required: true
  },
  weekdays: {
    type: [String],
    enum: ['M', 'T', 'W', 'Th', 'F', 'Sat', 'Sun'],
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
 });

module.exports = mongoose.model('Alarm', alarmSchema);

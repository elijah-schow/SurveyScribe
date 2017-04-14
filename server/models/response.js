const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AnswerSchema = Schema({
  question: { type: ObjectId, ref: 'Survey.questions' }
}, { discriminatorKey: 'kind' });

const ResponseSchema = Schema({
  participant: { type: String, ref: 'Session.sid', select: false },
    /* /!\ DANGER /!\
     * The 'participant' field stores a sessionID. Be careful how you handle
     * sessionID's because anyone with someone else's sessionID can impersonate
     * that other person! Thus, 'participant' is set to be invisible by default.
     * `{ select: false }`.
     */
  survey: { type: ObjectId, ref: 'Survey' },
  answers: [AnswerSchema]
});

const Answers = ResponseSchema.path('answers');

Answers.discriminator('Select', Schema({
  value: [{ type: ObjectId, ref: 'Survey.questions.options' }]
}));

Answers.discriminator('Text', Schema({
  value: String
}));

Answers.discriminator('Scale', Schema({
  value: Number
}));

module.exports = mongoose.model('Response', ResponseSchema);

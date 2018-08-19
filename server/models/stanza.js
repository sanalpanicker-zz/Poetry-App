const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StanzaSchema = new Schema({
  poem: {
    type: Schema.Types.ObjectId,
    ref: 'poem'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

StanzaSchema.statics.like = function(id) {
  const Stanza = mongoose.model('stanza');

  return Stanza.findById(id)
    .then(stanza => {
      ++stanza.likes;
      return stanza.save();
    })
}

mongoose.model('stanza', StanzaSchema);

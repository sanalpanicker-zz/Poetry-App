const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoemSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  stanza: [{
    type: Schema.Types.ObjectId,
    ref: 'stanza'
  }]
});

PoemSchema.statics.addStanza = function(id, content) {
  const Stanza = mongoose.model('stanza');

  return this.findById(id)
    .then(poem => {
      const stanza = new Stanza({ content, poem })
      poem.stanza.push(stanza)
      return Promise.all([stanza.save(), poem.save()])
        .then(([Stanza, poem]) => poem);
    });
}

PoemSchema.statics.findStanzas = function(id) {
  return this.findById(id)
    .populate('stanza')
    .then(poem => poem.stanza);
}

mongoose.model('poem', PoemSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const PageSchema = new Schema({
  image: Object, // image object as returned from imgur
  // children: Array, // of page ids for look up
  parent: String, // page id of parent
  root: Boolean, // is this page a root page?
}, { collection: 'pages' });

mongoose.model('Page', PageSchema, 'pages');

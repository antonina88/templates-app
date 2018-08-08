const { Schema } = require("mongoose");

const Template = new Schema({
  name: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  modified: { type: Date }
});

module.exports = Template;

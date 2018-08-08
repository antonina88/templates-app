const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const TemplateSchema = require('./schemas/template');
const Template = mongoose.model("Template", TemplateSchema);
const templatesData = require('./data');

mongoose.connect('mongodb://localhost/templates');

mongoose.connection.on("open", () => {
  console.log("Connected!!!");

  Template.insertMany(templatesData);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:8090'}));

app.get('/templates', (request, response) => {
  Template.find({}, (err, data) => {
       if(err)
          return response.status(500).send({
            error: "Can't get templates"
          });
      response.send(data);
    });
  })

  app.route('/templates/:id')
    .get((request, response) => {
      const _id = request.params.id;

      Template.findById({ _id }, (err, data) => {
        if(err) {
          return response.status(500).send({
            error: "Can't get template"
          });
        }
        response.status(200).send(data);
      })
    })

    .patch((request, response) => {
      const template = request.body.template ? request.body.template.trim() : null;
      const modified = new Date();
      const _id = request.params.id;

      Template.findByIdAndUpdate(_id, { $set: { modified,  template }}, { new: true }, function (err, data) {
        if(err) {
          return response.status(500).send({
            error: "Can't save template"
          });
        }
        response.send(data);
      });
    });

app.listen(8000, () => {
  console.log('Server is up and running on port 8000');
});

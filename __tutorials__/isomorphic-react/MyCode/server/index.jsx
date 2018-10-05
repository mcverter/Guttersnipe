import path from 'path';
import express from 'express';
import webpack from 'webpack';
import yields from 'express-yields';
import fs from 'fs-extra';
import App from '../src/App';
import { delay } from 'redux-saga';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { argv } from 'optimist';
import { question, questions } from '../data/api-real-url';
import { get } from 'request-promise';
import { ConnectedRouter } from 'react-router-redux';
import getStore from '../src/getStore';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';

const port = process.env.PORT || 3000;
const app = express();

const useServerRender = argv.useServerRender === 'true';
const useLiveData = argv.useLiveData === 'true';

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel.js').default;
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

function * getQuestions() {
  let data;

  if (useLiveData) {
   data = yield get(questions, {gzip: true});
  } else {
    data = yield fs.readFile('./data/mock-questions.json', "utf-8");
  }

  return JSON.parse(data);
}

function * getQuestion() {
  let data;

  if (useLiveData) {
    data = yield get(question(question_id),{gzip:true,json:true});
  } else {
    const questions = yield getQuestions();
    const question = questions.items.find(_question=>_question.question_id == question_id);

    question.body = `Mock question body: ${question_id}`;
    data = {items:[question]}
  }
  return data;
}

app.get('/api/questions', function *(req, res){
  const data = yield getQuestions();
  yield delay(150);
  res.json(data);
})

app.get('/api/questions/:id', function *(req, res) {
  const data = yield getQuestion(req.params.id);

  yield delay(150);
  res.json(data)
})

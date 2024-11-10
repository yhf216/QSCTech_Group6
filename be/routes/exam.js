import {v4 as uuid_v4} from 'uuid';
import {dic_data} from '../data/dic_data_handler.js'
import { expressjwt } from 'express-jwt';

let cache = [];

let reports = []; // It will be moved to database

const getRandomTrans = () => {
   const randomIndex = Math.floor(Math.random() * dic_data.CET4.length);
   return dic_data.CET4[randomIndex].trans[0];
}

export default (app, db) => {
   app.post('/exam/start', (req, res) => {
      const examId= uuid_v4();
      const { examRange,examLength } = req.body;
      //generate a random array of numbers within the range

      if(!examRange || ! Object.keys(dic_data).includes(examRange)){
         res.json({code: 400, message: 'Invalid exam range' });
         return;
      }
      const shuffledArray = dic_data[examRange].sort(() => 0.5 - Math.random()).sort(() => 0.5 - Math.random()).sort(() => 0.5 - Math.random()).slice(0, examLength);

      let questionArray = [];
      let answerArray = [];

      shuffledArray.forEach((item, index) => {
        const concurrentQID = uuid_v4();
        const rightAnswerID = uuid_v4();
         questionArray.push({
             id: concurrentQID,
             question: item.word,
             options:[
                {
                    id : rightAnswerID,
                    desc : item.trans[Math.floor(Math.random() * item.trans.length)]
                },
                ...([0,0,0].map(()=>({id: uuid_v4(), desc: getRandomTrans()}))),
             ].sort(() => 0.5 - Math.random()).sort(() => 0.5 - Math.random())
         }); 

         answerArray.push({
             id: concurrentQID,
             answer: rightAnswerID,
         })
         
        });

      cache.push({
         examId,
         examRange,
         examLength,
         answerArray,
         startTime: new Date().getTime(),
      });

      res.status(200).json({
        code: 200,

        data:{
         examId,
         questionArray,
         startTime: new Date().getTime(),
        }
      });
   });

   app.post('/exam/submit', (req, res) => {
      const { examId, answers } = req.body;
      const exam = cache.find(exam => exam.examId === examId);
      if (!exam) {
         res.json({code: 400,  message: 'Invalid exam id' });
         return;
      }
      const { answerArray } = exam;
      const score = answers.reduce((acc, curr) => {
         const correctAnswer = answerArray.find(ans => ans.id === curr.id).answer;
         return acc + (curr.answer === correctAnswer ? 1 : 0);
      }, 0);
      const reportId = uuid_v4();

      reports.push({
         id: reportId,
         examId,
         score,
         answers,
         exam,
         endTime: new Date().getTime(),
      });

      res.status(200).json({code: 200, data: reportId});   
   });

   app.get('/exam/report/:reportId', (req, res) => {
      const { reportId } = req.params;
      const report = reports.find(report => report.id === reportId);
      if (!report) {
         res.json({code: 400,  message: 'Invalid report id' });
         return;
      }
      res.status(200).json({code: 200, data: report});   

   });
      
};

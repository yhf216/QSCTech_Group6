import uuid_v4 from 'uuid/v4';
import {dic_data} from '../data/dic_data_handler'
import { expressjwt } from 'express-jwt';

let cache = [];

const getRandomTrans = () => {
   const randomIndex = Math.floor(Math.random() * dic_data.CET4.length);
   return dic_data.trans[randomIndex].trans[0];
}

export default (app, db) => {
   app.post('/exam/start',expressjwt({secret: process.env.JWT_SECRET}), (req, res) => {
      const examId= uuid_v4();
      const { examRange,examLength } = req.body;
      //generate a random array of numbers within the range

      if(!examRange || ! Object.keys(dic_data).includes(examRange)){
         res.status(400).json({ message: 'Invalid exam range' });
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
                ...Array(3).map(()=>({id: uuid_v4(), desc: getRandomTrans()})),
             ].sort(() => 0.5 - Math.random()).sort(() => 0.5 - Math.random())
         }); 

         answerArray.push({
             id: concurrentQID,
             answer: rightAnswerID,
         
        });

      cache.push({
         examId,
         examRange,
         examLength,
         answerArray,
      });

      res.status(200).json({
         examId,
         questionArray,
      });
   });

   app.post('/exam/submit', (req, res) => {
      const { examId, answers } = req.body;
      const exam = cache.find(exam => exam.examId === examId);
      if (!exam) {
         res.status(400).json({ message: 'Invalid exam id' });
         return;
      }
      const { answerArray } = exam;
      const score = answers.reduce((acc, curr) => {
         const correctAnswer = answerArray.find(ans => ans.id === curr.id).answer;
         return acc + (curr.answer === correctAnswer ? 1 : 0);
      }, 0);
      res.status(200).json({ score });
   });
      
};
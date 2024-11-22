import jwt from "jsonwebtoken";
import { dic_data } from "../data/dic_data_handler.js";
import { v4 as uuid_v4 } from "uuid";

let currentOnline = 0,
  currentWaiting = 0;

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const getRandomTrans = () => {
  const randomIndex = Math.floor(Math.random() * dic_data.CET6.length);
  return dic_data.CET6[randomIndex].trans[0];
};

let usermap = {};

export default (app, db, io) => {
  io.on("connection", (socket) => {
    let user_id;
    console.log(socket.id);
    socket.once("i-am", (token) => {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log("Invalid token");
          socket.disconnect(true);
          return;
        }
        user_id = decoded.id;
        console.log("Joined User ID:", user_id);
        usermap[socket.id] = decoded;
        socket.join("waiting_room");
        currentWaiting++;
        currentOnline++;
        io.to("waiting_room").emit("CurrentUserUpdate", {
          currentOnline: currentOnline,
          currentWaiting: currentWaiting,
        });
        socket.on("prepare-for", async (room_id) => {
          if (
            room_id === 1 ||
            room_id === 2 ||
            room_id === 3 ||
            room_id === 4
          ) {
            socket.join(`preparing_room_${room_id}`);
            console.log(`User ${user_id} is preparing in Room ${room_id}`);
            //  console.log(io.of(`preparing_room_${room_id}`).adapter)
            const RemainingSockets = await io
              .in(`preparing_room_${room_id}`)
              .fetchSockets();
            // console.log(RemainingSockets.length);
            // console.log(RemainingSockets.map((s) => s.id));
            if (RemainingSockets.length === 2) {
              // io.to(`preparing_room_${room_id}`).emit("EnterCompeteRoom", {
              //   oppo: {
              //     user_id: user_id,
              //     username: decoded.username,
              //   },
              // });
              const roomId = generateRandomString(8);
              RemainingSockets.forEach((s) => {
                s.leave(`preparing_room_${room_id}`);
                s.leave("waiting_room");
                s.join("room:" + roomId);
                currentWaiting--;
                io.to("waiting_room").emit("CurrentUserUpdate", {
                  currentOnline: currentOnline,
                  currentWaiting: currentWaiting,
                });
              });
              handleRooming(roomId, room_id);
            }
          } else {
            console.log("Invalid Room ID");
          }
        });
        socket.on("oneMoreTime", () => {
          socket.off("Answer");
          socket.join("waiting_room");
          currentOnline++;
          io.to("waiting_room").emit("CurrentUserUpdate", {
            currentOnline: currentOnline,
            currentWaiting: currentWaiting,
          });
        });
        socket.on("disconnect", () => {
          console.log("User Disconnected:", user_id);
          currentOnline--;
          currentWaiting--;
        });
      });
    });
  });

  async function handleRooming(roomId, type) {
    const CurrentSockets = await io.in("room:" + roomId).fetchSockets();
    const { examRange, examLength } = {
      1: { examRange: "CET4", examLength: 10 },
      2: { examRange: "CET6", examLength: 20 },
      3: { examRange: "CET6", examLength: 80 },
      4: { examRange: "CET6", examLength: 2 },
    }[type];
    io.to("room:" + roomId).emit("EnterRoom", {
      competents: CurrentSockets.map((s) => usermap[s.id]),
      totalQuestions: examLength,
    });
    await sleep(3000);

    console.log(examRange, examLength);

    const shuffledArray = dic_data[examRange]
      .sort(() => 0.5 - Math.random())
      .sort(() => 0.5 - Math.random())
      .sort(() => 0.5 - Math.random())
      .slice(0, examLength);
    let questionArray = [];
    shuffledArray.forEach((item, index) => {
      const concurrentQID = uuid_v4();
      const rightAnswerID = uuid_v4();
      questionArray.push({
        id: concurrentQID,
        question: item.word,
        options: [
          {
            id: rightAnswerID,
            desc: item.trans[Math.floor(Math.random() * item.trans.length)],
          },
          ...[0, 0, 0].map(() => ({ id: uuid_v4(), desc: getRandomTrans() })),
        ]
          .sort(() => 0.5 - Math.random())
          .sort(() => 0.5 - Math.random()),
        answer: rightAnswerID,
      });
    });

    io.to("room:" + roomId).emit("StartCompete", {
      question: questionArray[0].question,
      options: questionArray[0].options,
      id: questionArray[0].id,
    });
    const startTime = new Date().getTime();

    let gameoverLock = false;

    // console.log("Q1", questionArray[0]);

    CurrentSockets.forEach((socket) => {
      let currentQuestionIndex = 0;
      let freezeflag = 0;
      const userId = usermap[socket.id].id;
      socket.on("Answer", (answer) => {
        if (gameoverLock) {
          socket.emit("Game_Was_Over");
          return;
        }
        // console.log(answer);
        if (new Date().getTime() - freezeflag < 3000) {
          socket.emit("You_are_freezed");
          return;
        }

        if (
          answer.questionId === questionArray[currentQuestionIndex].id &&
          answer.answerId === questionArray[currentQuestionIndex].answer
        ) {
          currentQuestionIndex++;
          io.to("room:" + roomId).emit("CompetentScoreUpdate", {
            uid: userId,
            score: currentQuestionIndex,
          });
          if (currentQuestionIndex === questionArray.length) {
            gameoverLock = true;
            io.to("room:" + roomId).emit("GameOver", {
              winner: userId,
              timeConsumed: new Date().getTime() - startTime,
            });
            return;
          }
          socket.emit("Correct+Next", {
            question: questionArray[currentQuestionIndex].question,
            options: questionArray[currentQuestionIndex].options,
            id: questionArray[currentQuestionIndex].id,
          });
        } else {
          socket.emit("Wrong");
          freezeflag = new Date().getTime();
        }
      });
    });
  }
};

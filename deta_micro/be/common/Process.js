import LogUtil from "../utils/logUtil.js";

export default class Process {
    constructor() {
    }

    schedule(cb) {
        process.on('exit', () => {
            LogUtil.log("exit event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              LogUtil.error(err);
            })
          });

          //catches ctrl+c event
          process.on('SIGINT', ()=>{
            LogUtil.log("SIGINT event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              LogUtil.error(err);
            })
          });

          // catches "kill pid" (for example: nodemon restart)
          process.on('SIGUSR1', ()=>{
            LogUtil.log("SIGUSR1 event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              LogUtil.error(err);
            })
          });

          process.on('SIGUSR2', ()=>{
            LogUtil.log("SIGUSR2 event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              LogUtil.log(err);
            })
          });

          //catches uncaught exceptions
          process.on('uncaughtException', (err)=>{
            LogUtil.log(err, "Exception Error Handler");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              LogUtil.error(err);
            })
          });

          //unhandled exceptions
          process.on('unhandledRejection', error => {
            LogUtil.log('unhandledRejection', error.message);
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              LogUtil.error(err);
            })
          });
    }
}
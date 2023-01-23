export default class Process {
    constructor() {
    }

    schedule(cb) {
        process.on('exit', () => {
            console.log("exit event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              console.error(err);
            })
          });

          //catches ctrl+c event
          process.on('SIGINT', ()=>{
            console.log("SIGINT event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              console.error(err);
            })
          });

          // catches "kill pid" (for example: nodemon restart)
          process.on('SIGUSR1', ()=>{
            console.log("SIGUSR1 event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              console.error(err);
            })
          });

          process.on('SIGUSR2', ()=>{
            console.log("SIGUSR2 event");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              console.log(err);
            })
          });

          //catches uncaught exceptions
          process.on('uncaughtException', (err)=>{
            console.log(err, "Exception Error Handler");
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              console.error(err);
            })
          });

          //unhandled exceptions
          process.on('unhandledRejection', error => {
            console.log('unhandledRejection', error.message);
            cb()
            .then(result => {
              process.exit();
            })
            .catch(err => {
              console.error(err);
            })
          });
    }
}
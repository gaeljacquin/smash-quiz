// import { createClient } from "redis";

// const client = createClient({
//   username: process.env.REDIS_USERNAME,
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: parseInt(process.env.REDIS_PORT, 10),
//   }
// });

// client.on('error', (err) => console.log(err));

// if (!client.isOpen) {
//   void client.connect();
// }

// export { client };

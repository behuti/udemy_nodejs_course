const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // Home path
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My App</title></head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/users" && method === "GET") {
    res.write("<html>");
    res.write("<head><title>My App</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      console.log("final message: ", message);
      // fs.writeFile("message.txt", message, (err) => {
      //   res.statusCode = 302;
      //   res.setHeader("Location", "/");
      //   return res.end();
      // });
    });
  }
};

module.exports = requestHandler;

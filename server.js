const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public', {
	index: false,
	immutable: true,
	cacheControl: true,
	maxAge: "30d"
}));


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

app.get("/snake", (req, res) => {
	res.sendFile(__dirname + "/public/views/snake.html");
})
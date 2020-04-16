const express = require('express');
const mongoose = require('mongoose');
const expressHandleBars = require('express-handlebars');
const todoRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = expressHandleBars.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(todoRoutes);
app.use(express.static(path.join(__dirname, 'public')));

async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://alex:28052904Qq)@cluster0-p7l9l.mongodb.net/test',
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
			}
		);
		app.listen(PORT, () => {
			console.log('Server has been started.');
		});
	} catch (e) {
		console.log(e);
	}
}

start();

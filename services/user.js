var userStore = require('../stores/user.js');

module.exports.LinkApp = function(app) {
	app.get('/api/user-lists', function(req, res) {
		userStore.getAll(function(users) {
			res.json(users);
		});
	});

	app.get('/api/user-lists/:id', function(req, res) {
		var listId = req.params.id;
		userStore.get(listId, function(list, error) {
			if (error) return res.sendStatus(400);
			res.json(list);
		});
	});

	app.post('/api/user-lists', function(req, res) {
		var list = req.body;
		if (!list) return res.sendStatus(400);
		userStore.save(list, function(list, error) {
			if (error) return res.sendStatus(400);
			res.json(list);
		});
	});

	app.put('/api/user-lists/:id', function(req, res) {
		var listId = req.params.id;
		var listUpdate = req.body;
		if (!listUpdate) return res.sendStatus(400);
		userStore.get(listId, function(list, error) {
			if (error) return res.sendStatus(400);
			listUpdate.id = list.id;
			userStore.save(listUpdate, function(list, error) {
				if (error) return res.sendStatus(400);
				res.json(list);
			});
		});
	});

	app.delete('/api/user-lists/:id', function(req, res) {
		var listId = req.params.id;
		var listDeleted = req.body;
		if (!listDeleted) return res.sendStatus(400);
		userStore.get(listId, function(list, error) {
			if (error) return res.sendStatus(400);
			listDeleted.id = list.id;
			res.json(list);
			userStore.delete(listDeleted, function(list, error) {
				if (error) return res.sendStatus(400);
				
			});
		});
	});
};

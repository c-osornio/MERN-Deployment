const PetController = require('../controllers/pet.controller');

module.exports = app => {
    app.get('/api/pets', PetController.getAll);
    app.post('/api/pets', PetController.create);
    app.get('/api/pets/:id', PetController.getOne);
    app.put('/api/pets/:id', PetController.update);
    app.delete('/api/pets/:id', PetController.delete);
    // app.get('/', function (req, res) {
    //     res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // });
}
const Clarifai = require('clarifai');

//Instantiating app so I can use the Clarifai API
const app = new Clarifai.App({
    apiKey: '1f608b6b0c1d46ca849b8a2e61d18991'
});

const handleApiCall = (req, res) => {
    const { input } = req.body;
    
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to work with the API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}
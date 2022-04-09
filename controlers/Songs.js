<<<<<<< HEAD
const { createRecord, getSongs, getSongById, voteSongById } = require('../managers/Song');
const { errorHandler } = require('../utils/helpers')

module.exports = {
    create: async (req, res) => {
        try {
            const song = await createRecord(req.body)
            return res.status(201).json(song);
        } catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    },

    getSongsRecords: async (req, res) => {
        
        try {
            const songs = await getSongs();
            return res.status(200).json(songs);
        } catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    },

    getSongRecordById: async (req, res) => {
    
        try {
            const id = req.params.id;
            const song = await getSongById(id);
            return res.status(200).json(song);
        } catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    },

    vote: async (req, res) => {
        
        try {
            const id = req.params.id;
            const status = req.params.status;
            const song = await voteSongById(id, status);
          
            return res.status(200).json(song)
        }catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    }

=======
const { createRecord, getSongs, getSongById, voteSongById } = require('../managers/Song');
const { errorHandler } = require('../utils/helpers')

module.exports = {
    create: async (req, res) => {
        try {
            const song = await createRecord(req.body)
            return res.status(201).json(song);
        } catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    },

    getSongsRecords: async (req, res) => {
        
        try {
            const songs = await getSongs();
            return res.status(200).json(songs);
        } catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    },

    getSongRecordById: async (req, res) => {
    
        try {
            const id = req.params.id;
            const song = await getSongById(id);
            return res.status(200).json(song);
        } catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    },

    vote: async (req, res) => {
        
        try {
            const id = req.params.id;
            const status = req.params.status;
            const song = await voteSongById(id, status);
          
            return res.status(200).json(song)
        }catch (err) {
            const error = errorHandler(err);
            return res.status(400).json(error.message);
        }
    }

>>>>>>> d8de2de05d31f1b3fbbfdbe7dab0f736519a23e6
}
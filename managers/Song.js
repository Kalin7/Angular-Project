const { Song } = require('../database/models/Song');

async function createRecord(data) {
    
    const newSong = await Song.create({
        title: data.title,
        genre: data.genre,
        description: data.description,
        songUrl: data.songUrl,
        author: data.author,
    });
    return newSong;
} 

async function getSongs() {
    return await Song.find({}).populate('author');
}

async function getSongById(id) {
    return await Song.findOne({_id: id}).populate('author')
}

async function voteSongById(id, status) {
    const s = await Song.findOne({_id: id});
    status = 'like' ? s.rating++ : s.rating--;
    return await s.save();
}

module.exports = { 
    createRecord,
    getSongs,
    getSongById,
    voteSongById
};
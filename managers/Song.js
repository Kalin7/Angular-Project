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
    return await Song.find({status: true}).populate({path:'author', match: {status: true}});
}

async function getSongById(id) {
    return await Song.findOne({_id: id, status: true}).populate({path:'author', match: {status: true}});
}

async function voteSongById(id, voteStatus) {
    const s = await Song.findOne({_id: id, status: true});
    voteStatus = 'like' ? s.rating++ : s.rating--;
    return await s.save();
}

module.exports = { 
    createRecord,
    getSongs,
    getSongById,
    voteSongById
};
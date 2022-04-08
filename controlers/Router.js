const router = require('express').Router();
const userControlers = require('./User');
const songControlers = require('./Songs');
const articlesControlers = require('./Article');
const postsControlers = require('./Post');
const guard = require('../middlewear/guards');
const { uploadS3 } = require('../service/AWS/AWS');


router.get('/articles', articlesControlers.getArticles);
router.get('/records', songControlers.getSongsRecords);
router.get('/records/:id',guard.hasUser, songControlers.getSongRecordById);
router.get('/posts/:articleId',guard.hasUser, postsControlers.getByArticleId);
router.get('/user/:id', guard.hasUser, userControlers.getUser);

router.post('/user/register', userControlers.registerAction);
router.post('/user/login', guard.isAlreadyLoggedIn, userControlers.loginAction);

router.post('/create/record', guard.hasUser, songControlers.create);
router.post('/create/article', guard.hasUser, uploadS3.single('image'),  articlesControlers.create);
router.post('/article/:id/update', guard.hasUser, articlesControlers.updateArticle);

router.post('/user/:id', guard.hasUser, userControlers.updateUser);
router.post('/create/post', guard.hasUser, postsControlers.create);


router.put('/records/:id/:status', songControlers.vote);
router.put('/user/:userId/:elementType/:elementId/delete', guard.isAuthor, userControlers.deleteElement);




module.exports = router;   
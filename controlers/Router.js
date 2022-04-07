const router = require('express').Router();
const userControlers = require('./User');
const songControlers = require('./Songs');
const articlesControlers = require('./Article');
const postsControlers = require('./Post');
const guard = require('../middlewear/guards');
const { uploadS3 } = require('../service/AWS/AWS');




router.get('/logout', userControlers.logout);

router.post('/user/register', guard.isAlreadyLoggedIn, userControlers.registerAction);
router.post('/user/login', userControlers.loginAction);



router.post('/create/record', songControlers.create)
router.post('/create/article', uploadS3.single('image'),  articlesControlers.create)
router.post('/article/:id/update', articlesControlers.updateArticle);

router.post('/users/:id', userControlers.updateUser);
router.post('/create/post', postsControlers.create)


router.put('/records/:id/:status', songControlers.vote);


router.get('/articles', articlesControlers.getArticles);
router.get('/records', songControlers.getSongsRecords);
router.get('/records/:id', songControlers.getSongRecordById);
router.get('/article/:id/posts', articlesControlers.getPostsByArticleId);
router.get('/posts/:articleId', postsControlers.getByArticleId)
router.get('/user/:id',  userControlers.getUser);

module.exports = router;   
var express = require('express');
var router = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4c3d0ae3de434a829857757b4af1c25c');


async function getNews(region ='us', category=""){
  try {
    const response = await newsapi.v2.topHeadlines({
      language: 'en',
      country: region ? region : "us",
      category: category,

    });
    return response;
  } catch (err) {
    console.error('Error fetching news:', err);
    throw err; // Rethrow the error to be handled by the caller
  }
}

/* GET users listing. */
router.get('/', async function (req, res, next) {

  var data = await getNews();
  if(data ){
   res.status(200).json({ ...data});
  }
  else{ res.status(500).json(data)
  }
 
});

router.get('/country/india', async function (req, res, next) {

  var data = await getNews("in");
  if(data ){
   res.status(200).json({ ...data});
  }
  else{ res.status(500).json(data)
  }
 
});

router.get('/category/sports', async function (req, res, next) {

  var data = await getNews("in", "sports");
  if(data ){
   res.status(200).json({ ...data});
  }
  else{ res.status(500).json(data)
  }
 
});
router.get('/category/tech', async function (req, res, next) {

  var data = await getNews("us", "technology");
  if(data ){
   res.status(200).json({ ...data});
  }
  else{ res.status(500).json(data)
  }
 
});



module.exports = router;

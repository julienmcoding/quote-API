const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement,
  createElement,
  getIndexById,
  updateElement
   } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


//get a random quote (4)
app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({
    quote: randomQuote
  });
});


// get all quotes OR all person's quotes (5)
app.get('/api/quotes', (req, res, next) => {
  const query = req.query.person
  if(query !== undefined) {
    const quotesPerson = quotes.filter(quote => quote.person === query);
    res.send({quotes: quotesPerson})
  } else {
    res.send({
      quotes: quotes
    });
  };
});


// add a new quote (6)
app.post('/api/quotes', (req, res, next) => {
  const newQuote = createElement(quotes, req.query)
  if(newQuote) {
    quotes.push(newQuote);
    res.send({quote: newQuote});
  } else {
    res.status(400).send();
  };
});


// update a quote (8-1)
app.put('/api/quotes/:id', (req, res, next) => {
  const quoteIndex = getIndexById(req.params.id, quotes);
  if(quoteIndex !== - 1) {
    updateElement(req.params.id, req.query, quotes);
    res.send({quote: quotes[quoteIndex]});
  } else {
    res.status(404).send();
  };
});


// delete a quote (8-2)
app.delete('/api/quotes/:id', (req, res, next) => {
  const quoteIndex = getIndexById(req.params.id, quotes);
  if(quoteIndex !== - 1) {
    quotes.splice(quoteIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  };
});


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
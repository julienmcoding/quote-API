const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, createElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    res.send({
        quote: getRandomElement(quotes)
    });
});

app.get('/api/quotes', (req, res) => {
    if(req.query.person !== undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({
            quotes: quotesByPerson
            });
    } else {
        res.send({
            quotes: quotes
            });
    };
});

app.post('/api/quotes', (req, res) => {
    const receivedQuote = createElement('quotes', req.query);
  if (receivedQuote) {
    quotes.push(receivedQuote);
    res.status(201).send({ quote: receivedQuote });
  } else {
    res.status(400).send();
  }
});



app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
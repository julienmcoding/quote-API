const submitButton = document.getElementById('submit-quote');
const deletedQuoteContainer = document.getElementById('submit-quote');

submitButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;

  fetch(`/api/quotes/${id}`, { 
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(({ quote }) => {
      const deletedQuote = document.createElement('div');
      deletedQuote.innerHTML = `
    <h3>'You deleted this Quote correctly!'</h3>
    <div class="quote-id">~ ${quote.id} ~</div>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution"> ${quote.person}</div>
    <div class="year">- ${quote.year}-</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
      deletedQuoteContainer.appendChild(deletedQuote);
    });
});
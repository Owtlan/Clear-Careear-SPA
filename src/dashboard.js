import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`
        <section id="dashboard">
        <h2>Job Offers</h2>

        <!-- Display a div with information about every post (if any)-->
          ${catalog.length > 0 ? catalog.map(c => html`
        <div class="offer">
          <img src="${c.imageUrl}" alt="example1" />
          <p>
            <strong>Title: </strong><span class="title">${c.title}</span>
          </p>
          <p><strong>Salary:</strong><span class="salary">${c.salary}</span></p>
          <a class="details-btn" href="/details/${c._id}">Details</a>
        </div>
  `) : html`
        <!-- Display an h2 if there are no posts -->
        <h2>No offers yet.</h2>
   `}

      </section>
     
     `

const getCatalog = () => {
    return fetch('http://localhost:3030/data/offers?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
}

export const catalogView = (ctx) =>
    getCatalog()
        .then(catalog => render(dashboardTemplate(catalog), document.querySelector('main')))
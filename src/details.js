import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';




const detailsTemplate = (items, isOwner, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src="${items.imageUrl}" alt="example1" />
          <p id="details-title">${items.title}</p>
          <p id="details-category">
            Category: <span id="categories">${items.category}</span>
          </p>
          <p id="details-salary">
            Salary: <span id="salary-number">${items.salary}</span>
          </p>
          <div id="info-wrapper">
            <div id="details-description">
              <h4>Description</h4>
              <span>${items.description}</span>
            </div>
            <div id="details-requirements">
              <h4>Requirements</h4>
              <span>${items.requirements}</span>
            </div>
          </div>

          <!--Edit and Delete are only for creator-->
          ${isOwner ? html`
          <div id="action-buttons">
            <a href="/edit/${items._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>

            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="apply-btn">Apply</a>
          </div>`
          : ''}
        </div>
      </section>
`;

const getDetails = (detailsId) => {
    return fetch(`http://localhost:3030/data/offers/${detailsId}`)
        .then(res => res.json())
}

const deleteAlbum = (id) => {
    return fetch(`http://localhost:3030/data/offers/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        }
    })
        .then(res => res.json());
}

export const detailsView = (ctx) => {
    getDetails(ctx.params.detailsId)
        .then(items => {
            const isOwner = localStorage.ownerId === items._ownerId;

            const onDelete = () => {
                if (confirm('Are you sure you want to delete this album?')) {
                    deleteAlbum(ctx.params.detailsId)
                        .then(() => {
                            page.redirect('/dashboard');
                        })
                        .catch(err => {
                            alert('Failed to delete album: ' + err.message);
                        });
                }
            };
            render(detailsTemplate(items, isOwner, onDelete), document.querySelector('main'));
        })
}
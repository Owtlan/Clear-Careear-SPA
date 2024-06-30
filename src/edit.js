import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const editTemplate = (album, onSubmit) => html`
   <section id="edit">
        <div class="form">
          <h2>Edit Offer</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input
              type="text"
              name="title"
              id="job-title"
              placeholder="Title"
              .value=${album.title}
            />
            <input
              type="text"
              name="imageUrl"
              id="job-logo"
              placeholder="Company logo url"
               .value=${album.imageUrl}
            />
            <input
              type="text"
              name="category"
              id="job-category"
              placeholder="Category"
               .value=${album.category}
            />
            <textarea
              id="job-description"
              name="description"
              placeholder="Description"
              rows="4"
              cols="50"
            >${album.description}</textarea>
            <textarea
              id="job-requirements"
              name="requirements"
              placeholder="Requirements"
              rows="4"
              cols="50"
            >${album.requirements}</textarea>
            <input
              type="text"
              name="salary"
              id="job-salary"
              placeholder="Salary"
                 .value=${album.salary}
            />
            <button type="submit">post</button>
          </form>
        </div>
      </section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/offers/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    return fetch(`http://localhost:3030/data/offers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
    console.log(albumId);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);



                let title = document.getElementById('job-title').value
                let imageUrl = document.getElementById('job-logo').value
                let category = document.getElementById('job-category').value
                let description = document.getElementById('job-description').value
                let requirements = document.getElementById('job-requirements').value
                let salary = document.getElementById('job-salary').value

                if (title === '' || imageUrl === '' || category === '' || description === '' || requirements === '' || salary === '') {
                    window.alert('you need to fill all fields')
                    return
                }
                const editedAlbum = {
                    title,
                    imageUrl,
                    category,
                    description,
                    requirements,
                    salary
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('main'))
        })
}
import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const createTemplate = () => html`
      <section id="create">
        <div class="form">
          <h2>Create Offer</h2>
          <form class="create-form" @submit=${addItem}>
            <input
              type="text"
              name="title"
              id="job-title"
              placeholder="Title"
            />
            <input
              type="text"
              name="imageUrl"
              id="job-logo"
              placeholder="Company logo url"
            />
            <input
              type="text"
              name="category"
              id="job-category"
              placeholder="Category"
            />
            <textarea
              id="job-description"
              name="description"
              placeholder="Description"
              rows="4"
              cols="50"
            ></textarea>
            <textarea
              id="job-requirements"
              name="requirements"
              placeholder="Requirements"
              rows="4"
              cols="50"
            ></textarea>
            <input
              type="text"
              name="salary"
              id="job-salary"
              placeholder="Salary"
            />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`

function addItem(e) {
    e.preventDefault()

    let title = document.getElementById('job-title').value
    let imageUrl = document.getElementById('job-logo').value
    let category = document.getElementById('job-category').value
    let description = document.getElementById('job-description').value
    let requirements = document.getElementById('job-requirements').value
    let salary = document.getElementById('job-salary').value

    if (title === '' || imageUrl === '' || category === '' || description === '' || requirements === ''|| salary === '') {
        window.alert('you need to fill all fields')
        return
    }


    fetch('http://localhost:3030/data/offers', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('main'))
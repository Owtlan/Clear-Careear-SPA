import page from '../node_modules/page/page.mjs';
import { updateInfo } from '../app.js'
// import { showHomePage } from '../app.js';

export const logout = (e)=>{
    e.preventDefault()
    fetch('http://localhost:3030/users/logout',{
        'method': 'GET',
        headers: {
            'X-Authorization': localStorage.token
        }
    })
    localStorage.clear()
    page.redirect('/dashboard');
    updateInfo()
}
const Router = require('../../src/Router')

const UsersController = require('../../app/controllers/users/UsersController')

const {index, store, show, edit, update, destroy} = new UsersController


/*
|--------------------------------------------------------------------------
| User Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register users routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| Now create something great!
|
*/
module.exports = app => {

    const Route = new Router(app)

    Route.get('/users', index)
    Route.post('/users', store)
    Route.get('/users/:id/show', show)
    Route.get('/users/:id/edit', edit)
    Route.put('/users/:id/update', update)
    Route.delete('/users/:id/delete', destroy)

}
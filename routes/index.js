// UserRouter
const UserRouter = require('./user')

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are first mounted to the Router (see Router Class in /src/Router.js)
| and then to the  App (See  App Class in /src/App.js)
| contains the "web" middleware group. Now create something great!
|
*/
module.exports = app => {
    UserRouter(app)
}
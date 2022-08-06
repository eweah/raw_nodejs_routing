
/*
|--------------------------------------------------------------------------
| Main App (Server)
|--------------------------------------------------------------------------
|
| Here is where you can register additional web routes for your application. These
| routes mounted directly to the App (see App Class in /src/App.js).
| Now create something great!
|
*/

const App = require('./src/App')

const app = App()

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World' })
})
app.get('users/:id', (req, res) => {
    res.status(200).send(req.params)
})

const meHandler = (req, res) => res.status(200).send({me: 'This is all me'})

app.get('/me', meHandler)



// Start the application
app.listen()
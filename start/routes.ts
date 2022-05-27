/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Welcome to verifi-now backend-apis.' }
})
// Auth routes
Route.post('users/login', 'AuthController.login')

Route.group(() => {
  // Employee
  Route.post('employees', 'UsersController.createEmployee')

  // Media
  Route.post('files', 'MediaController.create')

  Route.post('users/:user/sample_video', 'UsersController.uploadSampleVideo')
}).middleware('auth')

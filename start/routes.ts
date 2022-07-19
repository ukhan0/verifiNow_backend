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
  Route.post('employees', 'UsersController.create')
  Route.get('employees', 'UsersController.index')
  Route.get('employees/:id', 'UsersController.details')
  Route.put('employees/:id', 'UsersController.update')
  Route.delete('employees/:id', 'UsersController.delete')

  // Device
  Route.post('employees/:empId/devices', 'DevicesController.create')
  Route.get('employees/:empId/devices', 'DevicesController.index')
  Route.get('employees/:empId/devices/:id', 'DevicesController.details')
  Route.put('employees/:empId/devices/:id', 'DevicesController.update')
  Route.delete('employees/:empId/devices/:id', 'DevicesController.delete')

  // Media
  Route.post('files', 'MediaController.create')
  Route.get('files', 'MediaController.index')
  Route.get('files/:id', 'MediaController.details')
  Route.put('files/:id', 'MediaController.update')
  Route.delete('files/:id', 'MediaController.delete')

  //audio
  Route.post('audio/upload', 'AudioMediaController.create')
  Route.get('audio', 'AudioMediaController.index')

  // Company
  Route.post('companies', 'CompaniesController.create')
  Route.get('companies', 'CompaniesController.index')
  Route.get('companies/:id', 'CompaniesController.details')
  Route.put('companies/:id', 'CompaniesController.update')
  Route.delete('companies/:id', 'CompaniesController.delete')

  Route.post('users/:user/sample_video', 'UsersController.uploadSampleVideo')
}).middleware('auth')

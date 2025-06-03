import { useEffect, useState } from 'react'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css'
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Tables from './pages/Tables';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import { useCategoryStore, useOrderStore, useProductStore, useTableStore, useUserStore } from './store/store';


function App() {
  const { users, userLoading, userError, getUsers, usersNumber, createUser, updateUser, deleteUser } = useUserStore();

  const { categories, categoryLoading, categoryError, getCategories, categoriesNumber, createCategory, updateCategory, deleteCategory } = useCategoryStore();

  const { products, productsNumber, productLoading, productError, getProducts, createProduct, updateProduct, deleteProduct } = useProductStore();

  const { tables, tableLoading, tableError, getTables } = useTableStore();

  const { orders, orderLoading, orderError, getOrders, paymentOrder } = useOrderStore();

  useEffect(() => {
    getUsers();
    getCategories();
    getProducts();
    getTables();
    getOrders();
  }, []);

  const route = [
    { path: "/home", element: <Home usersNumber={usersNumber} productsNumber={productsNumber} categoriesNumber={categoriesNumber} /> },
    {
      path: "/users", element: <Users
        users={users}
        loading={userLoading}
        error={userError}
        createUser={createUser}
        updateUser={updateUser}
        deleteUser={deleteUser} />
    },
    {
      path: "/categories", element: <Categories
        categories={categories}
        loading={categoryLoading}
        error={categoryError}
        createCategory={createCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory} />
    },
    {
      path: "/products", element: <Products
        products={products}
        loading={productLoading}
        error={productError}
        createProduct={createProduct}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        categories={categories}
      />
    },
    {
      path: "/tables", element: <Tables
        tables={tables}
        loading={tableLoading}
        error={tableError} />
    },
    {
      path: "/orders", element: <Orders
        orders={orders}
        loading={orderLoading}
        error={orderError}
        paymentOrder={paymentOrder}
      />
    },
    { path: "/settings", element: <Settings /> },
    { path: "/login", element: <Login /> }
  ]

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2'>
        <Sidebar />
      </div>
      <div className='col-span-10'>
        <div className='mx-5'>
          <Routes>
            {route.map(route => (
              <Route path={route.path} element={route.element} key={route.path} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App

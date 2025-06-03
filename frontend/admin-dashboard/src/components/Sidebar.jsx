import { Image } from 'primereact/image'
import React from 'react'
import { Link, useLocation } from 'react-router'

const Sidebar = () => {
    const location = useLocation();
    const pages = [
        { name: 'Ana Sayfa', path: '/home', icon: 'pi pi-home' },
        { name: 'Kullanıcılar', path: '/users', icon: 'pi pi-user' },
        { name: 'Kategoriler', path: '/categories', icon: 'pi pi-book' },
        { name: 'Ürünler', path: '/products', icon: 'pi pi-inbox' },
        { name: 'Masalar', path: '/tables', icon: 'pi pi-table' },
        { name: 'Siparişler', path: '/orders', icon: 'pi pi-shopping-cart' },
        { name: 'Ayarlar', path: '/settings', icon: 'pi pi-cog' },
        { name: 'Giriş', path: '/login', icon: 'pi pi-sign-out' }
    ];

    const route = ["home", "users", "categories", "products", "tables", "settings", "orders", "login"];

    return (
        <div className='shadow-xl h-screen w-64 fixed left-0 top-0'>
            <div>
                <h1 className='text-2xl text-center font-bold py-4 text-blue-400'>SmartShop Admin</h1>
                <hr className='text-gray-300' />
            </div>
            <div className='flex flex-col gap-3 mx-4 my-4'>
                {pages.map((page => {
                    const isActive = location.pathname == page.path;
                    return (
                        <div key={page.name} className={`transition duration-500 rounded ${isActive ? 'bg-blue-200 text-blue-500' : 'hover:bg-blue-200'}`}>
                            <Link to={page.path} key={page.name} >
                                <div className='flex items-center gap-2 p-2 hover:text-blue-500 transition duration-500'>
                                    <i className={page.icon}></i>
                                    <p>{page.name}</p>
                                </div>
                            </Link>
                        </div>
                    )
                }))}
            </div >
            <div className='mt-12'>
                <Image src='https://smartshop.ie/img/Smartshop-logo2.jpg' />
            </div>
        </div >
    )
}

export default Sidebar
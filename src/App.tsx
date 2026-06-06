import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProductsPage from './components/ProductPage';
import ProductForm from './components/ProductForm';
import { CATEGORIES } from './constants/categories';
import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="app-theme-container d-flex flex-column">

                <nav className="navbar navbar-expand navbar-light navbar-custom shadow-sm px-4">
                    <div className="container-fluid">
                        <span className="navbar-brand fw-bold fs-4"> Global products</span>
                        <div className="navbar-nav ms-auto gap-2">
                            <NavLink to="/" end className="nav-link px-3">
                                Продукты
                            </NavLink>
                            <NavLink to="/products/add" className="nav-link px-3">
                                Добавить продукт
                            </NavLink>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid flex-grow-1 px-4 my-4">
                    <div className="row g-4">

                        <aside className="col-12 col-md-3 col-lg-2">
                            <div className="list-group shadow-sm">
                                <NavLink to="/" end className="list-group-item list-group-item-action">
                                    Все категории
                                </NavLink>
                                {CATEGORIES.map(cat => (
                                    <NavLink
                                        key={cat.id}
                                        to={'/' + cat.id}
                                        className="list-group-item list-group-item-action"
                                    >
                                        {cat.title}
                                    </NavLink>
                                ))}
                            </div>
                        </aside>

                        <main className="col-12 col-md-9 col-lg-10">
                            <div className="bg-white p-4 rounded shadow-sm border" style={{ minHeight: '70vh' }}>
                                <Routes>
                                    <Route path="/" element={<ProductsPage />} />
                                    <Route path="/:categoryId" element={<ProductsPage />} />
                                    <Route path="/products/add" element={<ProductForm />} />
                                    <Route path="/products/:id/edit" element={<ProductForm />} />
                                </Routes>
                            </div>
                        </main>

                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
    );
};

export default App;

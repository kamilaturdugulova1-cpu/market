import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosApi from '../axiosApi';
import { CATEGORIES } from '../constants/categories';
import type { Product } from '../types';

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [price, setPrice] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);

            axiosApi.get<Product>('products/' + id + '.json')
                .then(response => {
                    const data = response.data;
                    if (data) {
                        setType(data.type);
                        setTitle(data.title);
                        setDescription(data.description || '');
                        setPicture(data.picture || '');
                        setPrice(data.price.toString());
                    }
                })
                .catch(() => {
                    setError('Ошибка загрузки товара');
                    toast.error('Ошибка загрузки товара');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (type === '' || title.trim() === '' || price === '') {
            toast.error('Пожалуйста, заполните обязательные поля!');
            return;
        }

        const payload: Product = {
            type: type,
            title: title,
            description: description,
            picture: picture,
            price: Number(price)
        };

        try {
            if (id) {
                await axiosApi.put('products/' + id + '.json', payload);
                toast.success('Товар обновлен!');
            } else {
                await axiosApi.post('products.json', payload);
                toast.success('Товар успешно создан!');
            }
            navigate('/');
        } catch (err) {
            setError('Ошибка при сохранении данных');
            toast.error('Ошибка при сохранении');
        }
    };

    if (loading) {
        return <div className="text-center py-5">Загрузка формы...</div>;
    }

    return (
        <div className="mx-auto" style={{ maxWidth: '500px' }}>
            <h3 className="mb-4 fw-bold">
                {id ? 'Редактировать товар' : 'Добавить новый товар'}
            </h3>

            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Категория *</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Выберите категорию</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Название товара *</label>
                    <input
                        type="text" className="form-control" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Например: Спелые бананы"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Описание</label>
                    <textarea
                        className="form-control" value={description}
                        onChange={(e) => setDescription(e.target.value)} rows={3}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ссылка на картинку (URL)</label>
                    <input
                        type="url" className="form-control" value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Цена (KGS) *</label>
                    <input
                        type="number" className="form-control" value={price}
                        onChange={(e) => setPrice(e.target.value)} min="0"
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success fw-bold">
                        Сохранить товар
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-light">
                        Назад
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;

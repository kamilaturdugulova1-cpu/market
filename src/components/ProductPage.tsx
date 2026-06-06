import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosApi from '../axiosApi';
import { CATEGORIES } from '../constants/categories';
import type { Product } from '../types';
import ProductCard from './ProductCard';

const ProductsPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId?: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const category = CATEGORIES.find(c => c.id === categoryId);
    const pageTitle = category ? category.title : 'Все продукты';

    const fetchProducts = React.useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosApi.get('products.json');
            if (response.data) {
                const list: Product[] = Object.keys(response.data).map(key => ({
                    ...response.data[key],
                    id: key
                }));
                setProducts(list);
            } else {
                setProducts([]);
            }
        } catch (e) {
            toast.error('Не удалось загрузить данные');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Вы точно хотите удалить этот продукт?')) return;

        try {
            await axiosApi.delete(`products/${id}.json`);
            toast.success('Продукт успешно удален');
            fetchProducts();
        } catch (error) {
            toast.error('Ошибка при удалении');
        }
    };

    if (loading) {
        return <div className="text-center py-5">Загрузка...</div>;
    }

    return (
        <div>
            <h2 className="mb-4 pb-2 border-bottom text-dark">{pageTitle}</h2>

            {products.length === 0 ? (
                <div className="alert alert-info text-center">
                    В этой категории пока нет товаров.
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
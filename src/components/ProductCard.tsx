import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { PLACEHOLDER_IMAGE } from '../constants/categories';

interface ProductCardProps {
    product: Product;
    onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    const navigate = useNavigate();

    const imageSrc = (product.picture && product.picture.trim() !== '')
        ? product.picture
        : PLACEHOLDER_IMAGE;

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img src={imageSrc} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} alt={product.title} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{product.title}</h5>
                    <p className="card-text text-muted small flex-grow-1">{product.description}</p>
                    <div className="mt-3 pt-2 border-top">
                        <div className="mb-2 fs-5 fw-bold">{product.price} KGS</div>
                        <div className="btn-group w-100">
                            <button onClick={() => navigate(`/products/${product.id}/edit`)} className="btn btn-sm btn-outline-primary">Редактировать</button>
                            <button onClick={() => product.id && onDelete(product.id)} className="btn btn-sm btn-outline-danger">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
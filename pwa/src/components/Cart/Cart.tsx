import {RootState} from '@store';
import {cartSlice} from '@store/slices/cart';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Input} from '@ui/Input/Input';
import Button, {ButtonTheme} from '@ui/Button/Button';
import {OrderMeta} from '@components/OrderMeta/OrderMeta';
import {SpecificationType} from '../../shared/entities/Specification';
import styles from './Cart.scss';

export const Cart: React.FC = () => {
    const {cart} = useSelector((state: RootState) => state.cart);
    //   const [selectedProducts, setSelectedProducts] = React.useState([] as IProduct);
    const [finalizeOrder, setFinalizeOrder] = React.useState(false);
    const dispatch = useDispatch();

    if (!cart.length) {
        return <Redirect to="/"/>;
    }

    if (finalizeOrder) {
        return <OrderMeta/>;
    }

    return (
        <div className={styles.Container}>
            <h1 className={styles.title}>Корзина</h1>
            {cart.map(cartItem => {
                const {product, quantity} = cartItem;

                return (
                    <div className={styles.Item}>
                        <h3 className={styles.Item__title}>{product.name}</h3>
                        <div className={styles.Item__specs}>
                            {product.specifications.map(specification => {
                                switch (specification.type) {
                                    case SpecificationType.Radio:
                                        return (
                                            <p key={specification.id} className={styles.Item__spec}>
                                                {specification.name}: {specification.value.value}
                                            </p>
                                        );
                                    case SpecificationType.Range:
                                        return (
                                            <p key={specification.id} className={styles.Item__spec}>
                                                {specification.name}: {specification.rangeValue.value} {specification.rangeValue.unit}
                                            </p>
                                        );
                                    case SpecificationType.Select:
                                        return (
                                            <p key={specification.id} className={styles.Item__spec}>
                                                {specification.name}: {specification.values.map(value => value.value).join(', ')}
                                            </p>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                        <p className={styles.Item__price}>
                            {Math.round(product.price.rangeValue.value * quantity)} {product.price.rangeValue.unit}
                        </p>
                        <Input
                            name="quantity"
                            value={quantity.toString()}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value && parseInt(e.target.value)) {
                                    dispatch(
                                        cartSlice.actions.editQuantity({
                                            productId: product.id,
                                            quantity: parseInt(e.target.value)
                                        })
                                    );
                                } else {
                                    dispatch(cartSlice.actions.editQuantity({productId: product.id, quantity: 1}));
                                }
                            }}
                        />
                        <p className={styles.Item__pricePerItem}>
                            {product.price.rangeValue.value} {product.price.rangeValue.unit}
                        </p>
                    </div>
                );
            })}
            <Button name="Перейти к оформлению" onClick={() => setFinalizeOrder(true)} theme={ButtonTheme.Dark}/>
        </div>
    );
};

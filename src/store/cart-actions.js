import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://advanced-redux-cart-app-default-rtdb.firebaseio.com/cart.json')

            if( !response.ok ) {
                throw new Error('Failed to send cart data')
            }

            const data = await response.json()
            return data
        }
        
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity || 0
            }))
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data fetched successfully'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Failed to fetch cart data'
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://advanced-redux-cart-app-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity
                })
            })

            if( !response.ok ) {
                throw new Error('Failed to send cart data')
            }
        }

        try {
            await sendRequest()

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Failed to send cart data'
            }))
        }
    }
}
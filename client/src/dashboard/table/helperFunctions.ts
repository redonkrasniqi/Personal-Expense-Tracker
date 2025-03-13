export function paymentText(method: 'cash' | 'creditCard' | 'debitCard') {
    const paymentMap: { [key in 'cash' | 'creditCard' | 'debitCard']: string } = {
        'cash': 'Cash',
        'creditCard': 'Credit Card',
        'debitCard': 'Debit Card'
    }

    return paymentMap[method]
}
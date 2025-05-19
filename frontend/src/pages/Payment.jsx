import React, { useState, useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import NavbarWithMenu from '../components/Navbar';

const Payment = () => {
    const [activeTab, setActiveTab] = useState('payment-methods');
    const [promoCode, setPromoCode] = useState('');
    const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        isDefault: false
    });
    const [errors, setErrors] = useState({});
    const { user } = useContext(UserDataContext);

    const paymentMethods = [
        {
            id: 1,
            type: 'Credit Card',
            last4: '4242',
            expiry: '12/25',
            isDefault: true
        },
        {
            id: 2,
            type: 'Debit Card',
            last4: '5678',
            expiry: '09/24',
            isDefault: false
        }
    ];

    const vouchers = [
        {
            id: 1,
            code: 'WELCOME50',
            discount: '50% off',
            validUntil: '2024-12-31',
            isUsed: false
        },
        {
            id: 2,
            code: 'FIRSTRIDE',
            discount: '$10 off',
            validUntil: '2024-06-30',
            isUsed: true
        }
    ];

    const handleAddPaymentMethod = () => {
        setShowAddPaymentModal(true);
    };

    const handlePromoCodeSubmit = (e) => {
        e.preventDefault();
        // Implement promo code submission logic
        console.log('Promo code submitted:', promoCode);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newPaymentMethod.cardNumber || newPaymentMethod.cardNumber.length !== 16) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }
        if (!newPaymentMethod.cardName) {
            newErrors.cardName = 'Please enter the cardholder name';
        }
        if (!newPaymentMethod.expiryDate || !/^\d{2}\/\d{2}$/.test(newPaymentMethod.expiryDate)) {
            newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }
        if (!newPaymentMethod.cvv || newPaymentMethod.cvv.length !== 3) {
            newErrors.cvv = 'Please enter a valid 3-digit CVV';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitPaymentMethod = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically make an API call to your backend
            const newMethod = {
                id: paymentMethods.length + 1,
                type: 'Credit Card',
                last4: newPaymentMethod.cardNumber.slice(-4),
                expiry: newPaymentMethod.expiryDate,
                isDefault: newPaymentMethod.isDefault
            };
            
            // Update payment methods (in a real app, this would be handled by your backend)
            paymentMethods.push(newMethod);
            
            // Reset form and close modal
            setNewPaymentMethod({
                cardNumber: '',
                cardName: '',
                expiryDate: '',
                cvv: '',
                isDefault: false
            });
            setShowAddPaymentModal(false);
            setErrors({});
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPaymentMethod(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const PaymentMethodsSection = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <button
                    onClick={handleAddPaymentMethod}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Payment Method
                </button>
            </div>
            <div className="space-y-4">
                {paymentMethods.map(method => (
                    <div key={method.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">{method.type}</h3>
                                <p className="text-gray-600">**** **** **** {method.last4}</p>
                                <p className="text-gray-600">Expires {method.expiry}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                {method.isDefault && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                        Default
                                    </span>
                                )}
                                <button className="text-blue-600 hover:text-blue-800">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const PromotionsSection = () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-4">Promotion Code</h2>
                <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promotion code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Apply
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Your Vouchers</h2>
                <div className="space-y-4">
                    {vouchers.map(voucher => (
                        <div
                            key={voucher.id}
                            className={`bg-white p-4 rounded-lg shadow-sm border ${
                                voucher.isUsed ? 'border-gray-200 opacity-50' : 'border-blue-200'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">{voucher.code}</h3>
                                    <p className="text-gray-600">{voucher.discount} off</p>
                                    <p className="text-sm text-gray-500">Valid until {voucher.validUntil}</p>
                                </div>
                                {voucher.isUsed ? (
                                    <span className="text-gray-500">Used</span>
                                ) : (
                                    <button className="text-blue-600 hover:text-blue-800">
                                        Apply
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const AddPaymentModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Payment Method</h2>
                    <button
                        onClick={() => setShowAddPaymentModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmitPaymentMethod} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={newPaymentMethod.cardNumber}
                            onChange={handleInputChange}
                            maxLength="16"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                        </label>
                        <input
                            type="text"
                            name="cardName"
                            value={newPaymentMethod.cardName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                        />
                        {errors.cardName && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={newPaymentMethod.expiryDate}
                                onChange={handleInputChange}
                                maxLength="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="MM/YY"
                            />
                            {errors.expiryDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                            </label>
                            <input
                                type="text"
                                name="cvv"
                                value={newPaymentMethod.cvv}
                                onChange={handleInputChange}
                                maxLength="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123"
                            />
                            {errors.cvv && (
                                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={newPaymentMethod.isDefault}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            Set as default payment method
                        </label>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setShowAddPaymentModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Payment Method
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarWithMenu />
            <main className="pt-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment</h1>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b mb-6">
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'payment-methods'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('payment-methods')}
                        >
                            Payment Methods
                        </button>
                        <button
                            className={`px-4 py-2 font-medium ${
                                activeTab === 'promotions'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('promotions')}
                        >
                            Promotions
                        </button>
                    </div>

                    {/* Content Sections */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {activeTab === 'payment-methods' ? (
                            <PaymentMethodsSection />
                        ) : (
                            <PromotionsSection />
                        )}
                    </div>
                </div>
            </main>
            {showAddPaymentModal && <AddPaymentModal />}
        </div>
    );
};

export default Payment; 
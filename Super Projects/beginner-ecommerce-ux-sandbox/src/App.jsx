/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react'
import { ShoppingCart, ShieldCheck, CreditCard, ChevronRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import confetti from 'canvas-confetti'
import cartItems from './data.json'

// Form Validation Schema
const schema = z.object({
  email: z.string().email('Invalid email address'),
  cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, 'Invalid card number'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry'),
  cvc: z.string().regex(/^\d{3}$/, 'Invalid CVC'),
  name: z.string().min(3, 'Name is too short')
})

function App() {
  const [step, setStep] = useState(1) // 1: Cart, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema)
  })

  // Format Card Number
  const formatCardNumber = (e) => {
    let val = e.target.value.replace(/\D/g, '')
    val = val.substring(0, 16)
    val = val.match(/.{1,4}/g)?.join(' ') ?? val
    e.target.value = val
  }

  const onSubmit = async (data) => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setStep(3)
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0)
  const shipping = 15.00
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-xs mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                    ${step > s ? 'bg-green-500 text-white' : step === s ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-500'}
                  `}
                >
                  {step > s ? <Check size={20} /> : s}
                </div>
                <span className="text-xs mt-2 text-gray-500 font-medium">
                  {s === 1 ? 'Cart' : s === 2 ? 'Payment' : 'Done'}
                </span>
              </div>
            ))}
            {/* Progress Bar */}
            <div className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[200px] h-1 bg-gray-200 -z-0">
               <div 
                 className="h-full bg-brand-600 transition-all duration-500"
                 style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
               />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShoppingCart size={24} className="text-brand-600" />
                    Shopping Cart
                  </h2>
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.variant}</p>
                        </div>
                        <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full mt-8 bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard size={24} className="text-brand-600" />
                    Payment Details
                  </h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        {...register('email')}
                        type="email" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input 
                          {...register('cardNumber')}
                          onChange={(e) => {
                            formatCardNumber(e)
                            register('cardNumber').onChange(e)
                          }}
                          type="text" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all pl-12"
                          placeholder="0000 0000 0000 0000"
                        />
                        <CreditCard size={20} className="absolute left-4 top-2.5 text-gray-400" />
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input 
                          {...register('expiry')}
                          type="text" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input 
                          {...register('cvc')}
                          type="text" 
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          placeholder="123"
                          maxLength={3}
                        />
                         {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input 
                        {...register('name')}
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full mt-4 bg-brand-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        `Pay $${total.toFixed(2)}`
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-sm p-8 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                  <p className="text-gray-500 mb-8">Thank you for your purchase. A confirmation email has been sent.</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono font-medium text-gray-900">#ORD-2024-8592</p>
                  </div>
                  <button 
                    onClick={() => {
                        setStep(1)
                        setIsProcessing(false)
                    }}
                    className="text-brand-600 font-medium hover:text-brand-700 hover:underline"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h3>
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 flex items-center gap-3 bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
              <ShieldCheck size={20} />
              <p>Secure checkout powered by Stripe (Mock)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App

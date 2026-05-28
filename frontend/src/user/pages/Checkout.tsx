import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/user/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Wallet, Building2, Tag, Check, ArrowRight, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useAuth } from '@/auth/AuthContext';


const Checkout: React.FC = () => {
  const { cartItems, getCartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token } = useAuth();

  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal ) * 0.08;
  const total = subtotal+ shipping + tax;

  

  const handlePlaceOrder = async () => {
  if (!user) return;

  setIsProcessing(true);

  try {
    const orderPayload = {
      userId: user.id,
      totalAmount: total,
      status: 'pending',
      paymentMethod,
      shippingAddress,
      items: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        image: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    await axios.post(
      'http://localhost:8081/api/orders',
      orderPayload,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    clearCart();

    toast({
      title: 'Order placed successfully!',
      description: 'Your order has been saved.',
    });

    navigate('/orders');
  } catch (err: any) {
    toast({
      title: 'Order failed',
      description: err?.response?.data?.message || 'Could not place order',
      variant: 'destructive',
    });
  } finally {
    setIsProcessing(false);
  }
};

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                step >= s
                  ? 'gradient-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-20 h-1 mx-2 transition-colors ${
                  step > s ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center gap-8 mb-8 text-sm">
        <span className={step >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
          Shipping
        </span>
        <span className={step >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>
          Payment
        </span>
        <span className={step >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}>
          Review
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={shippingAddress.fullName}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, phone: e.target.value })
                      }
                      placeholder="+1 234 567 8900"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={shippingAddress.street}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, street: e.target.value })
                    }
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, state: e.target.value })
                      }
                      placeholder="NY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                      }
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={shippingAddress.country} onChange={(e)=>setShippingAddress({...shippingAddress,country:e.target.value})} placeholder="Country" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full gradient-primary shadow-primary"
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Payment */}
         {step === 2 && (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle>Payment Method</CardTitle>
    </CardHeader>

    <CardContent className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="space-y-3">

          {/* CARD */}
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              paymentMethod === 'card'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value="card" />
            <CreditCard className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Credit / Debit Card</p>
              <p className="text-sm text-muted-foreground">Visa, Mastercard, AMEX</p>
            </div>
          </label>

          {/* RAZORPAY */}
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              paymentMethod === 'razorpay'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value="razorpay" />
            <Wallet className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Razorpay</p>
              <p className="text-sm text-muted-foreground">UPI, Wallet, Net Banking</p>
            </div>
          </label>

          {/* STRIPE */}
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              paymentMethod === 'stripe'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value="stripe" />
            <Building2 className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Stripe</p>
              <p className="text-sm text-muted-foreground">Secure online payment</p>
            </div>
          </label>

          {/* ✅ CASH ON DELIVERY */}
          <label
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              paymentMethod === 'cod'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <RadioGroupItem value="cod" />
            <Wallet className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Cash On Delivery</p>
              <p className="text-sm text-muted-foreground">
                Pay when your order arrives
              </p>
            </div>
          </label>

        </div>
      </RadioGroup>

      {/* CARD DETAILS ONLY */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input placeholder="4242 4242 4242 4242" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input placeholder="MM/YY" />
            </div>

            <div className="space-y-2">
              <Label>CVV</Label>
              <Input placeholder="123" type="password" maxLength={4} />
            </div>
          </div>
        </div>
      )}

              </CardContent>
              <CardFooter className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 gradient-primary shadow-primary"
                  onClick={() => setStep(3)}
                >
                  Review Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Order Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Info */}
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-muted-foreground text-sm">
                      {shippingAddress.fullName}<br />
                      {shippingAddress.street}<br />
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                    </p>
                  </div>
                  <Separator />
                  {/* Payment Info */}
                  <div>
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p className="text-muted-foreground text-sm capitalize">{paymentMethod}</p>
                  </div>
                  <Separator />
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    className="flex-1 gradient-primary shadow-primary"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      'Processing...'
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coupon */}
              
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

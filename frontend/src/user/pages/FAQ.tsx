import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <Card className="border-0 shadow-lg max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-display font-bold text-center">
            Frequently Asked Questions
          </CardTitle>
          <p className="text-muted-foreground text-center mt-2">
            Find answers to common questions about shopping with us
          </p>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I place an order?
              </AccordionTrigger>
              <AccordionContent>
                Browse products, add items to your cart, and proceed to checkout.
                You need to be logged in to place an order.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do I need an account to shop?
              </AccordionTrigger>
              <AccordionContent>
                You can browse products without an account, but you must sign up
                or log in to add items to the cart and place orders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What payment methods are supported?
              </AccordionTrigger>
              <AccordionContent>
                We support Credit/Debit Cards, Razorpay, Stripe, and Cash on
                Delivery (COD).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent>
                Go to <strong>My Orders</strong> from your profile menu and click
                on <strong>View Details</strong> to see the order status.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                Can I cancel my order?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Orders can be cancelled while they are in
                <strong> Pending</strong> or <strong> Confirmed</strong> status.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                How does the wishlist work?
              </AccordionTrigger>
              <AccordionContent>
                Click the heart icon on any product to add it to your wishlist.
                You can view or remove wishlist items anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent>
                Products can be returned within 7 days of delivery if they are
                unused and in original condition.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                How do I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                You can reach us via the Contact Us page or email our support team
                at <strong>support@brightbasket.com</strong>.
              </AccordionContent>
            </AccordionItem>

            {/* ✅ NEW FAQs BELOW */}

            <AccordionItem value="item-9">
              <AccordionTrigger>
                Is Cash on Delivery available for all products?
              </AccordionTrigger>
              <AccordionContent>
                Cash on Delivery is available for most products, but availability
                may vary based on your location and product type.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent>
                Orders are usually delivered within <strong>3–7 business days</strong>,
                depending on your location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger>
                Will I receive an invoice for my order?
              </AccordionTrigger>
              <AccordionContent>
                Yes, a digital invoice will be available in your order details
                once the order is confirmed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger>
                Can I change my delivery address after placing an order?
              </AccordionTrigger>
              <AccordionContent>
                You can update the delivery address only if the order is still in
                <strong> Pending</strong> status.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13">
              <AccordionTrigger>
                What should I do if I receive a damaged product?
              </AccordionTrigger>
              <AccordionContent>
                If you receive a damaged or incorrect product, please contact
                customer support within 24 hours of delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14">
              <AccordionTrigger>
                Is my payment information secure?
              </AccordionTrigger>
              <AccordionContent>
                Yes. All payments are processed through secure and encrypted
                payment gateways to ensure your data safety.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;

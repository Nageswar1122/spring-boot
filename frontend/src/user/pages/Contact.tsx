import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
} from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <Card className="border-0 shadow-lg max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-display font-bold text-center">
            Contact Us
          </CardTitle>
          <p className="text-muted-foreground text-center mt-2">
            We’re here to help! Reach out to us anytime.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* WhatsApp */}
          <div className="flex items-center gap-4 p-4 rounded-xl border hover:shadow transition">
            <MessageCircle className="h-8 w-8 text-green-500" />
            <div className="flex-1">
              <p className="font-medium">WhatsApp</p>
              <p className="text-sm text-muted-foreground">
                Chat with us on WhatsApp
              </p>
            </div>
            <a
              href="https://wa.me/919346054678"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="gradient-primary">
                Chat Now
              </Button>
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 p-4 rounded-xl border hover:shadow transition">
            <Phone className="h-8 w-8 text-blue-500" />
            <div className="flex-1">
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">
                +91 9346054678
              </p>
            </div>
            <a href="tel:+919346054678">
              <Button variant="outline">
                Call Us
              </Button>
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-4 rounded-xl border hover:shadow transition">
            <Mail className="h-8 w-8 text-red-500" />
            <div className="flex-1">
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">
                reddybollavaram229@gmail.com
              </p>
            </div>
            <a href="mailto:reddybollavaram229@gmail.com">
              <Button variant="outline">
                Send Email
              </Button>
            </a>
          </div>

          {/* Address (Optional) */}
          <div className="flex items-center gap-4 p-4 rounded-xl border hover:shadow transition">
            <MapPin className="h-8 w-8 text-purple-500" />
            <div>
              <p className="font-medium">Office Address</p>
              <p className="text-sm text-muted-foreground">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;

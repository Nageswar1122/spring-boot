import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/user/components/ProductCard';
import { categories } from '@/data/categories';

import { 
  ArrowRight, 
  Truck, 
  Shield, 
  RotateCcw, 
  Headphones,
  Zap,
  TrendingUp
} from 'lucide-react';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  const API_URL = "http://localhost:8081/api/products";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const featuredProducts = products.slice(0, 8);
  const trendingProducts = products
    .filter(p => p.rating >= 4.5 || p.popular)
    .slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="gradient-primary border-0 text-sm px-4 py-1">
                <Zap className="w-4 h-4 mr-1" />
                Flash Sale - Up to 50% Off
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Discover Amazing
                <span className="text-gradient block">Tech Deals</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Shop the latest electronics, mobiles, and accessories at unbeatable prices.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="gradient-primary shadow-primary">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/products?sort=trending">
                  <Button size="lg" variant="outline">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Trending
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.slug}`}>
              <Card className="group card-hover text-center border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
          Trending Now
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <Truck className="w-7 h-7" />
              <p>Free Shipping</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <Shield className="w-7 h-7" />
              <p>Secure Payment</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <RotateCcw className="w-7 h-7" />
              <p>Easy Returns</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <Headphones className="w-7 h-7" />
              <p>24/7 Support</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;

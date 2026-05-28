import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '@/user/context/CartContext';
import { useWishlist } from '@/user/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/user/components/ProductCard';
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  CheckCircle,
  Star,
  Eye,
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const API_URL = 'http://localhost:8081/api/products';

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setProduct(res.data);
      setSelectedImage(res.data.images?.[0] || res.data.image);

      const relatedRes = await axios.get(API_URL);
      setRelatedProducts(
        relatedRes.data
          .filter(
            (p: any) =>
              p.category === res.data.category && p.id !== res.data.id
          )
          .slice(0, 4)
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container py-16 text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/products">
          <Button className="mt-4">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const discountPercentage =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name}`,
    });
  };

  const toggleWishlist = () => {
    isWishlisted
      ? removeFromWishlist(product.id)
      : addToWishlist(product.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/products">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span>{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGES */}
        <div>
          <div className="aspect-square bg-muted rounded-xl overflow-hidden mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border ${
                    selectedImage === img
                      ? 'border-primary'
                      : 'border-muted'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating + Views */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating ?? 0}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              {product.views ?? 0} views
            </div>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">${product.price}</span>

            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>

                {discountPercentage > 0 && (
                  <Badge className="gradient-primary border-0">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* STOCK */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                In stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of stock</span>
            )}
          </div>

          <Separator />

          <p className="text-muted-foreground">{product.description}</p>

          {/* FEATURES */}
          {product.features?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* QUANTITY */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity</span>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  setQuantity(q => Math.min(q + 1, product.stock))
                }
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <Button
              className="flex-1 gradient-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Button variant="outline" onClick={toggleWishlist}>
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;

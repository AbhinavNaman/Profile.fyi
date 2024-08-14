import Carousel from '@/components/Carousel';
import ProductCard from '../components/ProductCard';


const images = [
  'https://www.shutterstock.com/image-vector/ecommerce-website-banner-template-presents-260nw-2252124451.jpg',
  'https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg',
  'https://mindstacktechnologies.com/wordpress/wp-content/uploads/2018/01/ecommerce-banner.jpg',
];

export default async function Home() {
  let products = [];

  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    products = await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <>
     {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6"> */}
      <div className="container mx-auto px-4 py-8">
      <Carousel images={images} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
    </div>
    </>
  );
}


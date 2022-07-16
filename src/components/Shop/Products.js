import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTs = [
  {
    id: 'p1',
    title: 'Product 1',
    price: 6,
    description: 'First product'
  },
  {
    id: 'p2',
    title: 'Product 2',
    price: 10,
    description: 'Second product'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTs.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;

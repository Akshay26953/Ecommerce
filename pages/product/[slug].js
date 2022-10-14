import React from "react";
import { urlFor } from "../../lib/client";
import { client } from "../../lib/client";

function ProductDetails({ product, products }) {
    const {image, name, details, price} = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}


export const getStaticPaths = async() =>{
    const query = `*[_type == "product"] {
        slug{
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product)=> ({
        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths, 
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = `*[_type == "product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: { product, products }, // will be passed to the page component as props
  };
}

export default ProductDetails;

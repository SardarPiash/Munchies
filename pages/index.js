import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./components/header";
import Footer from "./components/footer";

function Home() {
  const [productList, setProductList] = useState([]);
  const router = useRouter();
  const [categorylist, setCategorylist] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [interestProduct, setInterestProduct] = useState("");

  useEffect(() => {
    try {
      ////fetch product list.......
      const fetchProductList = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        setProductList(response.data);
      };
      fetchProductList();
    } catch (error) {
      console.log(error);
    }

    try {
      ////fetch categories..........
      const fetchCatagory = async () => {
        const response = await axios.get(
          `https://fakestoreapi.com/products/categories`
        );
        setCategorylist(response.data);
      };
      fetchCatagory();
    } catch (error) {
      console.log(error);
    }

  }, []);

  useEffect(() => {
    try {
      /////Filter products................
      const fetchCatagoryProduct = async () => {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${categoryProduct}`
        );
        setInterestProduct(response.data);
      };
      if (categoryProduct) {
        fetchCatagoryProduct();
      }
    } catch (error) {
      console.log(error);
    }
  }, [categoryProduct]);
////adding dependency array to load the effect based on dependency array.........

///a function to filter the product based on category from the toall product list.....
  const productsByCategory = (category) => {
    const filteredProducts = productList.filter(
      (product) => product.category === category
    );
///////view details function........
    const viewDetails = (id) => {
      router.push(`/product/${id}`);
    };

    return (
      <>
        <div key={category} className="mb-8 bg-slate-50 mt-5">
          {Array.isArray(interestProduct) && interestProduct.length > 0 ? (
            <p className="text-2xl font-bold mb-4">Interested Products: </p>
          ) : (
            <p></p>
          )}
          <div className="flex flex-wrap -mx-4 ">
            {Array.isArray(interestProduct) && interestProduct.length > 0 ? (
              interestProduct.map((products) => (
                <div
                  key={products.id}
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4"
                >
                  <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg h-full">
                    <img
                      src={products.image}
                      alt={products.title}
                      className="w-30 h-32 object-cover rounded-md"
                    />

                    <h3 className="text-sm font-semibold mb-2">
                      {" "}
                      {products.title}
                    </h3>
                    <div className="mb-5">
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-1">Rating:</span>
                        <span className="text-yellow-500">
                          {products.rating.rate} ({products.rating.count}{" "}
                          reviews)
                        </span>
                      </div>
                      <p className="text-gray-600">${products.price}</p>

                      <button
                        onClick={() => viewDetails(products.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="flex flex-wrap -mx-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4"
              >
                <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-30 h-32 object-cover rounded-md"
                  />

                  <h3 className="text-sm font-semibold mb-2">
                    {" "}
                    {product.title}
                  </h3>
                  <div className="mb-5">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-1">Rating:</span>
                      <span className="text-yellow-500">
                        {product.rating.rate} ({product.rating.count} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600">${product.price}</p>
                    <button
                      onClick={() => viewDetails(product.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  /// Add new function..........
  const handleAddNew = () => {
    router.push("/addProduct");
  };
  return (
    <>
      <Header />
      <div className="flex justify-between items-start mt-1">
        <p className="inline-block mr-2">
          Sort By:
          <select
            className="bg-white text-body block p-2 border border-gray-300 rounded-lg inline-block"
            value={categoryProduct}
            onChange={(e) => setCategoryProduct(e.target.value)}
          >
            <option
              value="disable"
              className="text-center text-black font-semibold"
            >
              Select Categories
            </option>
            {Array.isArray(categorylist) &&
              categorylist.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </p>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={(e) => {
              e.preventDefault();
              handleAddNew();
            }}
          >
            Add new Product
          </button>
        </div>
      </div>

      <div>
        {Array.isArray(productList) && productList.length > 0 ? (
          <>
            {productsByCategory("men's clothing")}
            {productsByCategory("jewelery")}
            {productsByCategory("electronics")}
            {productsByCategory("women's clothing")}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Details() {
  const router = useRouter();
  ///store productID into id from query....
  const id = router.query.details;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          //fetch details data based on id taken from query parametre
          const response = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          );
          setProductDetails(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDetails();
    }
  }, [id]);

  const handleDelete = async(id)=>{
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      ///If delete successfully,api return the list of deleted product...........
      console.log(response.data);
      if(response.data){
        let msg = "Delete";
            router.push(`/`);
      }
    } catch (error) {
      ///print error into console if any error occurs at the time of featching api......
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h2 className="text-2xl font-bold">Product Details</h2>
        {productDetails && (
          <div className="bg-white p-4 rounded-md shadow-md">
            <img
              src={productDetails.image}
              alt={productDetails.title}
              className="w-30 h-32 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold mb-2">
              Product Title: {productDetails.title}
            </h3>
            <p className="text-gray-600">Price: {productDetails.price}</p>
            <p className="text-gray-600">
              Description: {productDetails.description}
            </p>
            <div className="flex items-center mb-2">
              <span className="text-gray-600 mr-1">Rating:</span>
              <span className="text-yellow-500">
                {productDetails.rating.rate} ({productDetails.rating.count}{" "}
                reviews)
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4 space-x-2">
          <Link href="/">
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md">
              Back
            </button>
          </Link>
          <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md" onClick={()=>handleDelete(productDetails.id)}>
              Delete
            </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

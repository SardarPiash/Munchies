import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

function AddProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [titleError,setTitleError]=useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc");
  const [imageError, setImageError] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [price,setPrice]=useState("");
  const [priceError,setPriceError]=useState("");

////taken form data
  const submitData = async(e) => {
    e.preventDefault();
    setTitleError("");
    setPriceError("");
    setDescriptionError("");
    setImageError("");
    setCategoryError("");
    ///validate form data if it is null value.....
    if(!title){
        setTitleError("Enter Title...");
        return;
    }
    if(!price){
        setPriceError("Enter Price...");
        return;
    }
    if(!description){
        setDescriptionError("Enter Description...");
        return;
    }
    if(!image){
        setImageError("Enter Image...");
        return;
    }
    if(!category){
        setCategoryError("Enter Category...");
        return;
    }
    try{
        ///send a post request to send data to the api.......
        const response = await axios.post(`https://fakestoreapi.com/products`,{
            title: title,
            price: price,
            description: description,
            image: image,
            category: category,
        });
        //// if success , it return the new added product.....
        console.log(response.data);
        if(response.data){
            let msg = "Success";
            router.push(`/`);
        }

    }catch(error){
///print error into console if any error occurs at the time of featching api......
console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen items-center justify-center">
        <fieldset className="border border-gray-400 p-10 rounded-md">
          <legend className="text-3xl font-bold mb-4">Add New Product</legend>
          <form onSubmit={submitData} className="w-1/2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title:
            </label>
            <input
              value={title}
              type="text"
              name="title"
              id="title"
              placeholder="Enter title..."
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <br />
            {titleError && (
                <p className="text-red-500">{titleError}</p>
              )}
            <label htmlFor="price" className="block text-sm font-medium">
              Price:
            </label>
            <input
              value={price}
              type="number"
              name="title"
              id="title"
              placeholder="Enter Price..."
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <br />
            {priceError && (
                <p className="text-red-500">{priceError}</p>
              )}
            <label htmlFor="description" className="block text-sm font-medium">
              Description:
            </label>
            <input
              value={description}
              type="text"
              name="description"
              id="description"
              placeholder="Enter description..."
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <br />
            {descriptionError && (
                <p className="text-red-500">{descriptionError}</p>
              )}
            <p>***Here image is fixed as I have no database right now to store image file name**</p>
            <label htmlFor="image" className="block text-sm font-medium">
              Image:
            </label>
            <input
              value={image}
              type="text"
              name="image"
              id="image"
              placeholder="Enter description..."
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <br />
            {imageError && (
                <p className="text-red-500">{imageError}</p>
              )}
            <label htmlFor="category" className="block text-sm font-medium">
              Category:
            </label>
            <input
              value={category}
              type="text"
              name="category"
              id="category"
              placeholder="Enter description..."
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <br />
            {categoryError && (
                <p className="text-red-500">{categoryError}</p>
              )}
              <div className="flex justify-center mt-4 space-x-2">
          <button
            type="submit"
            className="bg-black text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Add Product
          </button>
          <Link href="/">
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md mt-4">
              Back
            </button>
          </Link>
        </div>
          </form>
        </fieldset>
      </div>

      <Footer />
    </>
  );
}

export default AddProduct;

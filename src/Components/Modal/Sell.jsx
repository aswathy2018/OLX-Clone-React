import { Modal, ModalBody } from 'flowbite-react'
import { Input } from '../../Components/Input/Input'
import React, { useState } from 'react'
import { userAuth } from '../Context/Auth'
import { addDoc, collection } from 'firebase/firestore'
import { FetchFromFireStore, fireStore } from '../Firebase/Firebase'
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'
import close from '../../assets/close.svg'

const Sell = (props) => {

    const {toggleModalSell, status, setItems} = props

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const auth = userAuth();

    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
    }
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        alert('Only JPG, PNG, and SVG files are allowed');
        return;
      }
      setImage(file);
    }
  };

    const handleSubmit = async(event) => {
      event.preventDefault();

      if(!auth?.user){
        alert("Please login to continue");
        return
      }

      setSubmitting(true)

      const readImageAsDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () =>{
          const imageUrl = reader.result
          localStorage.setItem(`image_${file.name}`, imageUrl)
          resolve(imageUrl)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      });
    };

    let imageUrl = '';
    if(image){
      try {
        imageUrl = await readImageAsDataUrl(image)
      } catch (error) {
        console.log(error);
        alert("Failed to read image")
        return;
      }
    }

      const trimmedTitle = title.trim();
      const trimmedCategory = category.trim();
      const trimmedPrice = price.trim();
      const trimmedDescription = description.trim()

      if(!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription){
        alert("All fields are mandatory");
        setSubmitting(false)
        return
      }

      try {
        
        await addDoc(collection (fireStore, 'products'),{
          title,
          category,
          price,
          description,
          imageUrl,
          userId: auth.user.uid,
          userName: auth.user.displayName || 'Anonumous',
          createdAt: new Date().toDateString()
        })

        const datas = await FetchFromFireStore();
        setItems(datas)

        toggleModalSell();

      } catch (error) {
        console.log(error);
        alert('Failed to add items to the firestore')
      } finally{
        setSubmitting(false)
      }
    }

    
  return (
    <div>
        <Modal onClick={toggleModalSell}
        show={status}
  popup
  size="md"
  position="center"
  className="bg-black/50"
  theme={{
    content: {
      base: "relative w-full p-4 md:h-auto",
      inner:
        "relative flex max-h-[90dvh] max-w-md flex-col rounded-lg bg-white shadow dark:bg-gray-700",
    },
  }}>

        <ModalBody
          className="bg-white
          rounded-md
          overflow-y-auto
          max-h-[85vh]
          p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            onClick={() => {
              toggleModalSell();
              setImage(null);
            }}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            src={close}
            alt=""
          />

                <div className="p-1 pl-2 pr-2 pb-2">
            <p className="font-bold text-lg mb-3">
                Sell Item
            </p>

            <form>
                <Input setInput = {setTitle} placeholder = "Title"/>
                <Input setInput = {setCategory} placeholder = "Category"/>
                <Input setInput = {setPrice} placeholder = "Price"/>
                <Input setInput = {setDescription} placeholder = "Description"/>

                <div className="pt-1 w-full relative">

                  {image ? (
                  <div className="relative h-30 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img
                      className="object-contain"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="relative h-32 sm:h-40 w-full border-2 border-black rounded-md">

                    <input
                      onChange={handleImageUpload}
                      className="absolute inset-10 h-full opacity-0 cursor-pointer z-30"
                      type="file"
                      required
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="" />
                      <p className="text-center text-sm pt-1">Click to Upload Images</p>
                      <p className="text-center text-sm pt-1">SVG,PNG,JPG</p>
                    </div>
                  </div>
                )}

                </div>

                {submitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img className="w-32 object-cover" src={loading} alt="" />
                </div>
              ) : (
                <div className="w-full pt-2">
                  <button onClick={handleSubmit}
                    className="w-full p-2 rounded-lg text-white"
                    style={{ backgroundColor: "#002f34" }}
                  >Sell Item
                  </button>
                </div>
              )}
            </form>
            </div>
            </ModalBody>

        </Modal>
    </div>
  )
}

export default Sell
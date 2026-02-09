import { Modal, ModalBody } from 'flowbite-react'
import { Input } from '../../Components/Input/Input'
import React, { useState, useEffect } from 'react'
import { userAuth } from '../Context/Auth'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { FetchFromFireStore, fireStore } from '../Firebase/Firebase'
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'
import close from '../../assets/close.svg'

const Sell = (props) => {

  const { toggleModalSell, status, setItems, editItem, setEditItem } = props

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [existingImage, setExistingImage] = useState('');
  const [errors, setErrors] = useState({});

  const auth = userAuth();

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setCategory(editItem.category);
      setPrice(editItem.price);
      setDescription(editItem.description);
      setExistingImage(editItem.imageUrl || '');
      setImage(null);
    } else {
      setTitle('');
      setCategory('');
      setPrice('');
      setDescription('');
      setExistingImage('');
      setImage(null);
      setErrors({});
    }
  }, [editItem, status]);

  const textOnlyRegex = /^[a-zA-Z\s]+$/;
  const textWithNumbersRegex = /^[a-zA-Z0-9\s]+$/;
  const priceRegex = /^[0-9]+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim() !== title || /\s{2,}/.test(title)) {
      newErrors.title = "Extra spaces are not allowed";
    } else if (!textOnlyRegex.test(title)) {
      newErrors.title = "Only letters and spaces are allowed";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required";
    } else if (category.trim() !== category || /\s{2,}/.test(category)) {
      newErrors.category = "Extra spaces are not allowed";
    } else if (!textOnlyRegex.test(category)) {
      newErrors.category = "Only letters and spaces are allowed";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim() !== description || /\s{2,}/.test(description)) {
      newErrors.description = "Extra spaces are not allowed";
    } else if (!textWithNumbersRegex.test(description)) {
      newErrors.description = "Special characters are not allowed";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (!priceRegex.test(price)) {
      newErrors.price = "Only numbers are allowed (no spaces or special characters)";
    } else if (parseInt(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!editItem && !image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 2MB' }));
        event.target.value = null;
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Only JPG, PNG, and SVG files are allowed' }));
        event.target.value = null;
        return;
      }

      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth?.user) {
      alert("Please login to continue");
      return;
    }

    const isValid = validateForm();
    if (!isValid) return;

    setSubmitting(true);

    const readImageAsDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result
          localStorage.setItem(`image_${file.name}`, imageUrl)
          resolve(imageUrl)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      });
    };

    let imageUrl = '';
    if (image) {
      try {
        imageUrl = await readImageAsDataUrl(image)
      } catch (error) {
        console.log(error);
        alert("Failed to read image")
        setSubmitting(false);
        return;
      }
    }

    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();
    const trimmedDescription = description.trim();

    try {
      if (editItem) {
        const docRef = doc(fireStore, "products", editItem.id);

        await updateDoc(docRef, {
          title: trimmedTitle,
          category: trimmedCategory,
          price: trimmedPrice,
          description: trimmedDescription,
          ...(imageUrl && { imageUrl })
        });
      } else {
        await addDoc(collection(fireStore, "products"), {
          title: trimmedTitle,
          category: trimmedCategory,
          price: trimmedPrice,
          description: trimmedDescription,
          imageUrl,
          userId: auth.user.uid,
          userName: auth.user.displayName || "Anonymous",
          createdAt: new Date().toDateString()
        });
      }

      const updatedItems = await FetchFromFireStore();
      setItems(updatedItems);

      setTitle('');
      setCategory('');
      setPrice('');
      setDescription('');
      setImage(null);
      setErrors({});
      
      toggleModalSell();
      setEditItem && setEditItem(null);

    } catch (error) {
      alert("Failed to save item");
      console.error(error);
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setTitle('');
    setCategory('');
    setPrice('');
    setDescription('');
    setImage(null);
    setErrors({});
    toggleModalSell();
    setEditItem && setEditItem(null);
  };

  return (
    <div>
      <Modal onClick={handleClose}
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
            onClick={handleClose}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            src={close}
            alt="Close"
          />

          <div className="p-1 pl-2 pr-2 pb-2">
            <p className="font-bold text-lg mb-3">
              {editItem ? "Edit Item" : "Sell Item"}
            </p>

            <form onSubmit={handleSubmit}>
              <Input value={title} setInput={setTitle} placeholder="Title" error={errors.title} />

              <Input value={category} setInput={setCategory} placeholder="Category" error={errors.category} />

              <Input value={price} setInput={setPrice} placeholder="Price" error={errors.price} />

              <Input value={description} setInput={setDescription} placeholder="Description" error={errors.description} />

              <div className="pt-2 w-full relative">
                {image || existingImage ? (
                  <div className="relative">
                    <div className="relative h-30 sm:h-60 w-full flex justify-center border-2 border-black rounded-md overflow-hidden">
                      <img
                        className="object-contain"
                        src={image ? URL.createObjectURL(image) : existingImage}
                        alt="Preview"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setExistingImage('');
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className={`relative h-32 sm:h-40 w-full border-2 rounded-md ${errors.image ? 'border-red-500' : 'border-black'}`}>
                      <input
                        onChange={handleImageUpload}
                        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-30"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                      />
                      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center pointer-events-none">
                        <img className="w-12" src={fileUpload} alt="" />
                        <p className="text-center text-sm pt-1">Click to Upload Image</p>
                        <p className="text-center text-xs pt-1 text-gray-600">SVG, PNG, JPG (Max 2MB)</p>
                      </div>
                    </div>
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                    )}
                  </div>
                )}
              </div>

              {submitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img className="w-32 object-cover" src={loading} alt="Loading" />
                </div>
              ) : (
                <div className="w-full pt-4">
                  <button 
                    type="submit"
                    className="w-full p-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#002f34" }}
                  >
                    {editItem ? "Update Item" : "Sell Item"}
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
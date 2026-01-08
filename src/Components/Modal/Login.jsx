import React from 'react';
import { Carousel, Modal, ModalBody } from 'flowbite-react';
import mobile from "../../assets/mobile.svg";
import guitar from "../../assets/guita.png";
import love from "../../assets/love.png";
import avatar from "../../assets/avatar.png";
import close from "../../assets/close.svg";
import google from "../../assets/google.png"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../Firebase/Firebase"

const Login = ({ toggleModal, status }) => {
    const handleClick = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            toggleModal()
            console.log("User: ", result.user)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            
            <Modal
                show={status}
                onClick={toggleModal}
                size="md"
                popup
                position="center"
                className="bg-black bg-opacity-50"
                theme={{
                    content: {
                        base: "relative w-[440px] max-w-xs mx-auto p-0",
                        inner: "relative flex flex-col rounded-lg bg-white shadow",
                    },
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white px-4 pt-6"
                >
                    <img
                        src={close}
                        alt="close"
                        className="w-6 absolute top-4 right-4 cursor-pointer z-10"
                        onClick={toggleModal}
                    />

                    <Carousel
                        slide
                        draggable={false}
                        className="h-48 overflow-hidden"
                        theme={{
                            indicators: {
                                active: { off: "bg-gray-300", on: "bg-teal-300" },
                                base: "h-2 w-2 rounded-full",
                                wrapper:
                                    "absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-3",
                            },
                            control: {
                                base: "inline-flex items-center justify-center bg-transparent",
                                icon: "w-6 text-black",
                            },
                            scrollContainer: {

                            }
                        }}
                    >
                        <div className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center">
                            <img src={guitar} className="w-24 mb-4" />
                            <p className="w-64 font-semibold text-[#002f34]">
                                Help us become one of the safest places to buy and sell.
                            </p>
                        </div>

                        <div className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center">
                            <img src={love} className="w-24 mb-4" />
                            <p className="w-64 font-semibold text-[#002f34]">
                                Close deals from the comfort of your home.
                            </p>
                        </div>

                        <div className="w-full flex-shrink-0 flex flex-col items-center justify-center text-center">
                            <img src={avatar} className="w-24 mb-4" />
                            <p className="w-64 font-semibold text-[#002f34]">
                                Keep all your favorites in one place.
                            </p>
                        </div>
                    </Carousel>
                </div>

                <ModalBody
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white px-6 pb-6"
                >
                    <div
                        onClick={handleClick}
                        className="relative flex items-center justify-center border-2 rounded-md h-10 cursor-pointer active:bg-teal-100"
                    >
                        <img src={google} className="w-6 absolute left-3" />
                        <p className="text-sm">continue with google</p>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-sm">or</p>
                        <p className="font-bold underline mt-2 cursor-pointer">
                            Login With Email
                        </p>
                    </div>

                    <div className="mt-10 text-center text-xs">
                        <p>All your personal details are safe with us.</p>
                        <p className="mt-4">
                            If you continue, you are accepting{" "}
                            <span className="text-blue-600">
                                OLX Terms and Conditions and Privacy Policy
                            </span>
                        </p>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Login
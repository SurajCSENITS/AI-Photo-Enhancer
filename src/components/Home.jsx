import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";
import { enhancedImageAPI } from "../utils/enhancedImageAPI";

const Home = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadImageHandler = async (file) => {
        setUploadedImage(URL.createObjectURL(file));
        setLoading(true);

        // call the API to enhance the image
        try {
            const enhancedURL= await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL); setLoading(false);
            toast.success("Image Enhanced Successfully ✔");
        } catch(err) {
            console.log(err);
            toast.error("Error while enhancing the image. Please try again later");
        }
    }

    return (
        <>
            <ImageUpload 
                uploadImageHandler={uploadImageHandler}
            />
            <ImagePreview 
                loading={loading}
                upload={uploadedImage}
                enhanced={enhancedImage}
            />  
        </>
    )
}

export default Home;
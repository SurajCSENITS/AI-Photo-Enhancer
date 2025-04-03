import axios from "axios";
import toast from "react-hot-toast";

const API_KEY= "wxe6xwhnhm5q0rqis";
const BASE_URL= "https://techhk.aoscdn.com";
const MAX_RETRIES= 10;

export const enhancedImageAPI = async (file) => {
    // code to call api and get enhanced image url
    try {
        // code to upload image
        const taskID= await uploadImage(file); 
        console.log("Image uploaded successfully, Task ID: ", taskID);

        // code to fetching enhanced image url
        const enhancedImageData= await pollForEnhancedImage(taskID);
        console.log("Enhanced Image Data: ", enhancedImageData);

        return enhancedImageData?.image;
    } catch(err) {
        console.log("Error enhancing image: ", err.message);
        toast.error("Error enhancing image: ", err.message);
    }
}

const uploadImage = async (file) => {
    const formData= new FormData();
    formData.append("image_file", file);

    const res= await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        },
    });

    console.log(res.data);
    if(!res?.data?.data?.task_id) {
        throw new Error("Failed to upload image! Task ID not found.");
    }
    return res?.data?.data?.task_id;
}

const fetchEnhancedImage = async (taskID) => {  // it is giving the response before being fully completeted
    const res= await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskID}`, {
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );

    console.log(res?.data);
    if(!res?.data?.data) {
        throw new Error("Failed to fetch enhanced image: image not found.")
    }
    return res?.data?.data;
}

const pollForEnhancedImage = async (taskID, retries= 0) => { // calling `fetchEnhancedImage` until the enhanced-image is generated
    const data= await fetchEnhancedImage(taskID);
    if(data?.state === 4) {
        console.log(`Processing... retries (${retries}/${MAX_RETRIES})`);
        if(retries > MAX_RETRIES) {
            throw new Error("Max retries reached. Please try again later.");
        }

        // wait for 2 seconds
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        return pollForEnhancedImage(taskID, retries+1);
    }

    return data;
}
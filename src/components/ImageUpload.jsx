const ImageUpload = (props) => {
    const showImageHandler = (e) => {
        const file= e.target.files[0];
        if(file) {
            props.uploadImageHandler(file);
        }
    } // 8942a3e4-c041-4d6a-9a9e-1ed8085b2c6f

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
            <label htmlFor="fileInput" className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 hover:text-blue-400 transition-all duration-200">
                <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    onChange={(e) => showImageHandler(e)}
                />
                <span>Click or drag to upload your image</span>
            </label>
        </div>
    )
}

export default ImageUpload;
import Loading from "./Loading";

const ImagePreview = (props) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl" >
            {/* Original Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-150">
                <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
                    Original Image
                </h2>

                {props.upload ? 
                    (<img 
                        src={props.upload} 
                        alt="uploadedImage" 
                        className="w-full h-full object-cover" 
                    />) :
                    (<div className="flex items-center justify-center h-80 bg-gray-200">
                        No Image Selected
                    </div>)
                }
            </div>

            {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden max-h-150 relative">
                <h2 className="text-xl font-semibold text-center bg-violet-800 text-white py-2">
                    Enhanced Image
                </h2>

                {props.enhanced && !props.loading && (
                    <>
                        <img 
                            src={props.enhanced} 
                            alt="Enhanced Image"
                            className="w-full h-full object-cover" 
                        />
                        {/* Download button */}
                        <span className="absolute bottom-0.5 right-0.5">
                            <a 
                                href={props.enhanced}
                                download="enhanced-image.jpg"
                            >
                                <img src="/download.png" className="w-7 h-7" />
                            </a>
                        </span>
                    </>
                )}  

                {props.loading ? 
                    <Loading /> :
                    <div className="flex items-center justify-center h-80 bg-gray-200">
                        No Enhanced Image
                    </div>
                }
            </div>
        </div>
    )
}

export default ImagePreview;
import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useGetAlbumsQuery } from '../../sercives/jsonServerApi';

export default function Product() {

    const {
        data: albums = [],
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetAlbumsQuery(1);


    const [sliderRef, slider] = useKeenSlider({
        slides: {
            perView: 4,
            spacing: 5,
        },
    });
    if (isLoading || isFetching) {
        return <div>loading...</div>;
    }

    if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }



    return (
        <div className=" mx-5">
            <div ref={sliderRef} className="keen-slider">
                {albums.data.map((album) => (
                    <>
                        <div key={album.id}  className="keen-slider__slide ">
                            <div style={{ width: "225px", maxWidth: "225px", minWidth: "225px" }} className=" flex flex-col w-fit py-3 justify-center items-center border" >
                                <img  src={`https://mern-library-management-system.onrender.com/api/v1/download/${album.images[0]}`}
                                    className="w-[12rem] h-[17rem]"
                                    alt={album.images[0]} />
                                
                            </div>

                        </div>
                    </>
                ))}
                
            </div>

        </div>
    );
}

import {useState} from "react";
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

import {handleService} from '../../../../../helpers';

import {initialState, initialImages} from './variables'

// Services
import { updateProfile as updateMyProfile } from '../../../../../services/user'

export default function useForm(user, updateProfile){
    const [state, setState] = useState(initialState)
    const [images, setImages] = useState(initialImages)
    const [tel, setTel] = useState({
        isValid: null,
        value:user.numero || "",
        country: {},
        formattedValue:"",
    })

    const defaultValues = {
        lastName: user.nom,
        firstName: user.prenom,
        email: user.email,
        address: user.Adresse_geographique || ""
    }

    function createImage(image, field) {
        const newImages = { ...images };

        let reader = new FileReader();

        reader.onload = (e) => {
            newImages.values[field] = e.target.result;
            newImages.isLoading[field] = false;
            setImages(newImages)
        }
        
        reader.readAsDataURL(image);
    }

    function onChangeImage(event) {       
        const image = event.target.files || event.dataTransfer.files;
        const field = event.target.name;
        
        if(image.length !== 0 ){
            const newImages = { ...images };
            newImages.isLoading[field] = true;
            setImages(newImages)

            const options = {
                maxSizeMB: 0.098,
                // maxWidthOrHeight: 100,
                useWebWorker: true
            }

            imageCompression(image[0], options)
            .then(function (compressedImage) {
                createImage(compressedImage, field)
            })
            .catch(function (error) {
                const newImages = { ...images };
                newImages.values[field] = "";
                newImages.isLoading[field] = false;
                setImages(newImages)
            });
        }else{
            const newImages = { ...images };
            newImages.values[field] = "";
            newImages.isLoading[field] = false;
            setImages(newImages)
        }
    }

    function handleValidSubmit(event, values){
        setState(state => ({...state, isLoading: true})) 

        const data = {
            "email":values.email,
            "nom":values.lastName,
            "prenom":values.firstName,
            "numero":tel.value,
            "logo":images.values.logo,
            "avatar":images.values.avatar,
            "Adresse_geographique": values.address,
        };
        
        handleService(updateMyProfile, data, 
            (response) => {
                setState(state => ({...state, isLoading: false }));
                toast.success(response.msg)
                updateProfile(response.infoUser)
            },
            () => {
                setState(state => ({...state, isLoading: false }));
            }
        )
    }

    return {
        state,
        images,
        tel,
        setTel,
        onChangeImage,
        handleValidSubmit,
        defaultValues,
    }
}
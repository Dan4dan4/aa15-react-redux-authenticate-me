import './AddSpot.css'
// import { spotsData } from '../Spots/Spotsdata'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import * as spotActions from '../../store/spot'
import { spotsData } from '../Spots/Spotsdata'

function AddSpot() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [country,setCountry] = useState("")
    const [address,setaddress] = useState("")
    const [city,setcity] = useState("")
    const [state,setstate] = useState("")
    const [lat,setlat] = useState("")
    const [lng,setlng] = useState("")
    const [description,setdescription] = useState("")
    const [name,setname] = useState("")
    const [price,setprice] = useState("")
    const [previewImage,setSpotImg] = useState("")
    const [spotImg2,setSpotImg2] = useState("")
    const [spotImg3,setSpotImg3] = useState("")
    const [spotImg4,setSpotImg4] = useState("")
    const [spotImg5,setSpotImg5] = useState("")
    const [errors,setErrors] = useState({})
   

   const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({});
    const newErrors = {};

    if(!country){
        newErrors.country = "Please add a Country"
    }
    if(!address){
        newErrors.address = "Please add an Address"
    }
    if(!city){
        newErrors.city = "Please add a City"
    }
    if(!state){
        newErrors.state = "Please add a State"
    }
    if(!lat){
        newErrors.lat = "Please add a Latitude"
    }
    if(!lng){
        newErrors.lng = "Please add a Longitude"
    }
    if(!description){
        newErrors.description = "Please add a Description"
    }
    if(!name){
        newErrors.name = "Please add a Name"
    }
    if(!price){
        newErrors.price = "Please add a Price"
    }
    if(!previewImage){
        newErrors.previewImage = "Please add a Image"
    }

    if(Object.keys(newErrors).length >0) {
        setErrors(newErrors)
        return
    }

    const newSpot = {
        id: spotsData.length +1,
        title: name,
        image: previewImage,
        price,
        city,
        state
    }

    spotsData.push(newSpot)
    
    return dispatch(
        spotActions.createSpot({
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
            previewImage,
            spotImg2,
            spotImg3,
            spotImg4,
            spotImg5
        })
    )
        .then((newSpot) => {
            if(newSpot && newSpot.id){
                navigate(`/${newSpot.id}`)
            }
        })
        .catch((err) => {
            throw new Error("failed", err)
        })
   }



    return (
       <div className='add-spot-container'>
        <form onSubmit={handleSubmit}>


            <h1>Where&apos;s your place located?</h1>
            <h3>Guests will only get your exact address once they booked a reservation.</h3>
            <h4>Country</h4>
                <input 
                    id="country-name"
                    type= "text"
                    placeholder='Country'
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    />
                {errors.country && <p>{errors.country}</p>}

            <h4>Street Address</h4>
                <input 
                    id="street-name"
                    type= "text"
                    placeholder='Street Address'
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    />
                {errors.address && <p>{errors.address}</p>}

            <div className="city-state">
                <div className='city-box'>
                <h4>City</h4>
                    <input 
                        id="city"
                        type= "text"
                        placeholder='City'
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        />
                    {errors.city && <p>{errors.city}</p>}
                </div>

                <div className='state-box'>
                <h4>State</h4>
                    <input 
                        id="state"
                        type= "text"
                        placeholder='State'
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                        />
                    {errors.state && <p>{errors.state}</p>}
                </div>
            </div>
            <div className="lat-lng">
                <div className='lat-box'>
                <h4>Latitude</h4>
                    <input 
                        id="lat"
                        type= "text"
                        placeholder='Latitude'
                        value={lat}
                        onChange={(e) => setlat(e.target.value)}
                        />
                    {errors.lat && <p>{errors.lat}</p>}
                </div>

                <div className='lng-box'>
                <h4>Longitude</h4>
                    <input 
                        id="lng"
                        type= "text"
                        placeholder='Longitude'
                        value={lng}
                        onChange={(e) => setlng(e.target.value)}
                        />
                    {errors.lng && <p>{errors.lng}</p>}
                </div>
            </div>

        <hr className='horizontal-line'/>
            
        <div className='add-spot-container'>
                <h1>Describe your place to guests</h1>
                <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</h3>
                <input 
                        id="description"
                        type= "text"
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        />
                    {errors.description && <p>{errors.description}</p>}
        </div>

        <hr className='horizontal-line'/>  

        <div className='add-spot-container'>
                <h1>Create a title for your spot</h1>
                <h3>Catch guests attention with a spot title that highlights what makes your plcae special.</h3>
                <input 
                        id="name"
                        type= "text"
                        placeholder='Name of your spot'
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        />
                    {errors.name && <p>{errors.name}</p>}
        </div>  

        <hr className='horizontal-line'/>  

        <div className='add-spot-container'>
                <h1>Set a base price for your spot</h1>
                <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                <input 
                        id="price"
                        type= "text"
                        placeholder='Price per night(USD)'
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        />
                    {errors.price && <p>{errors.price}</p>}
        </div>  

        <hr className='horizontal-line'/>  

        <div className='add-spot-container'>
                <h1>Liven up your spot with photos</h1>
                <h3>Submit a link to at least one photo to publish your spot</h3>
                <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Preview Image URL'
                        value={previewImage}
                        onChange={(e) => setSpotImg(e.target.value)}
                        />
                    {errors.previewImage && <p>{errors.previewImage}</p>}
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                        value={spotImg2}
                        onChange={(e) => setSpotImg2(e.target.value)}
                        />
                    {errors.spotImg2 && <p>{errors.spotImg2}</p>}
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                        value={spotImg3}
                        onChange={(e) => setSpotImg3(e.target.value)}
                        />
                    {errors.spotImg3 && <p>{errors.spotImg3}</p>}
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                        value={spotImg4}
                        onChange={(e) => setSpotImg4(e.target.value)}
                        />
                    {errors.spotImg4 && <p>{errors.spotImg4}</p>}
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                        value={spotImg5}
                        onChange={(e) => setSpotImg5(e.target.value)}
                        />
                    {errors.spotImg5 && <p>{errors.spotImg5}</p>}
        </div>  
            <button> Create Spot</button>
        </form>
       </div>
    )
}

export default AddSpot;
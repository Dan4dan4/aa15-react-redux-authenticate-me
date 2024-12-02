import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import * as spotActions from '../../store/spot';
import './EditSpot.css'; 

function EditSpot() { 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const { spotId } = useParams();
    const currentUser = useSelector(state => state.session.user);  
    
    const spot = useSelector(state => state.spots.allSpots.find(spot => spot.id === parseInt(spotId)))
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [spotImg2, setSpotImg2] = useState("");
    const [spotImg3, setSpotImg3] = useState("");
    const [spotImg4, setSpotImg4] = useState("");
    const [spotImg5, setSpotImg5] = useState("");
    

    useEffect(() => {
        if (spot) {
          if (spot.ownerId !== currentUser.id) {
            navigate('/'); 
            return;
          }
          setCountry(spot.country);
          setAddress(spot.address);
          setCity(spot.city);
          setState(spot.state);
          setLat(spot.lat);
          setLng(spot.lng);
          setDescription(spot.description);
          setName(spot.name);
          setPrice(spot.price);
          setPreviewImage(spot.previewImage);
          setSpotImg2(spot.spotImg2);
          setSpotImg3(spot.spotImg3);
          setSpotImg4(spot.spotImg4);
          setSpotImg5(spot.spotImg5);
        }
      }, [spot, currentUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedSpot = {
            id: spot.id, 
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name ,  
            price,
            image: previewImage,
            img2: spotImg2,
            img3: spotImg3,
            img4: spotImg4,
            img5: spotImg5,
        };

      
        dispatch(spotActions.updateSpots(spot.id, updatedSpot)) 
            .then((updatedSpot) => {
                if (updatedSpot && updatedSpot.id) {
                    navigate(`/${updatedSpot.id}`);  
                }
            })
            .catch((err) => {
                console.error("Failed to update spot", err);
            });
    };

    return (
        <div className="edit-spot-container">
            <form onSubmit={handleSubmit}>

                <h1>Edit your spot details</h1>
                <h3>Guests will only get your exact address once they book a reservation.</h3>
                
                <h4>Country</h4>
                <input 
                    id="country-name"
                    type="text" 
                    placeholder="Country" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                />
                
                <h4>Street Address</h4>
                <input 
                    id="street-name"
                    type="text" 
                    placeholder="Street Address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                />
                
                <div className="city-state">
                    <div className="city-box">
                        <h4>City</h4>
                        <input 
                            id="city"
                            type="text" 
                            placeholder="City" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                        />
                    </div>

                    <div className="state-box">
                        <h4>State</h4>
                        <input 
                        id="state"
                            type="text" 
                            placeholder="State" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="lat-lng">
                    <div className="lat-box">
                        <h4>Latitude</h4>
                        <input 
                        id="lat"
                            type="text" 
                            placeholder="Latitude" 
                            value={lat} 
                            onChange={(e) => setLat(e.target.value)} 
                        />
                    </div>

                    <div className="lng-box">
                        <h4>Longitude</h4>
                        <input 
                        id="lng"
                            type="text" 
                            placeholder="Longitude" 
                            value={lng} 
                            onChange={(e) => setLng(e.target.value)} 
                        />
                    </div>
                </div>

                <hr className="horizontal-line" />
                
                <div className="add-spot-container">
                    <h1>Describe your place to guests</h1>
                    <h3>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</h3>
                    <input 
                        id="description"
                        placeholder="Please write at least 30 characters" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <hr className="horizontal-line" />

                <div className="add-spot-container">
                    <h1>Edit the title of your spot</h1>
                    <h3>Catch guests attention with a title that highlights what makes your place special.</h3>
                    <input 
                     id="name"
                        type="text" 
                        placeholder="Name of your spot" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>

                <hr className="horizontal-line" />

                <div className="add-spot-container">
                    <h1>Set a base price for your spot</h1>
                    <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                    <input 
                        id= "price"
                        type="text" 
                        placeholder="Price per night(USD)" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </div>

                <hr className="horizontal-line" />

                <div className="add-spot-container">
                    <h1>Liven up your spot with photos</h1>
                    <h3>Submit a link to at least one photo to publish your spot</h3>
                    <input 
                    id="photoURL"
                        type="text" 
                        placeholder="Preview Image URL" 
                        value={previewImage} 
                        onChange={(e) => setPreviewImage(e.target.value)} 
                    />
                    <input 
                    id="photoURL"
                        type="text" 
                        placeholder="Image URL" 
                        value={spotImg2} 
                        onChange={(e) => setSpotImg2(e.target.value)} 
                    />
                    <input 
                    id="photoURL"
                        type="text" 
                        placeholder="Image URL" 
                        value={spotImg3} 
                        onChange={(e) => setSpotImg3(e.target.value)} 
                    />
                    <input 
                    id="photoURL"
                        type="text" 
                        placeholder="Image URL" 
                        value={spotImg4} 
                        onChange={(e) => setSpotImg4(e.target.value)} 
                    />
                    <input 
                    id="photoURL"
                        type="text" 
                        placeholder="Image URL" 
                        value={spotImg5} 
                        onChange={(e) => setSpotImg5(e.target.value)} 
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditSpot;
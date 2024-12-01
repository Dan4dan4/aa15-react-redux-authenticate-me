import './AddSpot.css'

function AddSpot() {
    return (
       <div className='add-spot-container'>
            <h1>Where&apos;s your place located?</h1>
            <h3>Guests will only get your exact address once they booked a reservation.</h3>
            <h4>Country</h4>
                <input 
                    id="country-name"
                    type= "text"
                    placeholder='Country'
                />

            <h4>Street Address</h4>
                <input 
                    id="street-name"
                    type= "text"
                    placeholder='Street Address'
                />

            <div className="city-state">
                <div className='city-box'>
                <h4>City</h4>
                    <input 
                        id="city"
                        type= "text"
                        placeholder='City'
                    />
                </div>

                <div className='state-box'>
                <h4>State</h4>
                    <input 
                        id="state"
                        type= "text"
                        placeholder='State'
                    />
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
                    />
        </div>

        <hr className='horizontal-line'/>  

        <div className='add-spot-container'>
                <h1>Create a title for your spot</h1>
                <h3>Catch guests attention with a spot title that highlights what makes your plcae special.</h3>
                <input 
                        id="spotname"
                        type= "text"
                        placeholder='Name of your spot'
                    />
        </div>  

        <hr className='horizontal-line'/>  

        <div className='add-spot-container'>
                <h1>Set a base price for your spot</h1>
                <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                <input 
                        id="price"
                        type= "text"
                        placeholder='Price per night(USD)'
                    />
        </div>  

        <hr className='horizontal-line'/>  

        <div className='add-spot-container'>
                <h1>Liven up your spot with photos</h1>
                <h3>Submit a link to at least one photo to publish your spot</h3>
                <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Preview Image URL'
                    />
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                    />
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                    />
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                    />
                    <input 
                        id="photoURL"
                        type= "text"
                        placeholder='Image URL'
                    />
            <button> Create Spot</button>
        </div>  
       </div>
    )
}

export default AddSpot
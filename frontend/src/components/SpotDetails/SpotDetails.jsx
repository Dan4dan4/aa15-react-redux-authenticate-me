import { useEffect , useState} from "react"
// import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
// import { getSpotDetails } from "../../store/spot"
import { spotsData } from "../Spots/Spotsdata"
import './SpotDetails.css'

function SpotDetails(){
    const { id } = useParams()  // Get the id from the URL
    const [spot, setSpot] = useState(null)

    useEffect(() => {
        //hardcoded 1st 4spots
        const foundSpot = spotsData.find(spot => spot.id === parseInt(id))
        if (foundSpot) {
            setSpot(foundSpot)
        } else {
            
            fetch(`/api/spots/${id}`)
                .then(response => response.json()) 
                .then(data => {
                    setSpot(data)  
                })
                .catch(err => {
                    console.error("fetch failed:", err)
                    setSpot(null) 
                })
        }
    }, [id])

    if(!spot){
        return <h1>no spot found</h1>
    }
   
return(
    <div>
        <h1>{spot.title}</h1>
        <img src={spot.image} alt={spot.title} className="spot-image2" />
        <p>{spot.description}</p>
        <p>{spot.city}, {spot.state}, {spot.country} </p>
    </div>
)
}

export default SpotDetails
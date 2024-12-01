import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getSpotDetails } from "../../store/spot"

function SpotDefault(){
    const {id}= useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.spotDetails)

    console.log('spot from redux', spot)

    useEffect(() => {
        dispatch(getSpotDetails(id))
    }, [dispatch, id])

    if(!spot){
        return <h1>no spot found</h1>
    }

return(
    <div>
        <h1>{spot.name}</h1>
        <p>{spot.description}</p>
        <p>{spot.city}</p>
    </div>
)
}

export default SpotDefault
import { useParams } from "react-router"

const Person = () => {
    const { name } = useParams()
    return (<>
        <h2>{name}</h2>
    </>)
}

export default Person
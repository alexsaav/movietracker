import Skeleton from "@mui/material/Skeleton";
import { v4 as uuidv4 } from 'uuid';
import { loadingMediaItem } from "./loadingItems";

const LoadingMediaItem = ({items}) => {
    return (
        <>
            {Array(items).fill().map(() =>
                <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width="100%" 
                    height={250} 
                    sx={loadingMediaItem.container} 
                    key={uuidv4()}
                />
            )}
        </>
    )
}

export default LoadingMediaItem
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';
import { loadingCardItem } from "./loadingItems";

const LoadingCardItem = ({items}) => {

    return (
        <>
            {Array(items).fill().map(() =>
                <Box sx={loadingCardItem.container} key={uuidv4()}>
                    <Skeleton animation="wave" variant="rectangular" height={225} sx={loadingCardItem.firstItem} />
                    <Box>
                        <Skeleton animation="wave" height={20} width="70%" sx={loadingCardItem.secondItemInner}/>
                        <Skeleton animation="wave" height={20} width="70%" sx={loadingCardItem.secondItemInner}/>
                    </Box>
                </Box>
            )}
        </>
    )
}



export default LoadingCardItem;
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPersonImages, getPersonTaggedImages, selectPersonImages, selectPersonTaggedImages } from "./personSlice"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from "@mui/material/Typography"
import Box from "@mui/system/Box"
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia"
import Container from "@mui/system/Container"
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingGridItem from "../../components/Loading/LoadingGridItem";
import { useTheme } from "@mui/material";
import { getImagesStyle, getModalStyleImages } from "./peopleStyles";

const PersonImages = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(null);
    const dispatch = useDispatch();
    const { id, name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPersonImages(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getPersonTaggedImages({personId: id, page}))
    }, [dispatch, page, id])
    
    const personImages = useSelector(selectPersonImages);
    const personImagesResult = personImages.profiles;
    const isLoadingImage = personImages.isLoading;

    const taggedImages = useSelector(selectPersonTaggedImages);
    const taggedImagesResult = taggedImages.results;
    const isLoadingTaggedImages = personImages.isLoading;

    const images = personImagesResult.concat(taggedImagesResult)


    // set new current index
    const handleOpen = (i) => {
        console.log(i)
        setCurrentIndex(i);
        setOpen(true)
    };

    // reset current index
    const handleClose = () => {
        setCurrentIndex(null);
        setOpen(false)
    };

    const handleBackForwardButton = (index) => {
        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(images.length - 1)
        currentIndex > images.length - 2 ? setCurrentIndex(0) : setCurrentIndex(currentIndex + 1)
    };

    const theme = useTheme();
    const modalStyle = getModalStyleImages(theme); 
    const imagesStyle = getImagesStyle(theme);

    const modalBody = (
        <Box style={modalStyle.container}>
            <Button onClick={handleClose} sx={modalStyle.closeButton}>
                <CloseIcon />
            </Button>
            <Box sx={modalStyle.imagesContainer}
            >
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={modalStyle.arrowButton}>
                    <ArrowBackIosIcon />
                </Button>
                <Box sx={modalStyle.imagesInnerContainer}>
                    {images[currentIndex] && (
                        <img src={`https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`} 
                            alt={images[currentIndex].file_path} 
                            style={modalStyle.image}
                        />
                    )}
                </Box>
                <Button onClick={() => handleBackForwardButton(currentIndex)} sx={modalStyle.arrowButton}>
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            <Container sx={imagesStyle.container}>
                <Typography 
                    variant="h1" 
                    onClick={() => navigate(`/person/${id}/${name}`)} 
                    sx={imagesStyle.title}
                >
                    {name}
                </Typography>
                <Typography variant="h2" sx={imagesStyle.subtitle}>Photo Gallery</Typography>
                <Box sx={imagesStyle.imagesContainer}>
                    <Grid container spacing={1} sx={imagesStyle.imagesInnerContainer} columns={{ xs: 2, sm: 4, md: 6 }} >
                        {isLoadingImage  && <LoadingGridItem items={30} />}
                        <>
                            {images.map((photo, index) => {
                                const { file_path } = photo;
                                const imageUrl = `https://image.tmdb.org/t/p/original${file_path}`;
                                let imgId = uuidv4();

                                return (
                                    <Grid item xs={1} key={imgId}>
                                        <Card sx={imagesStyle.imageContainer} onClick={() => handleOpen(index)}>
                                            <CardMedia 
                                                component="img"
                                                image={imageUrl}
                                                sx={imagesStyle.imageInnerContainer}
                                            />
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </>
                    </Grid>
                </Box>
            </Container>
            <div>
                <Modal open={open}>   
                    {modalBody}
                </Modal>
            </div>
        </>
    )
}

export default PersonImages


import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);
    return (
        <div className={classes.container}>
            <Typography style={{color:'#d84851'}} variant='h4'>
                Restaurants & Attractions around you
            </Typography>
            {isLoading ? (
                <div  className={classes.loading}>
                    <CircularProgress style={{color:'#d84851'}} size='5rem' />
                </div>
            ) : (
                <React.Fragment>
                    <FormControl className={classes.formControl}>
                        <InputLabel>
                            Type
                        </InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value='restaurants'>
                            <i style={{color:'#d84851',marginRight:'4px'}} class="fa fa-cutlery" aria-hidden="true"></i> Restaurants
                            </MenuItem>
                            
                            <MenuItem value='attractions'>
                            <i style={{color:'#d84851',marginRight:'4px'}} class="fa fa-map-marker" aria-hidden="true"></i> Attractions
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>
                            Rating
                        </InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>
                            <span style={{color:'orange',marginRight:'4px'}} class="fa fa-star checked"></span>    All
                            </MenuItem>
                            <MenuItem value={3}>
                            <span style={{color:'orange',marginRight:'4px'}} class="fa fa-star checked"></span>  Above 3.0
                            </MenuItem>
                            <MenuItem value={4}>
                            <span style={{color:'orange',marginRight:'4px'}} class="fa fa-star checked"></span>    Above 4.0
                            </MenuItem>
                            <MenuItem value={4.5}>
                            <span style={{color:'orange',marginRight:'4px'}} class="fa fa-star checked"></span>    Above 4.5
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {places.length && <FormControl className={classes.formControl} style={{ minWidth: '175px' }}>
                        <InputLabel>
                            Displaying {places.length} result{places.length === 1 ? '' : 's'}
                        </InputLabel>
                    </FormControl>}
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </React.Fragment>
            )}
        </div>
    );
};

export default List;
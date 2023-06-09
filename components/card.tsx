import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, Card, Stack, Typography } from 
'@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from './formProvider';
import RHFTextField from './rhfTextflied';
import { db } from '@/pages/api/firebase';

type UserDataProps = {
  name: string;
  photoURL: string;
};


 function Card2(){ 
const [userData, setUserData] = 
useState<UserDataProps[]>([]);

const fetchUserData = () => {
    db.collection('user')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data() as UserDataProps);
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error getting documents:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);



  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {userData.map((data, index) => (
  <Card key={index} sx={{ py: 10, px: 3, textAlign:
'center' }}>
              <img
                src={data.photoURL}
                alt="Profile Picture"
                style={{ width: '100px', height: 
'100px' }}
              />
              <Typography variant="h5" 
component="h2">
                {data.name}
              </Typography>
            </Card>
          ))}
        </Grid>
        </Grid>
  )
}
export default Card2;
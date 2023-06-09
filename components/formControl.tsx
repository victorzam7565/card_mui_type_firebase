import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from './formProvider';
import RHFTextField from './rhfTextflied';
import { db } from '@/pages/api/firebase';

type UserDataProps = {
  name: string;
  photoURL: string;
};

type FormValuesProps = {
  displayName: string;
  email: string;
  photoURL: CustomFile | string | null;
  phoneNumber: string | null;
  country: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  about: string | null;
  isPublic: boolean;
};

export default function AccountGeneral() {
  const methods = useForm<FormValuesProps>({
    defaultValues: {
      displayName: '',
      email: '',
      photoURL: '',
      phoneNumber: '',
      country: '',
      address: '',
      state: '',
      city: '',
      zipCode: '',
      about: null,
      isPublic: false,
    },
  });

  const [userData, setUserData] = useState<UserDataProps[]>([]);

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

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = (data: FormValuesProps, e: any) => {
    // Guardar datos en Firebase
    db.collection('user')
      .add({
        name: data.displayName,
        photoURL: data.photoURL,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        reset({});
        fetchUserData(); // Actualizar userData después de guardar los datos
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {userData.map((data, index) => (
            <Card key={index} sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <img
                src={data.photoURL}
                alt="Profile Picture"
                style={{ width: '100px', height: '100px' }}
              />
              <Typography variant="h5" component="h2">
                {data.name}
              </Typography>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              {/* Form Fields */}
              <RHFTextField name="displayName" label="Name" required />
              <RHFTextField name="photoURL" label="PhotoURL" required />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* Submit Button */}
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}










































































































































































































































































































































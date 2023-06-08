import { useForm } from 'react-hook-form';
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from './formProvider';
import RHFTextField from './rhfTextflied';
import { db } from '@/pages/api/firebase';


//guardas datosa firebase
function writeUserData(methods: any, ){ 
  const namee = methods.getValues('displayName');
  const imageUrl =methods.getValues('photoURL');
  db.collection("user").doc().set({
    name: namee,
    PhotoUrl:imageUrl ,
    
  })
  .then((docRef:any) => {
    console.log("Document written with ID: ", "docRef:id");
  })
  .catch((error:any) => {
    console.error("Error adding document: ", error);
  });
}

//leer documentos 
db.collection("user").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
  });
});



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
    //resolver: yupResolver(schema),
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

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = (data: FormValuesProps, e: any) => {
    console.log(data);
    reset({});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
  <img src={'imageUrl'} alt="Profile Picture" style={{ width: '100px', height: '100px' }} />
  <Typography variant="h5" component="h2">{'namee'}</Typography>
</Card>
 
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              {/* Form Fields */}
  <RHFTextField name="displayName" label="Name" required/>
  <RHFTextField name="photoURL" label="PhotoURL" required />

            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              {/* Submit Button */}
<LoadingButton 
type="submit" 
variant="contained" 
loading={isSubmitting}  
onClick={() => writeUserData(methods)}
  >
      Save
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}






















































































































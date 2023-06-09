import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Grid, Card, Stack, Typography,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider from './formProvider';
import RHFTextField from './rhfTextflied';
import { db } from '@/pages/api/firebase';

type UserDataProps = {
  id: string;
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
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as UserDataProps;
        });
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

  //SUBIR
  const onSubmit = (data: FormValuesProps, e: any) => {
    if (editingId) {
      // Actualizar datos en Firebase
      db.collection('user')
        .doc(editingId)
        .update({
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
        .then(() => {
          console.log('Document successfully updated!');
          fetchUserData(); // Actualizar userData después de actualizar los datos
          reset({});
          setEditingId(null); // Restablecer editingId a null después de guardar los datos
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    } else {
      // Guardar datos en Firebase
      db.collection('user')
        .add({
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          fetchUserData(); // Actualizar userData después de guardar los datos
          reset({});
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  };




















//borrar datos
 
const handleDelete = (id: string) => {
  if (editingId === id) {
    setEditingId(null); // Restablecer editingId a null si se está editando el usuario que se está eliminando
  }
  db.collection('user')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
      const updatedData = userData.filter((data) => data.id !== id);
      setUserData(updatedData);
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
}; 
 

//EDITAR DATOS 
const [editingId, setEditingId] = useState<string | null>(null);

const handleEdit = (id: string) => {
  db.collection('user')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data() as FormValuesProps;
        setValue('displayName', data.displayName);
        setValue('photoURL', data.photoURL);
      } else {
        console.error('No such document!');
      }
    })
    .catch((error) => {
      console.error('Error getting document:', error);
    });
};


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {userData.map((data) => (


<Card key={data.id} sx={{ py: 10, px: 3, textAlign: 
'center' }}>
  {editingId === data.id ? (
    <Typography variant="h5" component="h2">
      Editando {data.name}
    </Typography>
  ) : (
    <>
      <img
        src={data.photoURL}
        alt="Profile Picture"
        style={{ width: '100px', height: '100px' }}
      />
      <Typography variant="h5" component="h2">
        {data.displayName} {/* Mostrar el valor de 
        displayName */}
      </Typography>
      <Button  variant="contained" onClick={() => 
handleDelete(data.id)}>Eliminar</Button>
      <Button  variant="contained" onClick={()=> 
setEditingId(data.id)}>Editar</Button>
    </>
  )}
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




































































































































































































































































































































































































































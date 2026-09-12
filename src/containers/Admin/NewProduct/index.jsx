import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { api } from '../../../services/api';
import {
  Container,
  InputGroup,
  Form,
  Label,
  Select,
  SubmitButton,
  LabelUpload,
  Input,
  Error,
  ImagePreview,
} from './styles';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const schema = yup.object().shape({
  name: yup.string().trim().required('Product name is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  category: yup
    .number()
    .typeError('Category is required')
    .integer('Select a valid category')
    .positive('Select a valid category')
    .required('Category is required'),
  image: yup
    .mixed()
    .test(
      'required-file',
      'Product image is required',
      (value) => value?.length > 0,
    )
    .test(
      'file-type',
      'Select a JPEG or PNG image',
      (value) =>
        !value?.length || ['image/jpeg', 'image/png'].includes(value[0].type),
    )
    .test(
      'file-size',
      'Image must be less than 2MB',
      (value) => !value?.length || value[0].size <= MAX_FILE_SIZE,
    ),
});

export const NewProductForm = ({ onSubmit, isSubmitting = false }) => {
  const [categories, setCategories] = useState([]);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        toast.error('Não foi possível carregar as categorias.');
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: '',
      category: '',
      image: undefined,
    },
  });

  function handleFileChange(event) {
    const files = event.target.files;
    const selectedFile = files[0];

    setValue('image', files, { shouldValidate: true, shouldDirty: true });
    setFileName(selectedFile?.name || '');
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : '');
  }

  async function handleFormSubmit(values) {
    const submitted = await onSubmit(values);

    if (submitted) {
      reset();
      setFileName('');
      setImagePreview('');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputGroup>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" {...register('name')} />
          {errors.name && <Error>{errors?.name?.message}</Error>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            min="0.01"
            step="0.01"
            {...register('price')}
          />
          {errors.price && <Error>{errors?.price?.message}</Error>}
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            {imagePreview ? (
              <ImagePreview src={imagePreview} alt={`Prévia de ${fileName}`} />
            ) : (
              <span>Carregar imagem</span>
            )}
            {fileName && <span>{fileName}</span>}
            <input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              {...register('image')}
              onChange={handleFileChange}
            />
          </LabelUpload>
          {errors.image && <Error>{errors.image.message}</Error>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="category">Categoria</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                inputId="category"
                {...field}
                options={categories.map((category) => ({
                  value: Number(category.id),
                  label: category.name,
                }))}
                placeholder="Selecione uma categoria"
                onChange={(option) => field.onChange(option?.value || '')}
                value={
                  categories
                    .map((category) => ({
                      value: Number(category.id),
                      label: category.name,
                    }))
                    .find((option) => option.value === Number(field.value)) ||
                  null
                }
              />
            )}
          />
          {errors.category && <Error>{errors.category.message}</Error>}
        </InputGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Adicionar Produto'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

NewProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export function NewProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateProduct(values) {
    const imageFile = values.image?.[0];

    if (!imageFile) {
      toast.error('Selecione uma imagem para o produto.');
      return false;
    }

    const formData = new FormData();
    formData.append('name', values.name.trim());
    formData.append('price', String(values.price));
    formData.append('category_id', String(values.category));
    formData.append('image', imageFile, imageFile.name);

    setIsSubmitting(true);

    try {
      await api.post('/products', formData);
      toast.success('Produto criado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      const message = error.response?.data?.message;
      toast.error(message || 'Não foi possível criar o produto.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <NewProductForm
      onSubmit={handleCreateProduct}
      isSubmitting={isSubmitting}
    />
  );
}

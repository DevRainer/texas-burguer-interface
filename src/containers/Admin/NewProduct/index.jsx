import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  ContainerCheckBox,
} from './styles';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const schema = yup.object().shape({
  name: yup.string().trim().required('Digite o nome do produto'),
  price: yup
    .number()
    .typeError('O preço precisa ser um número')
    .positive('O preço precisa ser maior que zero')
    .required('Digite o preço do produto'),
  category: yup
    .number()
    .typeError('Escolher uma categoria')
    .integer('Selecione uma categoria válida')
    .positive('Selecione uma categoria válida')
    .required('Escolher uma categoria'),
  offer: yup.boolean(),
  image: yup
    .mixed()
    .test(
      'required-file',
      'Imagem do produto é obrigatória',
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
    )
    .test(
      'single-file',
      'Select only one image',
      (value) => !value?.length || value.length === 1,
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
  const imageField = register('image');

  function handleFileChange(event) {
    const files = event.target.files;
    const selectedFile = files[0];

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
          <Input
            id="name"
            type="text"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name && <Error>{errors?.name?.message}</Error>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="number"
            min="0.01"
            step="0.01"
            aria-invalid={Boolean(errors.price)}
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
              aria-invalid={Boolean(errors.image)}
              {...imageField}
              onChange={(event) => {
                imageField.onChange(event);
                handleFileChange(event);
              }}
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
                aria-invalid={Boolean(errors.category)}
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
        <InputGroup>
          <ContainerCheckBox>
            <input type="checkbox" {...register('offer')} />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckBox>
        </InputGroup>
        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
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
  const navigate = useNavigate();

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
    formData.append('offer', String(values.offer));
    formData.append('file', imageFile, imageFile.name);

    setIsSubmitting(true);

    try {
      await api.post('/products', formData);
      toast.success('Produto criado com sucesso!');
      navigate('/admin/produtos');
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

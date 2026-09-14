import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
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
});

export function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { products } = location.state || {};

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
    if (products) {
      reset({
        name: products.name,
        price: Number(products.price),
        category: products.category_id,
        image: undefined,
      });
      setFileName(products.fileName || '');
      setImagePreview(products.image_url);
    }
  }, [products, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleFileChange(event) {
    const files = event.target.files;
    const selectedFile = files[0];

    imageField.onChange(event);

    if (!selectedFile) {
      return;
    }

    setFileName(selectedFile?.name || '');
    setImagePreview(URL.createObjectURL(selectedFile));
  }

  async function handleFormSubmit(values) {
    const imageFile = values.image?.[0];
    const formData = new FormData();
    formData.append('name', values.name.trim());
    formData.append('price', String(values.price));
    formData.append('category_id', String(values.category));
    formData.append('offer', String(values.offer));
    if (imageFile) {
      formData.append('file', imageFile, imageFile.name);
    }

    setIsSubmitting(true);
    try {
      await api.put(`/products/${products.id}`, formData);
      toast.success('Produto atualizado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      const message = error.response?.data?.message;
      toast.error(message || 'Não foi possível atualizar o produto.');
      return false;
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        navigate('/admin/produtos');
      }, 2000);
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
            {...register('name')}
            defaultValue={products.name}
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
              {...imageField}
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
            defaultValue={products.category}
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
                defaultValue={products.category}
              />
            )}
          />
          {errors.category && <Error>{errors.category.message}</Error>}
        </InputGroup>
        <InputGroup>
          <ContainerCheckBox>
            <input
              type="checkbox"
              defaultChecked={products.offer}
              {...register('offer')}
            />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckBox>
        </InputGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </SubmitButton>
      </Form>
    </Container>
  );
}

EditProduct.propTypes = {
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

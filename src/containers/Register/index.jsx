import {} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
} from './styles';

const schema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup
      .string()
      .min(6, 'Mínimo de 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
      .required('Confirmação de senha é obrigatória'),
  })
  .required();

export function Register() {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        registerUser(
          data.name,
          data.email,
          data.password,
          data.confirmPassword,
        ),
        {
          pending: 'Criando sua conta...',
          success: 'Cadastro bem-sucedido!',
          error: {
            render({ data }) {
              if (data?.response?.status === 400) {
                return 'Erro ao criar conta. Email já cadastrado.';
              }
              return 'Erro ao criar conta. Verifique seus dados.';
            },
          },
        },
        {
          position: 'top-right',
        },
      );
      reset();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo" />
      </LeftContainer>
      <RightContainer>
        <Title>Criar conta</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              disabled={loading}
              {...register('name')}
            />
            <p>{errors?.name?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              disabled={loading}
              {...register('email')}
            />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              disabled={loading}
              {...register('password')}
            />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Digite sua senha novamente"
              disabled={loading}
              {...register('confirmPassword')}
            />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Confirmar cadastro'}
          </Button>
        </form>
        <p>
          Já possui conta?{' '}
          <a onClick={() => navigate('/login')}>Clique aqui.</a>
        </p>
      </RightContainer>
    </Container>
  );
}

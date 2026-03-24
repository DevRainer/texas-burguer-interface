import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import {
  Container,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
} from './styles';

const schema = yup
  .object({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup
      .string()
      .min(6, 'Mínimo de 6 caracteres')
      .required('Senha é obrigatória'),
  })
  .required();

export function Login() {
  const { login, loading } = useAuth();
  const [error, setError] = useState('');
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
        login(data.email, data.password),
        {
          pending: 'Verificando credenciais...',
          success: 'Login bem-sucedido!',
          error: 'Erro ao fazer login. Verifique suas credenciais.',
        },
      );
      reset();
      setError('');
    } catch (error) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Sabor Goiano Burguer!</span>
          <br />
          Acesse com seu <span>Login e senha.</span>
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        <p>
          Não possui conta? <a>Clique aqui.</a>
        </p>
      </RightContainer>
    </Container>
  );
}

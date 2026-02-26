import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo.png';
import { Button } from '../../components/Button';
import {
  Container,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
} from './styles';
export function Login() {
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
      password: yup.string().min(6, 'Mínimo de 6 caracteres').required(''),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

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
          <InputContainer>
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register('email')}
            />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register('password')}
            />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </form>
        <p>
          Não possui conta? <a>Clique aqui.</a>
        </p>
      </RightContainer>
    </Container>
  );
}

import Canvas from 'components/Canvas/Canvas';
import { draw } from 'utils';
import { MainContainer } from './App.styled';
import PhoneBook from '../PhoneBook/PhoneBook';
import Copyright from 'components/Copyright/Copyright';

const App = () => {
  return (
    <>
      <Canvas draw={draw} height={1000} width={1000} />
      <MainContainer>
        <PhoneBook />
        <Copyright message="©2023 Made by Iurii Bardych" />
      </MainContainer>
    </>
  );
};

export default App;

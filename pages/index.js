import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) router.push(`/${user.username}`)
  }, [user]);

  return <Layout>Home</Layout>
}

export default Home;